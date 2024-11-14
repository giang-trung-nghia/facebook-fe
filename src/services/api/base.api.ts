import axios, { AxiosError, AxiosRequestConfig, HttpStatusCode } from "axios";
import { API_BASE_URL } from "../../utils/constants/common.constant";
import { store } from "../../store";
import { setLoading } from "../../store/slices/loadingSlice";
import { snackbarRef } from "../../components/commons/SnackbarContent";
import { postRefreshToken } from "./auth.api";

let isRefreshing = false;
let failedRequestsQueue: Array<(token: string) => void> = [];
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const jwtToken = getAccessToken();
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
    return config;
  },
  (error) => {
    handleError(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // If the error is 401 and it's not a retry, try refreshing the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequestsQueue.push((token: string) => {
            originalRequest.headers!.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest)); // Retry the original request
          });
        });
      }

      isRefreshing = true;

      try {
        // Call refresh token endpoint
        const refreshToken = getRefreshToken();
        const accessToken = getAccessToken();
        if (accessToken && refreshToken) {
          const response = await postRefreshToken({
            accessToken,
            refreshToken,
          });

          const newAccessToken = response.accessToken;
          setAccessToken(newAccessToken);

          // Process the queued requests with the new token
          failedRequestsQueue.forEach((callback) => callback(newAccessToken));
          console.log(failedRequestsQueue);

          failedRequestsQueue = [];
          isRefreshing = false;

          // Retry the original request with the new access token
          originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;
          console.log(originalRequest);

          return api(originalRequest);
        }
      } catch (err) {
        // If refreshing the token fails, log the user out
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        failedRequestsQueue = [];
        isRefreshing = false;
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

const handleError = async (e: any) => {
  if (snackbarRef) {
    snackbarRef(
      e.response ? (e.UserMessage ? e.response.data : e.message) : e.message,
      "error"
    );
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
    handleError(e);
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
    handleError(e);
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
    handleError(e);
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
    handleError(e);
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
    handleError(e);
    throw new Error(e);
  } finally {
    if (!disabledLoading) {
      dispatch(setLoading(false));
    }
  }
}
