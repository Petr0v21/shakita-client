import { createOneApplication } from '../../generated/mutation/createOneApplication';
import { updateMyOneApplication } from '../../generated/mutation/updateMyOneApplication';
import { findApplicationsByDate } from '../../generated/query/findApplicationsByDate';
import {
  MutationCreateOneApplicationArgs,
  MutationUpdateMyOneApplicationArgs,
  QueryFindApplicationsByDateArgs,
  SuccessOutput,
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

  async update(data: MutationUpdateMyOneApplicationArgs) {
    const res = await query(
      updateMyOneApplication({
        success: true,
      }),
      data,
    );
    return res as SuccessOutput | null;
  }
}

export const bookingService = new BookingService();
