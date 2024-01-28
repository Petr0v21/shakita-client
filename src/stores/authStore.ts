import { AuthFormType } from '@/types';
import { makeAutoObservable } from 'mobx';
import { AuthService, authService } from '@services/authService';
import {
  MutationGetCodeArgs,
  MutationResetPasswordCodeArgs,
  QueryCheckCodeArgs,
} from '@/generated/types';

class AuthStore {
  authFormState: AuthFormType = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    code: '',
  };
  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
  }

  addField(value: string, name: string) {
    this.authFormState = { ...this.authFormState, [name]: value };
  }

  cleanForm() {
    this.authFormState = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      code: '',
    };
  }

  async signUp() {
    try {
      const result = await this.authService.register({
        name: this.authFormState.name,
        email: this.authFormState.email,
        password: this.authFormState.password,
        phone: this.authFormState.phone,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async logIn() {
    try {
      const result = await this.authService.login({
        email: this.authFormState.email,
        password: this.authFormState.password,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async googleAuth(token: string) {
    try {
      const result = await this.authService.googleAuth({
        token,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getCode(body: MutationGetCodeArgs) {
    try {
      const result = (await this.authService.getCode(body)) as {
        success: boolean;
      };
      if (result && result.success) {
        return result.success;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async checkCode(body: QueryCheckCodeArgs) {
    try {
      const result = (await this.authService.checkCode(body)) as {
        success: boolean;
      };
      if (result && result.success) {
        return result.success;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async ressetPassword(body: MutationResetPasswordCodeArgs) {
    try {
      const result = (await this.authService.resetPasswordCode(body)) as {
        success: boolean;
      };
      if (result && result.success) {
        return result.success;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }
}
export default new AuthStore(authService);
