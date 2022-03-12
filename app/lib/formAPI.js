import { fetchAPI, getStrapiURL } from "./api";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function getFormData (formId) {
  const path = getStrapiURL(`/forms/${formId}`)
  const { data, error } = useSWR(`${path}`, fetcher)

  return {
    form: data,
    isLoading: !error && !data,
    isError: error
  }
}

export const getForms = async () => {
  const res = await fetchAPI(`/forms`);
  return res;
};
