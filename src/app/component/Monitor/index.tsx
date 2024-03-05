import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ModalContext from '@/context/ModalContext';
import { StyledBonusPopUp } from '@/app/styled-components/Bonus';
import { Button } from '@/app/styled-components/Button';
import { bonusService } from '@services/bonusService';
import store from '@stores/userStore';
import { observer } from 'mobx-react-lite';
import { BonusTicketType } from '@/generated/types';

const Monitor: React.FC = () => {
  const modal = useContext(ModalContext);
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const bonusId = params.get('bonus');
    if (bonusId) {
      if (!store.user.id) {
        modal?.open(
          <StyledBonusPopUp>
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              fill="var(--toastify-icon-color-error)"
              className="error-icon"
            >
              <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path>
            </svg>
            <h5>Вы незарегестриван пользователь</h5>
            <span
              className="description"
              style={{
                textAlign: 'center',
              }}
            >
              Чтобы использовать бонусы зарегестрируйтесь или ввойдите в свой
              кабинет
            </span>
            <Button
              size="large"
              backcolor="rgba(253, 48, 48, 1)"
              backcolor_hover="rgba(253, 48, 48, 0.7)"
              radius_border="12px"
              style={{
                width: '180px',
                padding: '12px 20px',
              }}
              onClick={() => {
                navigate('/account');
                modal.close();
              }}
            >
              Авторизоваться
            </Button>
          </StyledBonusPopUp>,
          'center',
        );
      } else {
        bonusService.getBonus({ id: bonusId }).then((item) => {
          modal?.open(
            <StyledBonusPopUp>
              <h5>Бонус {item?.asset}</h5>
              <span>{item?.description}</span>
              <Button
                size="large"
                backcolor="rgba(253, 48, 48, 1)"
                backcolor_hover="rgba(253, 48, 48, 0.7)"
                radius_border="12px"
                style={{
                  width: '180px',
                  padding: '12px 20px',
                }}
                onClick={() =>
                  bonusService
                    .createBonusTicket({
                      bonusId,
                      code: store.user.id + '-' + bonusId,
                      userId: store.user.id,
                      ticketType: BonusTicketType.Disposable,
                    })
                    .then((res) => {
                      if (res?.id) {
                        modal?.open(
                          <StyledBonusPopUp>
                            <svg
                              viewBox="0 0 24 24"
                              width="100%"
                              height="100%"
                              fill="var(--toastify-icon-color-success)"
                              className="error-icon"
                            >
                              <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
                            </svg>
                            <h5>Вы успешно добавили бонус!</h5>
                            <Button
                              size="large"
                              backcolor="rgba(253, 48, 48, 1)"
                              backcolor_hover="rgba(253, 48, 48, 0.7)"
                              radius_border="12px"
                              style={{
                                width: '180px',
                                padding: '12px 20px',
                              }}
                              onClick={() => modal?.close()}
                            >
                              Закрыть
                            </Button>
                          </StyledBonusPopUp>,
                          'center',
                        );
                      } else {
                        modal?.open(
                          <StyledBonusPopUp>
                            <svg
                              viewBox="0 0 24 24"
                              width="100%"
                              height="100%"
                              fill="var(--toastify-icon-color-error)"
                              className="error-icon"
                            >
                              <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path>
                            </svg>
                            <h5>Для вас этот бонус не активный</h5>
                            <Button
                              size="large"
                              backcolor="rgba(253, 48, 48, 1)"
                              backcolor_hover="rgba(253, 48, 48, 0.7)"
                              radius_border="12px"
                              style={{
                                width: '180px',
                                padding: '12px 20px',
                              }}
                              onClick={() => modal?.close()}
                            >
                              Закрыть
                            </Button>
                          </StyledBonusPopUp>,
                          'center',
                        );
                      }
                    })
                    .catch((err) => {
                      modal?.open(
                        <StyledBonusPopUp>
                          <svg
                            viewBox="0 0 24 24"
                            width="100%"
                            height="100%"
                            fill="var(--toastify-icon-color-error)"
                            className="error-icon"
                          >
                            <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path>
                          </svg>
                          <h5>Для вас этот бонус не активный</h5>
                          <Button onClick={() => modal?.close()}>
                            Закрыть
                          </Button>
                        </StyledBonusPopUp>,
                        'center',
                      );
                    })
                }
              >
                Добавить
              </Button>
            </StyledBonusPopUp>,
            'center',
          );
        });
      }
    }
  }, [params.get('bonus'), store.user.id]);

  return (
    <div className="monitor">
      <Header />
      <div className="outlet-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default observer(Monitor);
