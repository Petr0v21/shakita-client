import React, { useContext } from 'react';
import {
  StyledBonusItem,
  StyledBonusPopUp,
  StyledPersonalBonus,
} from '@styled/Bonus';
import PlayIcon from '@images/Play.svg';
import SmokeLeft from '@images/left-smoke.png';
import SmokeRight from '@images/right-smoke.png';
import ModalContext from '@/context/ModalContext';
import store from '@stores/userStore';
import { BonusLevelType, BonusTicketType } from '@/generated/types';
import QRCode from 'react-qr-code';
import { Button } from '@/app/styled-components/Button';

const PersonalBonus: React.FC = () => {
  const modalContext = useContext(ModalContext);
  const PopUp: React.FC<{
    type?: 'PERSONAL' | 'ALL' | 'ONCE';
    id?: string;
  }> = ({ type = 'PERSONAL', id }) => {
    switch (type) {
      case 'PERSONAL':
        const typePopUp = store.user.bonusTickets?.find(
          (ticket) => ticket.bonus?.asset === 'personal' && ticket.isActive,
        );
        switch (typePopUp?.bonus?.level) {
          case BonusLevelType.Junior:
            return (
              <StyledBonusPopUp>
                <div className="qr-code">
                  <QRCode value={typePopUp.code} />
                </div>
                <span className="level">Level: "{typePopUp.bonus.level}"</span>
                <span className="description">
                  {typePopUp.bonus.description}
                </span>
                <span className="discount">
                  Your Discount: <strong>{typePopUp.bonus.count}%</strong>
                </span>

                <Button
                  size="large"
                  backcolor="rgba(253, 48, 48, 1)"
                  backcolor_hover="rgba(253, 48, 48, 0.7)"
                  radius_border="12px"
                  margin="0"
                  style={{
                    width: '120px',
                    padding: '12px 20px',
                  }}
                  onClick={() => modalContext?.close()}
                >
                  Close
                </Button>
              </StyledBonusPopUp>
            );
          case BonusLevelType.Middle:
            return (
              <StyledBonusPopUp>
                <div className="qr-code">
                  <QRCode value={typePopUp.code} />
                </div>
                <span className="level">Level: "{typePopUp.bonus.level}"</span>
                <span className="description">
                  {typePopUp.bonus.description}
                </span>
                <span className="discount">
                  Your Discount: <strong>{typePopUp.bonus.count}%</strong>
                </span>

                <Button
                  size="large"
                  backcolor="rgba(253, 48, 48, 1)"
                  backcolor_hover="rgba(253, 48, 48, 0.7)"
                  radius_border="12px"
                  margin="0"
                  style={{
                    width: '120px',
                    padding: '12px 20px',
                  }}
                  onClick={() => modalContext?.close()}
                >
                  Close
                </Button>
              </StyledBonusPopUp>
            );
          case BonusLevelType.Senior:
            return (
              <StyledBonusPopUp>
                <div className="qr-code">
                  <QRCode value={typePopUp.code} />
                </div>
                <span className="level">Level: "{typePopUp.bonus.level}"</span>
                <span className="description">
                  {typePopUp.bonus.description}
                </span>
                <span className="discount">
                  Your Discount: <strong>{typePopUp.bonus.count}%</strong>
                </span>

                <Button
                  size="large"
                  backcolor="rgba(253, 48, 48, 1)"
                  backcolor_hover="rgba(253, 48, 48, 0.7)"
                  radius_border="12px"
                  margin="0"
                  style={{
                    width: '120px',
                    padding: '12px 20px',
                  }}
                  onClick={() => modalContext?.close()}
                >
                  Close
                </Button>
              </StyledBonusPopUp>
            );
          default:
            return (
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
                <span>Верифицируй свой аккаунт</span>
                <Button
                  size="large"
                  backcolor="rgba(253, 48, 48, 1)"
                  backcolor_hover="rgba(253, 48, 48, 0.7)"
                  radius_border="12px"
                  style={{
                    width: '180px',
                    padding: '12px 20px',
                  }}
                  onClick={() => modalContext?.close()}
                >
                  Close
                </Button>
              </StyledBonusPopUp>
            );
        }
      case 'ALL':
        return (
          <StyledBonusPopUp
            style={{
              width: 'auto',
              minWidth: 320,
              minHeight: 240,
            }}
          >
            <h3>All bonuses</h3>
            {store.user.bonusTickets
              ?.filter(({ isActive }) => isActive)
              .map((item) => (
                <StyledBonusItem
                  onClick={() =>
                    modalContext?.open(
                      <PopUp
                        key={item.id + 'bonusTicket'}
                        type="ONCE"
                        id={item.id}
                      />,
                      'center',
                    )
                  }
                >
                  <span>{item.bonus?.asset}</span>
                  <img src={PlayIcon} alt="play" />
                </StyledBonusItem>
              ))}
          </StyledBonusPopUp>
        );
      case 'ONCE':
        const ticket = store.user.bonusTickets?.find((item) => item.id === id);
        if (ticket) {
          return (
            <StyledBonusPopUp>
              <div className="qr-code">
                <QRCode value={ticket.code} />
              </div>
              <span className="description">{ticket.bonus?.description}</span>
              <span className="discount">
                Your Discount:{' '}
                <strong>
                  {ticket.bonus?.count}{' '}
                  {ticket.ticketType === BonusTicketType.Const ? '%' : 'points'}
                </strong>
              </span>

              <Button
                size="large"
                backcolor="rgba(253, 48, 48, 1)"
                backcolor_hover="rgba(253, 48, 48, 0.7)"
                radius_border="12px"
                margin="0"
                style={{
                  width: '120px',
                  padding: '12px 20px',
                }}
                onClick={() => modalContext?.close()}
              >
                Close
              </Button>
            </StyledBonusPopUp>
          );
        }
    }
  };
  return (
    <StyledPersonalBonus>
      <h5>
        Ваш личний код для пользования дает возможность накопычивать балы, за
        которые мы дадим вам подарки
      </h5>
      <StyledBonusItem onClick={() => modalContext?.open(<PopUp />, 'center')}>
        <span>Персональний Бонус</span>
        <img src={PlayIcon} alt="play" />
      </StyledBonusItem>

      <div className="preview-fon-images">
        <img
          src={SmokeLeft}
          alt="preview-fon-image-left"
          className="preview-fon-image"
          style={{
            left: 0,
          }}
        />
        <img
          src={SmokeRight}
          alt="preview-fon-image-right"
          className="preview-fon-image"
          style={{
            right: 0,
          }}
        />
      </div>
      {/* <span className="all-bonuses"> БОНУСЫ</span> */}
      <StyledBonusItem
        onClick={() => modalContext?.open(<PopUp type="ALL" />, 'center')}
        style={{ width: '180px' }}
      >
        <span>Все Бонусы</span>
      </StyledBonusItem>
      <span className="advice">
        Подсказка: используйте свой код при каждом походе в наше заведение,
        поскольку так вы бистро заработаете нужное количество балом для подарков
      </span>
    </StyledPersonalBonus>
  );
};

export default PersonalBonus;
