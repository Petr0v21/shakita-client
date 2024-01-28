import { updateMe } from '../../generated/mutation/updateMe';
import { getMe } from '../../generated/query/getMe';
import { MutationUpdateMeArgs } from '../../generated/types';
import { query } from '../query';
export class UserService {
  async getMyInfo() {
    const res = await query(
      getMe({
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        picture: true,
        enable_notifications: true,
        verified_email: true,
        isFullAuth: true,
        isGoogleAuth: true,
        instagram: true,
        telegram: true,
        updatedAt: true,
        createdAt: true,
        bonusTickets: {
          id: true,
          activeTill: true,
          code: true,
          isActive: true,
          ticketType: true,
          bonus: {
            id: true,
            asset: true,
            condition: true,
            count: true,
            createdAt: true,
            description: true,
            isActive: true,
            level: true,
            payload: true,
            valueType: true,
          },
        },
        applications: {
          id: true,
          date: true,
          email: true,
          description: true,
          status: true,
          place: true,
          name: true,
          phone: true,
          enable_notification: true,
          instagram: true,
          telegram: true,
          createdAt: true,
          updatedAt: true,
        },
        // sessions: {
        //   id: true,
        //   ip: true,
        //   refreshToken: true,
        //   userAgent: true,
        //   createdAt: true,
        //   updatedAt: true,
        // },
      }),
      null,
    );
    return res;
  }

  async update(data: MutationUpdateMeArgs) {
    const res = await query(
      updateMe({
        success: true,
      }),
      data,
    );
    return res;
  }
}

export const userService = new UserService();
