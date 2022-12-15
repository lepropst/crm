import axios from 'axios';
import React from 'react';

import { useRouter, withRouter } from 'next/router';
import { useState } from 'react';

export const Page = () => {
  const [state, setState] = useState({ password: '', username: '' });
  const router = useRouter();
  const handleSubmit = async (el: any) => {
    el.preventDefault();
    const password = state.password;
    const username = state.username;
    if (password == '' || username == '') {
      alert('Invalid username/password');
    }
    try {
      const resp = await axios.post(
        'http://localhost:3000/api/login/',
        { password: password, username: username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: { password: password, username: username },
        }
      );
      router.push('/');
      return;
    } catch (e: any) {
      console.log(e);
      alert('Bad password or username');
      return;
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-backgroundprimary">
      <form
        className="flex flex-col items-center justify-center space-x-2 m-3 space-y-3 border border-slate-500"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <input
            onChange={(e) => {
              e.preventDefault();
              setState({ ...state, username: e.target.value });
            }}
            type="text"
            name="username"
            placeholder="username"
            className="m-1 p-2"
            value={state.username}
          />
          <input
            onChange={(e) => {
              e.preventDefault();
              setState({ username: state.username, password: e.target.value });
            }}
            name="passsword"
            placeholder="passsword"
            type="password"
            className="m-1 p-2"
            value={state.password}
          />
        </div>
        <button
          type="submit"
          className="rounded border border-slate-500 w-24"
          onSubmit={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default withRouter(Page);
