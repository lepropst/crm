import { IronSessionData as IronSessionDataOne } from 'iron-session';
export interface IronSessionData extends IronSessionDataOne {
  user?: {
    username: string;
    password: string;
    token: string;
    id: number;
  };
}
declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      username: string;
      password: string;
      token: string;
      id: number;
    };
  }
}
