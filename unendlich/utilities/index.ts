export * from "./constants";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      username: string;
      password: string;
      token: string;
    };
  }
}
