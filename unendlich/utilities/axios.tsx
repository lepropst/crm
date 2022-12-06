import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Axios {
  public static standard_base_config: AxiosRequestConfig = {};

  private static instance: Axios;
  public axios: any;
  public fetcher: any;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    try {
      this.axios = axios.create({
        baseURL: "http://localhost:1337/crm/",

        headers: {
          "Content-Type": "application/json",
        },
      });
      this.fetcher = (url: string) =>
        axios
          .get(url, {
            headers: {
              Authorization:
                "Token 433d29f37af3c4b91114648086f360efcfd1ed6f61876b683eb6391de86ba1a7",
            },
          })
          .then((res) => res.data);
    } catch (e) {
      throw e;
    }
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Axios {
    if (!Axios.instance) {
      Axios.instance = new Axios();
    }

    return Axios.instance;
  }
}
export default Axios;
