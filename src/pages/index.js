import React from "react";
import { Link } from "gatsby";

const IndexPage = () => {
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
      <div style={{ fontSize: "64px" }}>
        <span role="img" aria-label="Penguin">
          🐧
        </span>
      </div>
      <div style={{ position: "relative", top: "-8px" }}>TheMightyPenguin</div>
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/blog">/blog</Link>
      </div>
    </div>
  );
};

export default IndexPage;
