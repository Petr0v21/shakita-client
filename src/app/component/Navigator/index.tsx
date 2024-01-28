import React, { useState } from 'react';
import NavFon from '@images/nav_fon.png';
import Calaud from '@images/calaud.png';
import NavMob1 from '@images/nav-mobile-1.png';
import NavMob2 from '@images/nav-mobile-2.png';
import NavMob3 from '@images/nav-mobile-3.png';
import {
  CalaudNavigatorStyled,
  MobileNavigatorStyled,
} from '@styled/Navigator';
import { useNavigate } from 'react-router';

const Navigator: React.FC<{ type: 'desktop' | 'mobile' }> = ({ type }) => {
  const [hoveredCoal, setHoveredCoal] = useState<
    'coal-1' | 'coal-2' | 'coal-3' | undefined
  >();
  const navigate = useNavigate();
  if (type === 'desktop') {
    return (
      <CalaudNavigatorStyled>
        <img alt="nav_fon" src={NavFon} className="nav-fon" />
        <div className="calaud">
          <img alt="calaud" src={Calaud} className="calaud-main" />
          <div
            className="coal-1"
            style={
              hoveredCoal === 'coal-1'
                ? {
                    opacity: 0,
                  }
                : undefined
            }
          />
          <div
            className="coal-2"
            style={
              hoveredCoal === 'coal-2'
                ? {
                    opacity: 0,
                  }
                : undefined
            }
          />
          <div
            className="coal-3"
            style={
              hoveredCoal === 'coal-3'
                ? {
                    opacity: 0,
                  }
                : undefined
            }
          />
        </div>
        <a
          className="link-1"
          onMouseEnter={() => setHoveredCoal('coal-1')}
          onMouseLeave={() => setHoveredCoal(undefined)}
        >
          <div className="link-content">
            <span>НАША СИСТЕМА ЛОЯЛЬНОСТИ</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="58"
              viewBox="0 0 318 58"
              fill="none"
            >
              <path d="M317.332 57L272 1H0" stroke="white" />
            </svg>
          </div>
        </a>
        <a
          className="link-2"
          onMouseEnter={() => setHoveredCoal('coal-2')}
          onMouseLeave={() => setHoveredCoal(undefined)}
        >
          <div className="link-content">
            <span>Полное меню со всеми услугами</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="58"
              viewBox="0 0 319 58"
              fill="none"
            >
              <path d="M1 57L46.332 1H318.332" stroke="white" />
            </svg>
          </div>
        </a>
        <a
          className="link-3"
          onMouseEnter={() => setHoveredCoal('coal-3')}
          onMouseLeave={() => setHoveredCoal(undefined)}
        >
          <div className="link-content">
            <span>Новости и Акции</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="58"
              viewBox="0 0 325 66"
              fill="none"
            >
              <path d="M325 65H30L1 1" stroke="white" />
            </svg>
          </div>
        </a>
      </CalaudNavigatorStyled>
    );
  }

  if (type === 'mobile') {
    return (
      <MobileNavigatorStyled>
        <a className="nav-mobile-link-1">
          <div className="nav-mobile-link-1-content">
            <img
              alt="nav-image"
              src={NavMob1}
              onClick={() => navigate('link-1')}
              style={
                hoveredCoal === 'coal-1'
                  ? {
                      opacity: 0.5,
                    }
                  : undefined
              }
            />
            <span
              onClick={() => navigate('link-1')}
              onMouseEnter={() => setHoveredCoal('coal-1')}
              onMouseLeave={() => setHoveredCoal(undefined)}
            >
              НАША СИСТЕМА ЛОЯЛЬНОСТИ
            </span>
          </div>
        </a>
        <a className="nav-mobile-link-2">
          <div className="nav-mobile-link-2-content">
            <img
              alt="nav-image"
              src={NavMob2}
              onClick={() => navigate('link-2')}
              style={
                hoveredCoal === 'coal-2'
                  ? {
                      opacity: 0.5,
                    }
                  : undefined
              }
            />
            <span
              onClick={() => navigate('link-2')}
              onMouseEnter={() => setHoveredCoal('coal-2')}
              onMouseLeave={() => setHoveredCoal(undefined)}
            >
              Полное меню со всеми услугами
            </span>
          </div>
        </a>
        <a className="nav-mobile-link-3">
          <div className="nav-mobile-link-3-content">
            <img
              alt="nav-image"
              src={NavMob3}
              onClick={() => navigate('link-3')}
              style={
                hoveredCoal === 'coal-3'
                  ? {
                      opacity: 0.5,
                    }
                  : undefined
              }
            />
            <span
              onClick={() => navigate('link-3')}
              onMouseEnter={() => setHoveredCoal('coal-3')}
              onMouseLeave={() => setHoveredCoal(undefined)}
            >
              Новости и Акции
            </span>
          </div>
        </a>
      </MobileNavigatorStyled>
    );
  }
};

export default Navigator;
