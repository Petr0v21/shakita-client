import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputComponentChildren } from '../../../styled-components/Input';
import { Button } from '../../../styled-components/Button';
import store from '../../../../stores/bookingStore';
import CheckBoxComponet from '@/app/styled-components/SmallChecks';
import { toast } from 'react-toastify';

type FormValues = {
  name: string;
  email: string;
  contact: string;
  description?: string;
};

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const telegramRegExp = /^@[a-zA-Z][a-zA-Z0-9_]{4,30}$/;

const schema = yup
  .object({
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    contact: yup.string().required(),
    description: yup.string().optional(),
  })
  .required();

const FormBooking: React.FC<{ clearHandler: () => void }> = ({
  clearHandler,
}) => {
  const [state, setState] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange', resolver: yupResolver(schema) });

  const sendBodyTableBooked = async () => {
    if (!state.match(telegramRegExp)) {
      if (!state.match(phoneRegExp)) {
        return setError('contact', { message: 'Incorect phone or telegram' });
      }
      store.addField(state, 'phone');
    } else {
      store.addField(state, 'telegram');
    }
    if (store.body.place) {
      const result = await store.book();
      if (result) {
        setState('');
        reset();
        clearHandler();
        toast('Your successfully booked place', { type: 'success' });
      }
    } else {
      toast('Choose place on image', { type: 'warning' });
    }
  };

  return (
    <div className="form-booking">
      <form
        className="inputs-form"
        onSubmit={handleSubmit(sendBodyTableBooked)}
      >
        <InputComponentChildren
          invalid={!!errors.name}
          errorMessage={errors.name?.message}
          hasValue={!!store.body.name}
          labelText="name*"
        >
          <input
            {...register('name', {
              onChange(event: React.ChangeEvent<HTMLInputElement>) {
                store.addField(event.target.value, 'name');
              },
              value: store.body.name,
            })}
            name="name"
            autoComplete="off"
          />
        </InputComponentChildren>
        <InputComponentChildren
          invalid={!!errors?.email}
          errorMessage={errors.email?.message}
          hasValue={!!store.body.email}
          labelText="email*"
        >
          <input
            {...register('email', {
              value: store.body.email,
              onChange(event: React.ChangeEvent<HTMLInputElement>) {
                store.addField(event.target.value, 'email');
              },
            })}
            name="email"
            autoComplete="off"
          />
        </InputComponentChildren>
        <InputComponentChildren
          invalid={!!errors?.contact}
          errorMessage={errors.contact?.message}
          hasValue={!!state}
          labelText="phone/telgram*"
        >
          <input
            {...register('contact', {
              value: state,
              onChange(event: React.ChangeEvent<HTMLInputElement>) {
                setState(event.target.value);
              },
            })}
            autoComplete="off"
          />
        </InputComponentChildren>
        <InputComponentChildren
          invalid={!!errors?.description}
          errorMessage={errors.description?.message}
          hasValue={!!store.body.description}
          labelText="description"
        >
          <textarea
            {...register('description', {
              value: store.body.phone,
              onChange(event: React.ChangeEvent<HTMLInputElement>) {
                store.addField(event.target.value, 'description');
              },
            })}
            name="description"
            autoComplete="off"
          />
        </InputComponentChildren>
        <div className="checkbox">
          <CheckBoxComponet size="medium" effect="bounce">
            <input
              type="checkbox"
              name="enable_notification"
              checked={store.body.enable_notification}
              onChange={(event) =>
                store.addField(event.target.checked, 'enable_notification')
              }
            />
          </CheckBoxComponet>
          <label>Agree with Politic Information</label>
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
          Забей!
        </Button>
      </form>
    </div>
  );
};

export default observer(FormBooking);
