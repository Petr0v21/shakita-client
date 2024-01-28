import { login } from '../../generated/query/login';
import { authGoogle } from '../../generated/mutation/authGoogle';
import { register } from '../../generated/mutation/register';
import { getCode } from '../../generated/mutation/getCode';
import { logout } from '../../generated/mutation/logout';
import { checkCode } from '../../generated/query/checkCode';
import { resetPasswordCode } from '../../generated/mutation/resetPasswordCode';
import {
  QueryLoginArgs,
  MutationAuthGoogleArgs,
  MutationRegisterArgs,
  MutationResetPasswordCodeArgs,
  QueryCheckCodeArgs,
  MutationGetCodeArgs,
  MutationLogoutArgs,
} from '../../generated/types';
import { query } from '../../shared/query';
export class AuthService {
  async login(data: QueryLoginArgs) {
    const res = await query(
      login({
        accessToken: true,
        refreshToken: true,
      }),
      data,
    );
    if (res) {
      localStorage.setItem('tokens', JSON.stringify(res));
      return (res as any).refreshToken ? true : false;
    }
    return false;
  }

  async googleAuth(data: MutationAuthGoogleArgs) {
    const res = await query(
      authGoogle({
        accessToken: true,
        refreshToken: true,
      }),
      data,
    );
    if (res) {
      localStorage.setItem('tokens', JSON.stringify(res));
      return (res as any).refreshToken ? true : false;
    }
    return false;
  }

  async register(data: MutationRegisterArgs) {
    const res = await query(
      register({
        accessToken: true,
        refreshToken: true,
      }),
      data,
    );
    if (res) {
      localStorage.setItem('tokens', JSON.stringify(res));
      return (res as any).refreshToken ? true : false;
    }
    return false;
  }

  async getCode(data: MutationGetCodeArgs) {
    const res = await query(
      getCode({
        success: true,
      }),
      data,
    );
    return res;
  }

  async checkCode(data: QueryCheckCodeArgs) {
    const res = await query(
      checkCode({
        success: true,
      }),
      data,
    );
    return res;
  }

  async resetPasswordCode(data: MutationResetPasswordCodeArgs) {
    const res = await query(
      resetPasswordCode({
        success: true,
      }),
      data,
    );
    return res;
  }

  async logout(data: MutationLogoutArgs) {
    const res = await query(
      logout({
        success: true,
      }),
      data,
    );
    return res;
  }
}

export const authService = new AuthService();
