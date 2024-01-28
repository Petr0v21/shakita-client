import { createOneApplication } from '../../generated/mutation/createOneApplication';
import { findApplicationsByDate } from '../../generated/query/findApplicationsByDate';
import {
  MutationCreateOneApplicationArgs,
  QueryFindApplicationsByDateArgs,
} from '../../generated/types';
import { query } from '../query';
export class BookingService {
  async book(data: MutationCreateOneApplicationArgs) {
    const res = await query(
      createOneApplication({
        id: true,
        createdAt: true,
        date: true,
        email: true,
        status: true,
        place: true,
        name: true,
      }),
      data,
    );
    return res;
  }

  async find(data: QueryFindApplicationsByDateArgs) {
    const res = await query(
      findApplicationsByDate({
        id: true,
        createdAt: true,
        date: true,
        status: true,
        place: true,
      }),
      data,
    );
    return res;
  }
}

export const bookingService = new BookingService();
