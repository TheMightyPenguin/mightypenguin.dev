import React, { useState, useEffect } from "react";
import Head from "next/head";
import countdown from 'countdown';
import { addSeconds } from 'date-fns/fp'

const generateEmojiFavicon = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

const targetDate = new Date(2020, 11, 24, 0, 0);
// const formatDate = format("hh:mm:ss");

const Page: React.FC = () => {
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
              {dateDiff}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
