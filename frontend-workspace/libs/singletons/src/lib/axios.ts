import axios, { AxiosRequestConfig } from 'axios';

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
    this.axios = axios.create({
      baseURL: 'http://localhost:1337/crm/',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.fetcher = (url: string) => {
      console.log('fetcheeteer stuff');
      return this.axios
        .get(url, {
          headers: {
            'cache-control': 'no-store, max-age=0',
          },
        })
        .then((res: any) => {
          console.log(res);
          return res.data;
        })
        .catch((e: any) => {
          console.log(e);
          return {};
        });
    };
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
