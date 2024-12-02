import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../../utils/constants/common.constant";
import { store } from "../../store";
import { setLoading } from "../../store/slices/loadingSlice";
import { postRefreshToken } from "./auth.api";
import { toast } from "react-toastify";
import { SignInRoute } from "../../routes";
import { formatDateInRequest, traverseAndParseDates } from "../../utils/helper";

let isRefreshing = false;
let failedRequestsQueue: Array<(token: string) => void> = [];
export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const jwtToken = getAccessToken();
    config.headers["Authorization"] = `Bearer ${jwtToken}`;

    if (config.data) {
      config.data = formatDateInRequest(config.data);
    }

    return config;
  },
  (error) => {
    handleError(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = traverseAndParseDates(response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const dispatch = store.dispatch;

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

          failedRequestsQueue = [];
          isRefreshing = false;

          // Retry the original request with the new access token
          originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        }
      } catch (err) {
        // If refreshing the token fails, log the user out
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        failedRequestsQueue = [];
        isRefreshing = false;
        window.location.href = SignInRoute.path;
        return Promise.reject(err);
      }
    }
    if (error.code === "ECONNABORTED") {
      toast.error("Request took too long - please try again later.");
    } else {
      toast.error("An error occurred. Please try again.");
    }

    dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

const handleError = async (e: any) => {
  const errorMessage = e.response
    ? e.response.data?.UserMessage || e.message
    : e.message;

  toast.error(errorMessage);
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
