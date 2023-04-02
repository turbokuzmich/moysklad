import axios from "axios";
import type { AxiosInstance } from "axios";
import type { TokenResponse } from "./types";

type ApiResolver = (api: AxiosInstance) => void;

let isReady = false;

let api: AxiosInstance;
let requests: ApiResolver[] = [];

export default async function getApi(): Promise<AxiosInstance> {
  if (isReady) {
    return Promise.resolve(api);
  }

  if (requests.length > 0) {
    return new Promise((resolve: ApiResolver) => {
      requests.push(resolve);
    });
  }

  const unauthorizedApi = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "content-type": "application/json",
    },
  });

  const credentials = Buffer.from(
    `${process.env.API_USER}:${process.env.API_PASS}`
  ).toString("base64");

  const {
    data: { access_token },
  } = await unauthorizedApi.post<TokenResponse>("/security/token", undefined, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  unauthorizedApi.defaults.headers.common.Authorization = `Bearer ${access_token}`;

  api = unauthorizedApi;

  requests.forEach((resolver) => resolver(api));
  requests = [];

  return api;
}
