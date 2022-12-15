import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';
import { ListRenderer } from '../components/list-renderer/list-renderer';
import { TodoList } from '../models';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';

import { withSessionSsr } from '../plugins/withSession';
import Axios from '../utilities/axios';
import { useEffect, useState } from 'react';
import { Todo } from '../models';
import { IronSessionData } from 'iron-session';

interface Props {
  user: any;
}

const Page: NextPage<Props> = ({ user }: Props) => {
  const [currentData, setCurrentData] = useState<TodoList>(
    TodoList.fromTodoList({
      label: '',
      todos: [],
      owner: user.id,
    })
  );
  const fetcher = async (url: string) => {
    const res = await Axios.getInstance().axios.get(url, {
      headers: {
        Authorization: `Token ${user.token}`,
        'Content-Type': 'Application/json',
      },
    });

    if (res.status !== 200) {
      console.log('error occured');
      throw new Error(res.data);
    }
    return res.data.map((e: TodoList) => TodoList.fromTodoList(e));
  };

  const { mutate } = useSWRConfig();
  const { data, error } = useSWR('/unendlich/lists/', fetcher);
  const [lists, setLists] = useState(data);
  const api = {
    saveTodo: async (todo: Todo): Promise<void> => {
      console.log('saving todo');
      try {
        await axios.put('/api/save', {
          type: 'todos',
          ...todo,
        });
      } catch (e) {
        console.log(e);
      }
    },
    addTodo: async (todo: Todo): Promise<void> => {
      console.log('data tryiing to be added ', todo);
      try {
        await axios.post('/api/add', {
          type: 'todos',
          ...todo,
        });
        mutate('/unendlich/lists/');
      } catch (e) {
        console.log(e);
        alert('unable to delete todo list');
      }
    },
    deleteTodo: async (id: number) => {
      try {
        await axios.post('/api/delete/', { id: id, type: 'todos' });
        mutate('/unendlich/lists/');
      } catch (e) {
        console.log(e);
        alert('unable to delete todo list');
      }
    },
    deleteList: async (id: number) => {
      try {
        console.log(user);
        await axios.post('/api/delete', { id: id, type: 'lists' });
        mutate('/unendlich/lists/');
      } catch (e) {
        console.log(e);
        alert('unable to delete todo list');
      }
    },
    addList: async (list: TodoList) => {
      try {
        await axios.post('/api/add', { type: 'lists', ...list });
        mutate('/unendlich/lists/');
      } catch (e) {
        console.log(e);
        alert('unable to delete todo list');
      }
    },
  };

  return (
    <div className="flex flex-col spacing-x-3 bg-backgroundprimary h-screen w-screen">
      <form
        className="h-16 w-screen flex space-x-2 justify-center items-center bg-white border border-primarydark"
        onSubmit={(e) => {
          e.preventDefault();

          const todo: TodoList = {
            label: currentData['label'],
            todos: [],
            owner: user.id,
          };

          api.addList(todo);
          setCurrentData({ label: '', todos: [], owner: user.id });
        }}
      >
        <input
          type="text"
          className="rounded"
          name="label"
          value={currentData.label}
          onChange={(e) => {
            e.preventDefault();
            setCurrentData({
              ...currentData,
              owner: user.id,
              label: e.target.value,
            });
          }}
        ></input>
        <button type="submit">add list</button>
      </form>
      <div className="flex overflow-x-auto">
        {data &&
          data.map((e: TodoList, i: number) => (
            <ListRenderer api={api} key={`${e.label}-${i}`} list={e} />
          ))}
      </div>
    </div>
  );
};
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({
    req,
  }: GetServerSidePropsContext<any, any> & {
    req: any;
  }) {
    const user = req.session.user;
    return {
      props: {
        user: user,
      },
    };
  }
);

export default Page;
