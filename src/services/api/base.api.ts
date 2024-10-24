import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../../utils/constants/common.constant";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function postApi<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  try {
    const response = await api.post<TResponse>(path, payload, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
  }
}

export async function patchApi<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  try {
    const response = await api.patch<TResponse>(path, payload, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
  }
}

export async function putApi<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  try {
    const response = await api.put<TResponse>(path, payload, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
  }
}

export async function deleteApi<TResponse>(path: string): Promise<TResponse> {
  try {
    const response = await api.delete<TResponse>(path);
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
  }
}

export async function getApi<TResponse>(
  path: string,
  disabledLoading = false
): Promise<TResponse> {
  try {
    if (!disabledLoading) {
    }
    const response = await api.get<TResponse>(path);
    if (response.status == 200) {
      return response.data;
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
    if (!disabledLoading) {
    }
  }
}
