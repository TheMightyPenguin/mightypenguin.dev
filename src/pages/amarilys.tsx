import countdown from 'countdown';
import { addSeconds, compareDesc } from 'date-fns/fp';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';

import useToggle from '../hooks/useToggle';

const generateEmojiFavicon = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

const targetDate = new Date(2020, 11, 23, 0, 0);

const hasDatePassed = (date1: Date, date2: Date) => {
  return compareDesc(date1, date2) >= 0;
};

function useTimer(initial: Date, target: Date) {
  const [currentDate, setToday] = useState(initial);
  const dateDiff = countdown(currentDate, target).toString();

  useEffect(() => {
    const timeoutId = window.setInterval(() => {
      setToday((currentDate) => addSeconds(1, currentDate));
    }, 1000);
    return () => {
      window.clearInterval(timeoutId);
    };
  }, []);

  console.log({ currentDate, target });

  return {
    timeLeftMessage: dateDiff,
    hasPassed: hasDatePassed(currentDate, target),
  };
}

const ScheduleItem = ({ label, time, title, description, date }: any) => {
  const { timeLeftMessage, hasPassed } = useTimer(new Date(), date);

  if (!hasPassed) {
    return (
      <div style={{ textAlign: 'center', fontSize: '18px', color: '#495D63' }}>
        {timeLeftMessage}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div
        style={{ textAlign: 'center', color: '#D7BCC8', fontWeight: 'bold' }}
      >
        {label} {time} 🕐
      </div>
      <div
        style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}
      >
        {title}
      </div>
      {description ? (
        <div
          style={{ textAlign: 'center', color: '#495D63', fontSize: '14px' }}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
};

const Separator = () => {
  return (
    <div
      style={{ backgroundColor: '#FAC8CD', height: '2px', borderRadius: '4px' }}
    />
  );
};

const Page: React.FC = () => {
  const { timeLeftMessage, hasPassed } = useTimer(new Date(), targetDate);
  const [showTrivia, toggleTrivia] = useToggle();

  return (
    <div>
      <Head>
        <link rel="icon" href={generateEmojiFavicon('🦄')} />
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '16px',
          }}
        >
          {hasPassed ? (
            <p
              style={{
                fontSize: '42px',
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              Feliz Cumpleaños Boo!! 🎉🍰🦄
            </p>
          ) : (
            <p
              style={{
                fontSize: '42px',
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              {timeLeftMessage}
            </p>
          )}
          <div
            style={{
              border: '4px solid black',
              padding: '12px',
              paddingTop: '24px',
              paddingBottom: '24px',
              width: '320px',
              margin: '0 auto',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <ScheduleItem
                date={new Date(2020, 11, 22, 15, 30)}
                label="⛰"
                time="8:00am"
                title="Aventuras en la barranca de huentitan"
                description="Desayuno: Panini de carnes frias"
              />
              <Separator />
              <ScheduleItem
                date={new Date(2020, 11, 22, 19)}
                label="🧖🏻‍♀️"
                time="12:00pm"
                title="Relax time en kinal spa"
              />
              <Separator />
              <ScheduleItem
                date={new Date(2020, 11, 22, 21)}
                label="🇰🇷"
                time="4:00pm"
                title="Maraton de Crash landing on you"
                description="Snack: Postre de la postreria"
              />
              <Separator />
              <ScheduleItem
                date={new Date(2020, 11, 23, 0, 0)}
                label="🍝"
                time="8:00pm"
                title="Cena en Napoles"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DayOneTrivia = React.memo(() => {
  const inputValue = useRef('');
  const [showMessage, toggleMessage] = useToggle();
  const [showError, toggleError] = useToggle();

  const onSubmit: React.ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault();
    if (inputValue.current.toLowerCase() === 'lara & luca') {
      toggleMessage(true);
      toggleError(false);
    } else {
      toggleError(true);
      toggleMessage(false);
    }
  };

  return (
    <div>
      <p>Como se llama el restaurante que tiene tu croissant favorito? 🥐</p>
      {showMessage ? (
        <p>Revisa bajo tu mousepad!</p>
      ) : (
        <form onSubmit={onSubmit}>
          {showError ? <p>Intenta de nuevo :(</p> : null}
          <input
            onChange={(e) => {
              inputValue.current = e.target.value;
            }}
          />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
});

export default Page;
