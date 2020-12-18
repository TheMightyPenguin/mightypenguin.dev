import fs from 'fs'
import path from 'path'
import Head from "next/head";
import Link from "next/link";

const generateEmojiFavicon = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

const Igloo = () => {
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
        <link rel="icon" href={generateEmojiFavicon("❄ igloo")} />
      </Head>

      <div
        style={{
          marginTop: "1.5rem",
          fontFamily: "monospace",
          fontSize: "16px",
          display: 'flex',
          gap: '16px',
        }}
      >
        {[].map(({ href, label }) => (
          <Link key={href} href={href}>
            <a>
              {label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export function getServerSideProps() {
  const postsDirectory = path.join(process.cwd())
  const filenames = fs.readdirSync(postsDirectory)

  const links = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return {
      filename,
      content: fileContents,
    }
  })

  return {
    props: {
      links
    }
  };
}

export default Igloo;

