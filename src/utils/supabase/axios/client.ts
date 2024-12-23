import axiosBase from "axios";

export const axiosClient = axiosBase.create({ baseURL: "/api" });
