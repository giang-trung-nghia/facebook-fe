import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../../utils/constants/common.constant";
import { store } from "../../store";
import { setLoading } from "../../store/slices/loadingSlice";

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
  const dispatch = store.dispatch;
  try {
    dispatch(setLoading(true));
    const response = await api.post<TResponse>(path, payload, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
    dispatch(setLoading(false));
  }
}

export async function patchApi<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const dispatch = store.dispatch;
  try {
    dispatch(setLoading(true));
    const response = await api.patch<TResponse>(path, payload, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
    dispatch(setLoading(false));
  }
}

export async function putApi<TRequest, TResponse>(
  path: string,
  payload: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const dispatch = store.dispatch;
  try {
    dispatch(setLoading(true));
    const response = await api.put<TResponse>(path, payload, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
    dispatch(setLoading(false));
  }
}

export async function deleteApi<TResponse>(path: string): Promise<TResponse> {
  const dispatch = store.dispatch;
  try {
    dispatch(setLoading(true));
    const response = await api.delete<TResponse>(path);
    return response.data;
  } catch (e) {
    console.error(e);
    return e as TResponse;
  } finally {
    dispatch(setLoading(false));
  }
}

export async function getApi<TResponse>(
  path: string,
  disabledLoading = false
): Promise<TResponse> {
  const dispatch = store.dispatch;
  try {
    if (!disabledLoading) {
      dispatch(setLoading(true));
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
      dispatch(setLoading(false));
    }
  }
}
