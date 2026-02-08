/**
 * Email Service
 * Handles sending emails using Resend API
 */

import { Resend } from 'resend';
import { config } from '../config/env';

class EmailService {
  private resend: Resend | null = null;

  /**
   * Get or create Resend client
   * Returns null if not configured (emails will be skipped gracefully)
   */
  private getClient(): Resend | null {
    if (!config.email.resendApiKey) {
      console.warn('[EmailService] RESEND_API_KEY not configured - emails will be skipped');
      return null;
    }
    if (!this.resend) {
      this.resend = new Resend(config.email.resendApiKey);
    }
    return this.resend;
  }

  /**
   * Send email verification email
   *
   * @param email - Recipient email address
   * @param token - Verification token
   * @returns true if email was sent, false if skipped (not configured)
   */
  async sendVerificationEmail(email: string, token: string): Promise<boolean> {
    const client = this.getClient();
    if (!client) {
      return false;
    }

    const frontendUrl = config.frontend.url || 'http://localhost:3000';
    const verifyUrl = `${frontendUrl}/verify-email?token=${token}`;

    try {
      await client.emails.send({
        from: config.email.from,
        to: email,
        subject: 'Verify your ReviewGuro account',
        html: this.getVerificationEmailTemplate(verifyUrl),
      });

      console.log(`[EmailService] Verification email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('[EmailService] Failed to send verification email:', error);
      throw error;
    }
  }

  /**
   * Send password reset email
   *
   * @param email - Recipient email address
   * @param token - Password reset token
   * @returns true if email was sent, false if skipped (not configured)
   */
  async sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
    const client = this.getClient();
    if (!client) {
      return false;
    }

    const frontendUrl = config.frontend.url || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

    try {
      await client.emails.send({
        from: config.email.from,
        to: email,
        subject: 'Reset your ReviewGuro password',
        html: this.getPasswordResetEmailTemplate(resetUrl),
      });

      console.log(`[EmailService] Password reset email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('[EmailService] Failed to send password reset email:', error);
      throw error;
    }
  }

  /**
   * Generate HTML email template for password reset
   */
  private getPasswordResetEmailTemplate(resetUrl: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 480px; width: 100%; border-collapse: collapse;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <div style="display: inline-flex; align-items: center; gap: 8px;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #2563eb, #1d4ed8); display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-weight: bold; font-size: 18px;">R</span>
                </div>
                <span style="font-size: 24px; font-weight: bold; color: #0f172a;">
                  Review<span style="color: #2563eb;">Guro</span>
                </span>
              </div>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #0f172a; text-align: center;">
                Reset your password
              </h1>

              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #475569; text-align: center;">
                We received a request to reset your password. Click the button below to create a new password.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px; font-size: 14px; line-height: 20px; color: #64748b; text-align: center;">
                Or copy and paste this link into your browser:
              </p>

              <p style="margin: 0 0 24px; font-size: 12px; line-height: 18px; color: #2563eb; text-align: center; word-break: break-all;">
                ${resetUrl}
              </p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

              <p style="margin: 0; font-size: 13px; line-height: 20px; color: #94a3b8; text-align: center;">
                This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 20px;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} ReviewGuro. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }

  /**
   * Generate HTML email template for verification
   */
  private getVerificationEmailTemplate(verifyUrl: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 480px; width: 100%; border-collapse: collapse;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <div style="display: inline-flex; align-items: center; gap: 8px;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #2563eb, #1d4ed8); display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-weight: bold; font-size: 18px;">R</span>
                </div>
                <span style="font-size: 24px; font-weight: bold; color: #0f172a;">
                  Review<span style="color: #2563eb;">Guro</span>
                </span>
              </div>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #0f172a; text-align: center;">
                Verify your email address
              </h1>

              <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #475569; text-align: center;">
                Thanks for signing up for ReviewGuro! Please click the button below to verify your email address and start your exam preparation journey.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px; font-size: 14px; line-height: 20px; color: #64748b; text-align: center;">
                Or copy and paste this link into your browser:
              </p>

              <p style="margin: 0 0 24px; font-size: 12px; line-height: 18px; color: #2563eb; text-align: center; word-break: break-all;">
                ${verifyUrl}
              </p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

              <p style="margin: 0; font-size: 13px; line-height: 20px; color: #94a3b8; text-align: center;">
                This link will expire in 24 hours. If you didn't create an account with ReviewGuro, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 20px;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} ReviewGuro. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }
}

export const emailService = new EmailService();
