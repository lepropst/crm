import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  console.log(process.env.COOKIE_PASSWORD);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="Home" content="" />
      </Head>
      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
