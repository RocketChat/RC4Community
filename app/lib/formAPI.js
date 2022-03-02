import { fetchAPI } from "./api";

export const getFormData = async () => {
  const res = await fetchAPI("/forms");

  return res;
};
