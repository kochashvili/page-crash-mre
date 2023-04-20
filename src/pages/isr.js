import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import crypto from "crypto";

export default function Home({ UUID }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js ISR Page!</a>
        </h1>

        <p className={styles.description}>
          Static prop UUID: <code className={styles.code}>{UUID}</code>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export function getStaticProps() {
  const UUID = crypto.randomUUID();

  console.log("revalidating", UUID);

  return { props: { UUID }, revalidate: 30 };
}
