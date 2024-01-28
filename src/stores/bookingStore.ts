import { makeAutoObservable } from 'mobx';
import {
  BookingService,
  bookingService,
} from '../shared/services/bookingService';
import { PlaceActiveType } from '../types';

class BookingStore {
  body: PlaceActiveType = {
    date: '',
    email: '',
    place: '',
    name: '',
    enable_notification: true,
  };
  constructor(private readonly bookingService: BookingService) {
    makeAutoObservable(this);
  }

  addField(value: string | boolean, name: string) {
    this.body = { ...this.body, [name]: value };
  }

  cleanForm() {
    this.body = {
      date: this.body.date,
      email: '',
      place: '',
      name: '',
      enable_notification: true,
    };
  }

  async book() {
    try {
      const result = await this.bookingService.book({ ...this.body });
      this.cleanForm();
      return result;
    } catch (err) {
      console.error('Book Error', err);
    }
  }

  async find() {
    try {
      const result = await this.bookingService.find({ date: this.body.date });
      return result;
    } catch (err) {
      console.error('Book Error', err);
    }
  }
}
export default new BookingStore(bookingService);
