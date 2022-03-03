import { fetchAPI } from "./api";

export const getFormData = async (formId) => {
  const res = await fetchAPI(`/forms/${formId}`);
  return res;
};
