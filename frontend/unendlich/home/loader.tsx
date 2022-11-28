import axios from "axios";
import Task from "../todos/model";

interface HomeLoaderData {
  date: string;
}
export async function loader(): Promise<HomeLoaderData> {
  // fetch list of local todos
  console.log("home loaader");
  // fetch list of notes
  // fetch list of accounts
  // fetch tasks relevant by priority
  return {
    date: new Date().toISOString(),
  };
}
export default loader;
