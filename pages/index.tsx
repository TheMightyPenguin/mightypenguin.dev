import Head from "next/head";
import Link from "next/link";

const generateEmojiFavicon = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

const links = [];

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Head>
        <link rel="icon" href={generateEmojiFavicon("🐧")} />
      </Head>

      <div style={{ fontSize: "64px" }}>
        <span role="img" aria-label="Penguin">
          🐧
        </span>
      </div>

      <div
        style={{
          position: "relative",
          top: "-8px",
          fontSize: "20px",
          fontFamily: "monospace",
          letterSpacing: "1px",
        }}
      >
        TheMightyPenguin
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          fontFamily: "monospace",
          fontSize: "16px",
        }}
      >
        {links.map((link) => (
          <Link key={link} href={link}>
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
