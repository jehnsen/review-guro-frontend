import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

export type AuditAction =
  | 'user.register'
  | 'user.login'
  | 'user.logout'
  | 'user.password_changed'
  | 'user.password_reset_requested'
  | 'user.password_reset'
  | 'user.email_verified'
  | 'payment.activated'
  | 'season_pass.redeemed'
  | 'admin.login'
  | 'admin.action';

interface AuditEvent {
  userId?: string;
  action: AuditAction;
  resource?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Prisma.InputJsonValue;
}

class AuditService {
  async log(event: AuditEvent): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId: event.userId,
          action: event.action,
          resource: event.resource,
          resourceId: event.resourceId,
          ipAddress: event.ipAddress,
          userAgent: event.userAgent,
          metadata: event.metadata,
        },
      });
    } catch (error) {
      // Audit logging must never crash the main flow
      console.error('[Audit] Failed to write audit log:', error);
    }
  }
}

export const auditService = new AuditService();
