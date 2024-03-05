import { createBonusTicket } from '../../generated/mutation/createBonusTicket';
import { findOneBonus } from '../../generated/query/findOneBonus';
import {
  Bonus,
  BonusTicketType,
  MutationCreateBonusTicketArgs,
  QueryFindOneBonusArgs,
} from '../../generated/types';
import { query } from '../../shared/query';

export class BonusService {
  async createBonusTicket(data: MutationCreateBonusTicketArgs) {
    const res = await query(
      createBonusTicket({
        id: true,
        activeTill: true,
        code: true,
        isActive: true,
        ticketType: true,
      }),
      data,
    );
    return res as {
      id: string;
      activeTill: string;
      code: string;
      isActive: boolean;
      ticketType: BonusTicketType;
    } | null;
  }

  async getBonus(data: QueryFindOneBonusArgs) {
    const res = await query(
      findOneBonus({
        id: true,
        asset: true,
        condition: true,
        count: true,
        createdAt: true,
        description: true,
        isActive: true,
        level: true,
        payload: true,
        updatedAt: true,
        valueType: true,
      }),
      data,
    );
    return res as Bonus | null;
  }
}

export const bonusService = new BonusService();
