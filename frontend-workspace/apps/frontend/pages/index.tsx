import { NextPage, NextPageContext } from 'next';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { credentials, getCredentials } from '../utilities/auth';
import { withSessionSsr } from '../plugins/withSession';

export const Page: NextPage<any, any> = (
  props: credentials & { protected: boolean }
) => {
  console.log(props);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="Home" content="" />
      </Head>
      <main className={styles.main}></main>
      <div>
        <h1>login credentials</h1>

        <div>{JSON.stringify(props)}</div>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    return {
      props: {
        user: req.session.user || 'Unauthenticated',
      },
    };
  }
);

export default Page;
