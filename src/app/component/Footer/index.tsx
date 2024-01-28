import React from 'react';
import Logo from '@images/logo.svg';
import CallIcon from '@images/Call.svg';
import TelegramIcon from '@images/telegram.svg';
import InstagramIcon from '@images/instagram.svg';
import FacebookIcon from '@images/facebook.svg';
import { Link, useLocation } from 'react-router-dom';
import { StyledFooter } from '@styled/Footer';

const Footer: React.FC = () => {
  const location = useLocation();
  const linksArray = [
    {
      route: 'booking',
      name: 'Booking',
    },
    {
      route: 'account',
      name: 'Account',
    },
  ];

  const contactArray = [
    {
      url: '',
      name: 'telegram',
      image: TelegramIcon,
    },
    {
      url: '',
      name: 'instagram',
      image: InstagramIcon,
    },
    {
      url: '',
      name: 'facebook',
      image: FacebookIcon,
    },
  ];
  return (
    <>
      <StyledFooter>
        <div className="logo-container">
          <img alt="logo" src={Logo} className="footer-logo" />
          <Link to={'/'}>
            <h1>Shakita Hookah</h1>
          </Link>
        </div>
        <div className="footer-links-container">
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
        </div>
        <div className="footer-contacts">
          <div className="row">
            {contactArray.map(({ url, name, image }, index) => (
              <a key={url + name + index} href={url} target="_blank">
                <img src={image} alt={name} />
              </a>
            ))}
          </div>
          <a href="tel:+380993276162" className="row">
            <img
              src={CallIcon}
              alt="phone"
              style={{
                width: 24,
              }}
            />
            <span
              style={{
                letterSpacing: '1.5px',
              }}
            >
              +380993276162
            </span>
          </a>
          {/* <a
            href="https://maps.app.goo.gl/DEgPYKUWMXwGv6PU9"
            className="row"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1em 0',
            }}
          >
            Вулиця Незалежності 10, Тульчин
          </a> */}
        </div>
      </StyledFooter>
    </>
  );
};

export default Footer;
