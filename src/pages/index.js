import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

const links = ["/blog"];

const IndexPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        fontFamily:
          '"-apple-system","BlinkMacSystemFont","San Francisco","Helvetica Neue","Helvetica","Ubuntu","Roboto","Noto","Segoe UI","Arial",sans-serif',
      }}
    >
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap&text=TheMightyPenguin"
          rel="stylesheet"
        />
      </Helmet>
      <div style={{ fontSize: "64px" }}>
        <span role="img" aria-label="Penguin">
          🐧
        </span>
      </div>
      <div
        style={{
          position: "relative",
          top: "-4px",
          fontSize: "20px",
          fontFamily: "'Inconsolata', monospace",
        }}
      >
        TheMightyPenguin
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        {links.map((link) => (
          <Link key={link} to={link}>
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
