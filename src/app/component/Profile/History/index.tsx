import React, { useContext } from 'react';
import { ApplicationStatus } from '../../../../types';
import { StyledPill } from '@styled/Pill';
import { StyledHistory } from '@styled/History';
import { Application } from '@/generated/types';
import ModalContext from '@/context/ModalContext';
import ApplicationForm from '@component/Application';

const UserHistory: React.FC<{ applications: Application[] }> = ({
  applications,
}) => {
  const modal = useContext(ModalContext);
  return (
    <StyledHistory>
      <h3>History</h3>
      <div className="history">
        {applications && applications.length ? (
          applications.map((application) => {
            let color = 'red';
            switch (application.status) {
              case ApplicationStatus.Approved:
                color = 'rgba(52, 182, 88, 0.9)';
                break;
              case ApplicationStatus.Pending:
                color = 'rgba(255, 199, 0, 0.9)';
                break;
              case ApplicationStatus.Rejected:
                color = 'rgba(255, 0, 0, 0.9)';
                break;
            }
            return (
              <StyledPill
                key={'history' + application.id}
                onClick={() => {
                  modal?.open(
                    <ApplicationForm application={application} />,
                    'center',
                  );
                }}
              >
                <div className="content">
                  <h4>
                    {application.date
                      ?.toString()
                      .replace('T', ' ')
                      .slice(0, 19)}
                  </h4>
                  <span>{application.place}</span>
                  <span
                    style={{
                      textAlign: 'end',
                      color: color,
                      fontSize: '12px',
                      fontWeight: '700',
                    }}
                  >
                    {application.status}
                  </span>
                </div>
              </StyledPill>
            );
          })
        ) : (
          <span>Empty list!!!</span>
        )}
      </div>
    </StyledHistory>
  );
};

export default UserHistory;
