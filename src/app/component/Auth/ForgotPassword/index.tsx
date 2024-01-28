import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import store from '@stores/authStore';
import { InputComponentChildren } from '@/app/styled-components/Input';
import { Button } from '@/app/styled-components/Button';

type ResetFormStateType = {
  email: string;
  code?: string;
  password?: string;
  confirm_password?: string;
};

const ForgotPassword: React.FC = () => {
  const [state, setState] = useState<ResetFormStateType>({
    email: '',
  });
  const [eye, setEye] = useState({
    password: false,
    confirm_password: false,
  });
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [schema, setSchema] = useState<any>(
    yup
      .object({
        email: yup.string().email().required(),
      })
      .required(),
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const sendForm = async () => {
    try {
      switch (step) {
        case 'email':
          await store.getCode({ ...state }).then((res) => {
            if (res && state.email) {
              setStep('code');
            } else {
              toast('Incorect email', { type: 'error' });
            }
          });
          break;
        case 'code':
          await store
            .checkCode({ email: state.email, code: state.code ?? '' })
            .then((res) => {
              if (res && state.email && state.code) {
                setStep('reset');
              } else {
                toast('Incorect code', { type: 'error' });
              }
            });
          break;
        case 'reset':
          await store
            .ressetPassword({
              email: state.email,
              code: state.code ?? '',
              password: state.password ?? '',
            })
            .then((res) => {
              if (res) {
                navigate('/account');
                setState({
                  email: '',
                  code: undefined,
                  password: undefined,
                  confirm_password: undefined,
                });
                reset();
                toast('Password has been chenged!', { type: 'success' });
              } else {
                toast('Incorect password or code expired!', { type: 'error' });
              }
            });
          break;
      }
    } catch (err) {
      toast('Error inside Form');
    }
  };

  useEffect(() => {
    switch (step) {
      case 'email':
        setSchema(
          yup
            .object({
              email: yup.string().email().required(),
            })
            .required(),
        );
        break;
      case 'code':
        setSchema(
          yup
            .object({
              code: yup.string().required(),
            })
            .required(),
        );
        break;
      case 'reset':
        setSchema(
          yup
            .object({
              password: yup.string().required().min(6),
              confirm_password: yup
                .string()
                .required()
                .min(6)
                .test(
                  'passwords-match',
                  'Passwords must match',
                  function (value) {
                    return this.parent.password === value;
                  },
                ),
            })
            .required(),
        );
        break;
    }
  }, [step]);

  return (
    <form onSubmit={handleSubmit(sendForm)}>
      <h2>Reset Password</h2>
      {step === 'email' && (
        <>
          <InputComponentChildren
            hasValue={!!state.email}
            invalid={!!errors.email?.message}
            labelText="email*"
            errorMessage={errors.email?.message?.toString()}
          >
            <input
              type="text"
              placeholder="email"
              autoComplete="off"
              {...register('email', {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  const target = event.target as HTMLInputElement;
                  setState({ ...state, email: target.value });
                },
                value: state.email,
              })}
              name="email"
            />
          </InputComponentChildren>
        </>
      )}
      {step === 'code' && (
        <>
          <InputComponentChildren
            hasValue={!!state.code}
            invalid={!!errors.code?.message}
            labelText="code*"
            errorMessage={errors.code?.message?.toString()}
          >
            <input
              type="text"
              placeholder="code"
              autoComplete="off"
              {...register('code', {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  const target = event.target as HTMLInputElement;
                  setState({ ...state, code: target.value });
                },
                value: state.code,
              })}
              name="code"
            />
          </InputComponentChildren>
        </>
      )}
      {step === 'reset' && (
        <>
          <InputComponentChildren
            hasValue={!!state.password}
            invalid={!!errors.password?.message}
            labelText="password*"
            errorMessage={errors.password?.message?.toString()}
            eye={eye.password}
            eyeHandler={() => {
              setEye({ ...eye, password: !eye.password });
            }}
          >
            <input
              type={eye.password ? 'text' : 'password'}
              placeholder="password"
              autoComplete="off"
              {...register('password', {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  const target = event.target as HTMLInputElement;
                  setState({ ...state, password: target.value });
                },
                value: state.password,
              })}
              name="password"
            />
          </InputComponentChildren>
          <InputComponentChildren
            hasValue={!!state.confirm_password}
            invalid={!!errors.confirm_password?.message}
            labelText="confirm_password*"
            errorMessage={errors.confirm_password?.message?.toString()}
            eye={eye.confirm_password}
            eyeHandler={() => {
              setEye({ ...eye, confirm_password: !eye.confirm_password });
            }}
          >
            <input
              type={eye.confirm_password ? 'text' : 'password'}
              placeholder="confirm_password"
              autoComplete="off"
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              {...register('confirm_password', {
                onChange(event: React.SyntheticEvent<Element, Event>) {
                  const target = event.target as HTMLInputElement;
                  setState({ ...state, confirm_password: target.value });
                },
                value: state.confirm_password,
              })}
              name="confirm_password"
            />
          </InputComponentChildren>
        </>
      )}
      <Button
      // size="large"
      // backcolor="rgba(253, 48, 48, 1)"
      // backcolor_hover="rgba(253, 48, 48, 0.7)"
      // radius_border="12px"
      // style={{
      //   width: '180px',
      //   padding: '12px 20px',
      // }}
      >
        <span>
          {step === 'email' && 'Reset'}
          {step === 'code' && 'Reset'}
          {step === 'reset' && 'Reset'}
        </span>
      </Button>
    </form>
  );
};

export default ForgotPassword;
