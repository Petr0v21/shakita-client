import React from 'react';
import { ApplicationStatus } from '../../../../types';
import { StyledPill } from '@styled/Pill';
import { StyledHistory } from '@styled/History';
import { Application } from '@/generated/types';

const UserHistory: React.FC<{ applications: Application[] }> = ({
  applications,
}) => {
  return (
    <StyledHistory>
      <h3>History</h3>
      <div className="history">
        {applications && applications.length ? (
          applications.slice(0, 5).map((application) => {
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
              <StyledPill key={'history' + application.id}>
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
