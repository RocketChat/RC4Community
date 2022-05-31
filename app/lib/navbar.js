import { fetchAPI } from "./api";

export const getNavItems = async ()=>{

    const topNavItems = await fetchAPI("/top-nav-item");
    return topNavItems;

} 