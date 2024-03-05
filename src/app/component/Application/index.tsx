import React, { useContext, useState } from 'react';
import { StyledBonusPopUp } from '@styled/Bonus';
import Draw from '@component/Draw';
import { bookingService } from '@services/bookingService';
import { Application, ApplicationStatus } from '@/generated/types';
import * as yup from 'yup';
import { Button } from '@/app/styled-components/Button';
import { SpanComponent } from '@/app/styled-components/Span';
import { toast } from 'react-toastify';
import ModalContext from '@/context/ModalContext';

const ApplicationForm: React.FC<{ application: Application }> = ({
  application,
}) => {
  const modal = useContext(ModalContext);
  const [state, setState] = useState(application);
  return (
    <StyledBonusPopUp
      style={{
        width: 'auto',
        maxWidth: 'calc(360px + 2em)',
      }}
    >
      <h3>Application</h3>
      <div
        style={{
          display: 'flex',
          gap: '1em',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Draw
          tablesChoosed={state.place}
          choseHandler={() => {}}
          width="320px"
          height="auto"
          blockChoose={true}
        />
        <div className="application-info">
          <div className="main-info">
            <SpanComponent
              priority="main"
              text={`ID: ${application.id}`}
              withCopy
              value={application.id}
            />
            <SpanComponent
              text={`Created at: ${application.createdAt
                ?.toString()
                .replace('T', ' ')
                .slice(0, 19)}`}
              value={
                application.createdAt
                  ?.toString()
                  .replace('T', ' ')
                  .slice(0, 19) ?? ''
              }
            />
            <SpanComponent
              text={`Updated at: ${application.createdAt
                ?.toString()
                .replace('T', ' ')
                .slice(0, 19)}`}
              value={
                application.updatedAt
                  ?.toString()
                  .replace('T', ' ')
                  .slice(0, 19) ?? ''
              }
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4>
              Time:{' '}
              {application.date?.toString().replace('T', ' ').slice(0, 16)}
            </h4>
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
            onClick={() => {
              bookingService
                .update({
                  id: application.id,
                  status: ApplicationStatus.Rejected,
                })
                .then((res) => {
                  if (res) {
                    if (res.success) {
                      return toast('Success', { type: 'success' });
                    }
                    return toast('Error!', { type: 'error' });
                  }
                })
                .finally(() => modal?.close());
            }}
          >
            Declined
          </Button>
        </div>
      </div>
    </StyledBonusPopUp>
  );
};

export default ApplicationForm;
