/**
 * PayMongo Service
 * Integration with PayMongo payment API
 * Docs: https://developers.paymongo.com/docs
 */

import axios, { AxiosInstance } from 'axios';
import { config } from '../config/env';
import { BadRequestError } from '../utils/errors';

interface PayMongoLink {
  id: string;
  type: string;
  attributes: {
    amount: number;
    currency: string;
    description: string;
    checkout_url: string;
    reference_number: string;
    status: string;
  };
}

interface PayMongoCheckoutSession {
  id: string;
  type: string;
  attributes: {
    billing: any;
    checkout_url: string;
    client_key: string;
    description: string;
    line_items: any[];
    livemode: boolean;
    merchant: string;
    metadata: Record<string, string>;
    payment_intent: any;
    payment_method_types: string[];
    reference_number: string;
    send_email_receipt: boolean;
    show_description: boolean;
    show_line_items: boolean;
    status: string;
    success_url: string;
    cancel_url: string;
    created_at: number;
    updated_at: number;
  };
}

interface PayMongoPayment {
  id: string;
  type: string;
  attributes: {
    amount: number;
    status: string;
    paid_at: number;
    payment_method_used: string;
    metadata: Record<string, string>;
  };
}

class PayMongoService {
  private client: AxiosInstance;
  private readonly baseURL = 'https://api.paymongo.com/v1';

  constructor() {
    // Create axios instance with PayMongo authentication
    this.client = axios.create({
      baseURL: this.baseURL,
      auth: {
        username: config.paymongo.secretKey || '',
        password: '', // PayMongo uses only username (secret key)
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  /**
   * Create a Checkout Session
   * This generates a hosted checkout page with proper redirect support
   * Docs: https://developers.paymongo.com/docs/checkout-api
   */
  async createPaymentLink(data: {
    userId: string;
    amount: number;
    description: string;
    successUrl: string;
    failedUrl: string;
  }): Promise<{
    checkoutUrl: string;
    referenceNumber: string;
    linkId: string;
  }> {
    try {
      const referenceNumber = this.generateReferenceNumber();

      // Build success URL with reference number for post-payment verification
      const successUrlWithRef = data.successUrl.includes('?')
        ? `${data.successUrl}&ref=${encodeURIComponent(referenceNumber)}`
        : `${data.successUrl}?ref=${encodeURIComponent(referenceNumber)}`;

      const payload = {
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            description: data.description,
            // Line items for the checkout
            line_items: [
              {
                name: 'ReviewGuro Season Pass',
                description: 'Unlimited access to all premium features',
                amount: data.amount * 100, // Convert to centavos
                currency: config.payment.currency,
                quantity: 1,
              },
            ],
            // Payment method options
            payment_method_types: [
              'card',
              'gcash',
              'grab_pay',
              'paymaya',
            ],
            reference_number: referenceNumber,
            // Redirect URLs - Checkout Sessions API properly redirects!
            success_url: successUrlWithRef,
            cancel_url: data.failedUrl,
            // Store metadata for webhook processing - this IS preserved in checkout sessions
            metadata: {
              userId: data.userId,
              referenceNumber,
              productType: 'season_pass',
            },
          },
        },
      };

      const response = await this.client.post<{ data: PayMongoCheckoutSession }>(
        '/checkout_sessions',
        payload
      );

      const session = response.data.data;

      return {
        checkoutUrl: session.attributes.checkout_url,
        referenceNumber: session.attributes.reference_number || referenceNumber,
        linkId: session.id,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('PayMongo API Error:', error.response?.data);
        throw new BadRequestError(
          error.response?.data?.errors?.[0]?.detail ||
            'Failed to create checkout session'
        );
      }
      throw error;
    }
  }

  /**
   * Retrieve payment details by ID
   */
  async getPayment(paymentId: string): Promise<PayMongoPayment> {
    try {
      const response = await this.client.get<{ data: PayMongoPayment }>(
        `/payments/${paymentId}`
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('PayMongo API Error:', error.response?.data);
        throw new BadRequestError('Failed to retrieve payment');
      }
      throw error;
    }
  }

  /**
   * Retrieve payment link details
   */
  async getPaymentLink(linkId: string): Promise<PayMongoLink> {
    try {
      const response = await this.client.get<{ data: PayMongoLink }>(
        `/links/${linkId}`
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('PayMongo API Error:', error.response?.data);
        throw new BadRequestError('Failed to retrieve payment link');
      }
      throw error;
    }
  }

  /**
   * Generate unique reference number
   * Format: RG-{timestamp}
   */
  private generateReferenceNumber(): string {
    return `RG-${Date.now()}`;
  }

  /**
   * Verify webhook signature
   * PayMongo signs webhooks with HMAC-SHA256
   */
  verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    const crypto = require('crypto');
    const hash = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return hash === signature;
  }

  /**
   * Get public key for frontend
   * Frontend needs public key to initialize PayMongo.js
   */
  getPublicKey(): string {
    return config.paymongo.publicKey || '';
  }

  /**
   * Format amount from pesos to centavos
   */
  toCentavos(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Format amount from centavos to pesos
   */
  toPesos(centavos: number): number {
    return centavos / 100;
  }
}

export const paymongoService = new PayMongoService();
