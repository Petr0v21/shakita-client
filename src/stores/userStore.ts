import { AccountType } from '@/types';
import { makeAutoObservable } from 'mobx';
import { UserService, userService } from '../shared/services/userService';
import { UserRole, UserType } from '@/generated/types';

class UserStore {
  user: UserType = {
    id: '',
    email: '',
    enable_notifications: false,
    isFullAuth: false,
    role: UserRole.Blocked,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  constructor(private readonly userService: UserService) {
    makeAutoObservable(this);
  }

  addField(value: string | boolean | null, name: string) {
    this.user = { ...this.user, [name]: value };
  }

  cleanForm() {
    this.user = {
      id: '',
      email: '',
      enable_notifications: false,
      isFullAuth: false,
      role: UserRole.Blocked,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async handleFileUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const accessToken = (
        await JSON.parse(localStorage.getItem('tokens') as string)
      ).accessToken;
      const result = await fetch('https://shakita-core.onrender.com/file/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error(err));
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async uploadImage(event: any) {
    const res:
      | {
          Location: string;
          Key: string;
        }
      | null
      | undefined = await this.handleFileUpload(event);
    if (res) {
      this.user.picture = res.Location;
    }
  }

  async getMe() {
    try {
      const result = await this.userService.getMyInfo();
      if ((result as any)?.id) {
        this.user = result as any;
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateMe() {
    try {
      const result = await this.userService.update({
        id: this.user.id,
        name: this.user.name,
        phone: this.user.phone,
        instagram: this.user.instagram,
        password: this.user.password,
        telegram: this.user.telegram,
        enable_notifications: this.user.enable_notifications,
        picture: this.user.picture,
      });
      if ((result as any)?.success) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
export default new UserStore(userService);
