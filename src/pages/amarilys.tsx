import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import countdown from 'countdown';
import { addSeconds } from 'date-fns/fp'

import useToggle from '../hooks/useToggle';

const generateEmojiFavicon = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

const targetDate = new Date(2020, 11, 24, 0, 0);

function useTimer() {
  const [today, setToday] = useState(() => new Date());
  const dateDiff = countdown(today, targetDate).toString();

  useEffect(() => {
    const timeoutId = window.setInterval(() => {
      setToday(currentDate => addSeconds(1, currentDate));
    }, 1000);
    return () => {
      window.clearInterval(timeoutId);
    }
  }, []);

  return { timeLeftMessage: dateDiff }
}



const Page: React.FC = () => {
  const { timeLeftMessage } = useTimer();
  const [showTrivia, toggleTrivia] = useToggle();

  return (
    <div>
      <Head>
        <link rel="icon" href={generateEmojiFavicon("🦄")} />
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "16px",
          }}
        >
          <div
            style={{
              border: "4px solid black",
              padding: "16px",
              minWidth: "300px",
            }}
          >
            <p style={{ fontSize: "42px", textAlign: 'center' }}>
              {timeLeftMessage}
            </p>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {showTrivia ? (
                <DayOneTrivia />
              ) : (
                <p style={{ fontSize: "30px", textAlign: 'center' }} onClick={() => toggleTrivia(undefined)}>✨</p>
              )}
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
      <p>
        Como se llama el restaurante que tiene tu croissant favorito? 🥐
      </p>
      {showMessage ? (
        <p>Revisa bajo tu mousepad!</p>
      ) : (
        <form onSubmit={onSubmit}>
          {showError ? <p>Intenta de nuevo :(</p> : null}
          <input onChange={(e) => { inputValue.current = e.target.value; }} />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
});

export default Page;
