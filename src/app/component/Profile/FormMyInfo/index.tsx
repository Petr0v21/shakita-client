import { observer } from 'mobx-react-lite';
import React from 'react';
import store from '../../../../stores/userStore';
import { Button } from '../../../styled-components/Button';
import { InputComponentChildren } from '../../../styled-components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DefaultAvatar from '@images/DefaultAvatar.svg';
import * as yup from 'yup';
import UserHistory from '../History';
import { StyledProfile } from '@styled/Profile';
import { DropDownComponentChildren } from '@styled/Select';
import { SpanComponent } from '@styled/Span';
import { toast } from 'react-toastify';

type FormValues = {
  avatar?: string | null;
  name: string;
  phone?: string | null;
  telegram?: string | null;
  instagram?: string | null;
};

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const schema = yup
  .object({
    avatar: yup.string().nullable().optional(),
    name: yup.string().min(3).required(),
    phone: yup
      .string()
      .nullable()
      .optional()
      .matches(phoneRegExp, 'Phone number is not valid'),
    telegram: yup.string().nullable().optional(),
    instagram: yup.string().nullable().optional(),
  })
  .required();

const ProfileFormMyInfo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange', resolver: yupResolver(schema) });
  const sendForm = async (props: FormValues) => {
    const result = await store.updateMe();
    if (!result) {
      toast('Error update', { type: 'error' });
      return;
    }
    toast('User updated successfully!', { type: 'success' });
    return;
  };
  return (
    <StyledProfile>
      <div className="form-container">
        <h3>User Information</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="main-info">
            <SpanComponent
              priority="main"
              text={`ID: ${store.user.id}`}
              withCopy
              value={store.user.id}
            />
            <SpanComponent
              text={`CreatedAt: ${store.user.createdAt
                ?.toString()
                .replace('T', ' ')
                .slice(0, 19)}`}
              value={
                store.user.createdAt
                  ?.toString()
                  .replace('T', ' ')
                  .slice(0, 19) ?? ''
              }
            />
            <SpanComponent
              text={`UpdatedAt: ${store.user.createdAt
                ?.toString()
                .replace('T', ' ')
                .slice(0, 19)}`}
              value={
                store.user.updatedAt
                  ?.toString()
                  .replace('T', ' ')
                  .slice(0, 19) ?? ''
              }
            />
          </div>
          <form onSubmit={handleSubmit(sendForm)}>
            <div
              className="form-row"
              style={{
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <div className="conteiner-file-input">
                <img alt="dow" src={store.user.picture ?? DefaultAvatar} />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="actual-btn-1"
                  hidden
                  onChange={async (event) => {
                    store.uploadImage(event);
                  }}
                />
                <label htmlFor="actual-btn-1"></label>
              </div>
              <div className="form-column">
                <InputComponentChildren
                  invalid={!!errors?.name}
                  errorMessage={errors.name?.message}
                  hasValue={!!store.user.name}
                  labelText="name"
                >
                  <input
                    type="text"
                    placeholder="name"
                    autoComplete="off"
                    {...register('name', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        store.addField(target.value, target.name);
                      },
                      value: store.user.name ?? '',
                    })}
                    name="name"
                  />
                </InputComponentChildren>
                <InputComponentChildren
                  hasValue={!!store.user.email}
                  labelText="email"
                >
                  <input
                    type="text"
                    placeholder="email"
                    autoComplete="off"
                    value={store.user.email}
                    disabled
                    name="email"
                  />
                </InputComponentChildren>
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <InputComponentChildren
                  invalid={!!errors?.phone}
                  errorMessage={errors.phone?.message}
                  hasValue={!!store.user.phone}
                  labelText="phone"
                >
                  <input
                    type="text"
                    placeholder="phone"
                    autoComplete="off"
                    {...register('phone', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        store.addField(target.value, target.name);
                      },
                      value: store.user.phone,
                    })}
                    name="phone"
                  />
                </InputComponentChildren>
                <InputComponentChildren
                  invalid={!!errors?.telegram}
                  errorMessage={errors.telegram?.message}
                  hasValue={!!store.user.telegram}
                  labelText="telegram"
                >
                  <input
                    type="text"
                    placeholder="telegram"
                    autoComplete="off"
                    {...register('telegram', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        store.addField(target.value, target.name);
                      },
                      value: store.user.telegram,
                    })}
                    name="telegram"
                  />
                </InputComponentChildren>
              </div>
              <div className="form-column">
                <InputComponentChildren
                  invalid={!!errors?.instagram}
                  errorMessage={errors.instagram?.message}
                  hasValue={!!store.user.instagram}
                  labelText="instagram"
                >
                  <input
                    type="text"
                    placeholder="instagram"
                    autoComplete="off"
                    {...register('instagram', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        store.addField(target.value, target.name);
                      },
                      value: store.user.instagram,
                    })}
                    name="instagram"
                  />
                </InputComponentChildren>
                <DropDownComponentChildren
                  hasValue={
                    store.user.enable_notifications !== null ||
                    store.user.enable_notifications !== undefined
                  }
                  labelText="Notification"
                  readOnly
                >
                  <input
                    type="text"
                    placeholder="Notification"
                    name="notification"
                    autoComplete="off"
                    value={store.user.enable_notifications ? 'Yes' : 'No'}
                    readOnly
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                  <div className="drop-down-content">
                    <span
                      onClick={() =>
                        store.addField(null, 'enable_notifications')
                      }
                    >
                      {''}
                    </span>
                    <span
                      onClick={() =>
                        store.addField(true, 'enable_notifications')
                      }
                    >
                      Yes
                    </span>
                    <span
                      onClick={() =>
                        store.addField(false, 'enable_notifications')
                      }
                    >
                      No
                    </span>
                  </div>
                </DropDownComponentChildren>
              </div>
            </div>

            <Button
              size="large"
              backcolor="rgba(253, 48, 48, 1)"
              backcolor_hover="rgba(253, 48, 48, 0.7)"
              radius_border="12px"
              style={{
                width: '180px',
                padding: '12px 20px',
              }}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
      <UserHistory applications={store.user.applications ?? []} />
    </StyledProfile>
  );
};

export default observer(ProfileFormMyInfo);
