import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../../../context/AuthContext';
import store from '../../../../stores/authStore';
import { Button } from '../../../styled-components/Button';
import {
  InputComponentChildren,
  StyledImg,
  StyledInput,
} from '../../../styled-components/Input';
import eyeShow from '../../../../static/images/Show.svg';
import eyeHide from '../../../../static/images/Hide.svg';
import GoogleButton from '../GoogleButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

type FormValues = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const FormLogIn: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange', resolver: yupResolver(schema) });

  const sendForm = async (props: FormValues) => {
    const result = await store.logIn();
    if (result) {
      reset();
      store.cleanForm();
      navigate('/account/me');
      auth?.checkAuth();
      return;
    }
    return toast('Invalid credentials', { type: 'error' });
  };
  return (
    <>
      <form onSubmit={handleSubmit(sendForm)}>
        <h2
          style={{
            display: 'flex',
            gap: '2em',
          }}
        >
          <Link
            to="/account"
            style={{
              borderBottom: '1px solid white',
            }}
          >
            Log In
          </Link>{' '}
          <Link to="/account/signup">Sign Up</Link>
        </h2>
        <InputComponentChildren
          hasValue={!!store.authFormState.email}
          labelText="email"
          invalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
        >
          <input
            type="text"
            autoComplete="off"
            {...register('email', {
              onChange(event: React.SyntheticEvent<Element, Event>) {
                const target = event.target as HTMLInputElement;
                store.addField(target.value, target.name);
              },
              value: store.authFormState.email,
            })}
            name="email"
          />
        </InputComponentChildren>
        <InputComponentChildren
          hasValue={!!store.authFormState.password}
          labelText="password"
          invalid={!!errors.password?.message}
          errorMessage={errors.password?.message}
        >
          <input
            type={show ? 'text' : 'password'}
            placeholder="password"
            autoComplete="off"
            {...register('password', {
              onChange(event: React.SyntheticEvent<Element, Event>) {
                const target = event.target as HTMLInputElement;
                store.addField(target.value, target.name);
              },
              value: store.authFormState.password,
            })}
            name="password"
          />
          <StyledImg
            src={show ? eyeShow : eyeHide}
            alt="eye"
            onClick={() => setShow(!show)}
          />
        </InputComponentChildren>
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
          Войти
        </Button>
        <Link
          to={'forgot'}
          style={{
            fontSize: '14px',
            opacity: 0.7,
            padding: '1em',
          }}
        >
          Forgot password
        </Link>
        <GoogleButton />
      </form>
    </>
  );
};

export default observer(FormLogIn);
