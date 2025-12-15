// apiInterceptors.ts
import  api  from "./axios";
import type { AppDispatch } from "../store/store";
import { setError } from "../store/errorSlice";

export const setupInterceptors = (dispatch: AppDispatch) => {
  api.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
        dispatch(setError("Сервер недоступний"));
        return Promise.reject(error);
      }

      switch (error.response.status) {
        case 401:
          dispatch(setError("Сесія закінчилась. Увійдіть знову."));
          break;
        case 403:
          dispatch(setError("Недостатньо прав доступу"));
          break;
        case 500:
          dispatch(setError("Помилка сервера"));
          break;
        default:
          dispatch(setError("Невідома помилка"));
      }

      return Promise.reject(error);
    }
  );
};
