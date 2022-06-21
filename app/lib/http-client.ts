import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://swapi.dev/api/";

interface IHttpClient {
  getClient(): AxiosInstance;
  post(url: string, data: any): Promise<any>;
  get(url: string, params: any): Promise<any>;
}

/**
 * Declare the variable which will hold our Http Client instance,
 * but do not initialise it. Initialising it here would make mocking
 * harder as we would have to mock the `Axios` constructor.
 *
 * By lazily initialising it, we can rely on `jest.spyOn` to write
 * cleaner tests.
 */
let HttpClientInstance: AxiosInstance | undefined;

export const HttpClient: IHttpClient = {
  getClient: () => {
    if (!HttpClientInstance) {
      HttpClientInstance = axios.create({
        baseURL: BASE_URL,
      });
    }

    return HttpClientInstance;
  },
  post: (url, data) => {
    return HttpClient.getClient().post(url, data);
  },
  get: (url, params) => {
    return HttpClient.getClient().get(url, { params });
  },
};
