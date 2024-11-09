import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../../utils/constants/common.constant";
import { store } from "../../store";
import { setLoading } from "../../store/slices/loadingSlice";
import { snackbarRef } from "../../components/commons/SnackbarContent";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("accessToken");
    console.log(jwtToken);
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
    return config;
  },
  (error) => {
    handleError(error);
  }
);

const handleError = (msg: string) => {
  if (snackbarRef) {
    snackbarRef(msg, "error");
  }
};

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
  } catch (e: any) {
    handleError(e.response ? e.response.data : e.message);
    throw new Error(e);
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
  } catch (e: any) {
    handleError(e.response ? e.response.data : e.message);
    throw new Error(e);
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
  } catch (e: any) {
    handleError(e.response ? e.response.data : e.message);
    throw new Error(e);
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
  } catch (e: any) {
    handleError(e.response ? e.response.data : e.message);
    throw new Error(e);
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
  } catch (e: any) {
    handleError(e.response ? e.response.data : e.message);
    throw new Error(e);
  } finally {
    if (!disabledLoading) {
      dispatch(setLoading(false));
    }
  }
}
