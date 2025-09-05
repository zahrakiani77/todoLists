import type { AxiosResponse } from "axios";
import { axiosInstance } from "./utils"


class tasksAPI<taskGenericType> {
  constructor(private endpoint: string) {}

  getAll(controller?: AbortController) {
    return axiosInstance.get<taskGenericType[]>(this.endpoint, {
      signal: controller?.signal,
    });
  }
  create<payloaedGenericType>(payload: payloaedGenericType) {
    return axiosInstance.post<
      payloaedGenericType,
      AxiosResponse<taskGenericType>
    >(this.endpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  patch<payloaedGenericType>(
    id: string | number,
    payload: payloaedGenericType,
  ) {
    return axiosInstance.patch<
      payloaedGenericType,
      AxiosResponse<taskGenericType>
    >(`${this.endpoint}/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  delete(id: string | number) {
    return axiosInstance.delete(`${this.endpoint}/${id}`);
  }
}

export default tasksAPI;