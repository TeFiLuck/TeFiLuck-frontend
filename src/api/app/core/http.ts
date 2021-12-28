import { NetworkKey } from '@/constants/networks';
import axios, { AxiosInstance } from 'axios';
import { APP_REST_API_ADDRESSES_MAP } from './constants';

type HttpClientFactoryParams = {
  networkKey: NetworkKey;
};

export function createHttp({ networkKey }: HttpClientFactoryParams): AxiosInstance {
  return axios.create({
    baseURL: APP_REST_API_ADDRESSES_MAP[networkKey],
  });
}
