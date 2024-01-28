import React from 'react';
import Navigator from '@component/Navigator';
import { StyledMainPage } from '@styled/Main';
import Kozel from '@images/kozel.png';
import SmokeLeft from '@images/left-smoke.png';
import SmokeRight from '@images/right-smoke.png';
import { Link } from 'react-router-dom';
import OwnerIcon from '@images/owner.png';

const MainPage: React.FC = () => {
  return (
    <StyledMainPage>
      <div className="preview">
        <div className="preview-content">
          <div className="preview-row-first">
            <div className="preview-row-content">
              <h2 className="preview-title">
                Shakita Hookah - место атмосферы
              </h2>
              <span className="preview-title-subtext">
                Высокий уровень кальянной культуры и отличное качество сервиса-
                два главных компонента внутри нашей сети.
              </span>
            </div>
          </div>
          <div className="preview-row-second">
            <div
              className="preview-row-content"
              style={{ width: '360px', fontSize: '14px' }}
            >
              <span className="preview-title-quote">
                “Опустоши свой разум. <br />
                Стань аморфным, бесформенным как вода. Когда воду наливают в
                чашку, она становится чашкой. Когда воду наливают в чайник, она
                становится чайником. Когда воду наливают в бутылку, она
                становится бутылкой.
                <br />
                Вода может течь, а может крушить.
                <br />
                Будь водой, друг мой”
                <p>
                  <strong>Брюс Ли</strong> (Главный ценитель кальянов в Азии)
                </p>
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link to={'/booking'} className="preview-button-link">
              Забей стол!
            </Link>
          </div>
        </div>

        <img src={Kozel} alt="main-fon" className="preview-main-image" />
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
      </div>
      <div className="about-us">
        <h2>Про нас</h2>
        <div className="about-us-content">
          <div className="about-us-content-item">
            <h3>ИСТОРИЯ СОЗДАНИЯ</h3>
            <span className="about-us-content-item">
              При создании фирменного логотипа участвовало множество переменных.
              Лицо на логотипе - лицо ацтекского бога Тлалока, который уносил
              священный табачный дым на небо, чтобы создавать облака и небосвод.
              У ацтеков и индейцев табак и его дым священен, является
              неотъемлемой частю и единственным способом общения с ними. В
              современном мире отношения к табачному листу куда проще, но смысл
              неизменен. Можно заметить, что разговоры, общение, знакомства и
              времяпрепровождение в компании, ощутимо приятнее за современном
              аналогом "трубки мира". Кальян - сближает нас с богами и друг с
              другом. Непреложная истина, которая продолжит существование на
              века вперед.
            </span>
          </div>
          <div className="about-us-content-item">
            <div className="about-us-content-item-owner-container">
              <img src={OwnerIcon} alt="avatar" />
              <div>
                <h4>
                  <strong>Айк Лазарян</strong>
                </h4>
                <span>
                  Цель этого мира — показать всю свою глубину и необъятность,
                  приобщить интересующихся к культуре и научиться наслаждаться
                  уже не кальяном, а искусством.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav">
        <Navigator type="desktop" />
      </div>
      <div className="nav-mobile">
        <Navigator type="mobile" />
      </div>
    </StyledMainPage>
  );
};

export default MainPage;
