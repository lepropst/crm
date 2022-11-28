import axios, { AxiosRequestConfig } from "axios";
import { Todo } from "../todos";
import { TodoList } from "../todo_list";
import { base_url, common_config, retrieveResults } from "./api_manager";

export async function getTodos(): Promise<Todo[]> {
  let todos: Todo[];
  let config: AxiosRequestConfig<any> = { ...common_config };
  try {
    const response = await axios.get(`${base_url}/todos`, config);
    console.log(response);
    todos = retrieveResults(response, Todo.fromResponse);
    return todos;
  } catch (e) {
    console.log(e);
    return [];
  }
}
export async function getTodo(id: number): Promise<Todo | null> {
  let todos: Todo[];
  let config: AxiosRequestConfig<any> = { ...common_config };
  try {
    const response = await axios.get(`${base_url}/todos/${id}`, config);
    console.log(response);
    todos = retrieveResults(response, Todo.fromResponse);
    return todos[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function updateTodos(todo: Todo): Promise<Todo[]> {
  const config: AxiosRequestConfig<any> = { ...common_config };
  const url = `${base_url}/todos/${todo.id}`;
  const formData = {
    ...todo,
  };
  axios.put(url, formData, config);
  return await getTodos();
}

export async function addTodo(list_id: number, todo: Todo): Promise<Todo[]> {
  const config: AxiosRequestConfig<any> = { ...common_config };
  const url = `${base_url}/todos`;
  const formData = {
    list: list_id,
    ...todo,
  };
  axios.post(url, formData, config);
  return await getTodos();
}

export async function deleteTodo(id: number): Promise<Todo[]> {
  const config: AxiosRequestConfig<any> = { ...common_config };
  const url = `${base_url}/todos/${id}`;
  axios.delete(url, config);
  return await getTodos();
}
export async function getTodoLists(): Promise<TodoList[]> {
  let todos: TodoList[];
  const config: AxiosRequestConfig<any> = { ...common_config };
  try {
    const response = await axios.get(`${base_url}/lists`, config);
    todos = retrieveResults(response, TodoList.fromResponse);
    return todos;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getTodoList(id: number): Promise<TodoList | null> {
  let todos: TodoList[];
  let config: AxiosRequestConfig<any> = { ...common_config };
  try {
    const response = await axios.get(`${base_url}/lists/${id}`, config);
    console.log(response);
    todos = retrieveResults(response, TodoList.fromResponse);
    return todos[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function updateTodoList(list: TodoList): Promise<TodoList[]> {
  const config: AxiosRequestConfig<any> = { ...common_config };
  const url = `${base_url}/lists/${list.id}`;
  const formData = {
    ...list,
  };
  axios.put(url, formData, config);
  return await getTodoLists();
}

export async function addTodoList(list: TodoList): Promise<TodoList[]> {
  const config: AxiosRequestConfig<any> = { ...common_config };
  const url = `${base_url}/lists`;
  const formData = {
    ...list,
  };
  axios.post(url, formData, config);
  return await getTodoLists();
}

export async function deleteTodoList(id: number): Promise<TodoList[]> {
  const config: AxiosRequestConfig<any> = { ...common_config };
  const url = `${base_url}/lists/${id}`;
  axios.delete(url, config);
  return await getTodoLists();
}
