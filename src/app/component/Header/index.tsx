import React, { useContext, useState } from 'react';
import store from '@stores/userStore';
import Logo from '@images/logo.svg';
import Profile from '@images/Profile.svg';
import LogoutIcon from '@images/Logout.svg';
import MobMenuIconOpen from '@images/mob-menu-icon.svg';
import MobMenuIcon from '@images/mob-menu-icon-open.svg';
import { Link, useLocation } from 'react-router-dom';
import { StyledHeader } from '@styled/Header';
import AuthContext from '@/context/AuthContext';

const Header: React.FC = () => {
  const context = useContext(AuthContext);
  const location = useLocation();
  const [mobileHeaderActive, setMobileHeaderActive] = useState(false);

  const linksArray = [
    {
      route: 'booking',
      name: 'Booking',
    },
  ];
  return (
    <>
      <StyledHeader>
        <div className="logo-container">
          <img alt="logo" src={Logo} className="header-logo" />
          <Link
            to={'/'}
            onClick={() => {
              setMobileHeaderActive(false);
            }}
          >
            <h1>Shakita Hookah</h1>
          </Link>
        </div>
        <div className="header-links-container">
          {linksArray.map(({ route, name }, index) => (
            <Link
              to={`/${route}`}
              key={route + name + index}
              style={
                location.pathname.includes(route)
                  ? {
                      fontWeight: 600,
                    }
                  : undefined
              }
            >
              {name}
            </Link>
          ))}

          <Link
            to={'/account'}
            className="auth-container"
            onClick={() => {
              setMobileHeaderActive(false);
            }}
          >
            <img alt="profile" src={Profile} className="header-profile-icon" />

            <span
              style={
                location.pathname.includes('account')
                  ? {
                      fontWeight: 600,
                    }
                  : undefined
              }
            >
              {store.user.name?.split(' ')[0] ?? 'login'}
            </span>
          </Link>
          {store.user.id && store.user.name && (
            <div
              className="auth-container-logout"
              onClick={() => {
                context?.logout();
              }}
            >
              <img
                alt="profile"
                src={LogoutIcon}
                className="header-profile-icon"
              />
              <span>Logout</span>
            </div>
          )}
        </div>
        <div className="header-links-container-mobile">
          <img
            src={mobileHeaderActive ? MobMenuIcon : MobMenuIconOpen}
            alt="mob-menu-icon"
            onClick={() => setMobileHeaderActive(!mobileHeaderActive)}
          />
        </div>
        <div
          className="header-mobile"
          style={{
            right: mobileHeaderActive ? '0' : '-321px',
          }}
        >
          <img
            src={Logo}
            alt="logo-header"
            className="header-mobile-font-logo"
          />
          <div className="header-mobile-content">
            {linksArray.map(({ route, name }, index) => (
              <Link
                to={`/${route}`}
                key={route + name + index}
                onClick={() => {
                  setMobileHeaderActive(false);
                }}
                style={
                  location.pathname.includes(route)
                    ? {
                        fontWeight: 600,
                      }
                    : undefined
                }
              >
                {name}
              </Link>
            ))}
            <Link
              to={'/account'}
              className="auth-container"
              onClick={() => {
                setMobileHeaderActive(false);
              }}
            >
              <img
                alt="profile"
                src={Profile}
                className="header-profile-icon"
              />

              <span
                style={
                  location.pathname.includes('account')
                    ? {
                        fontWeight: 600,
                      }
                    : undefined
                }
              >
                {store.user.name?.split(' ')[0] ?? 'login'}
              </span>
            </Link>
            {store.user.id && store.user.name && (
              <div
                className="auth-container-logout"
                onClick={() => {
                  setMobileHeaderActive(false);
                }}
              >
                <img
                  alt="profile"
                  src={LogoutIcon}
                  className="header-profile-icon"
                />
                <span
                  onClick={() => {
                    context?.logout();
                  }}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </StyledHeader>
      <div className="header-empty" />
    </>
  );
};

export default Header;
