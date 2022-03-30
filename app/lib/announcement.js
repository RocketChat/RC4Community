import { fetchAPI } from "./api";

export const getAnnouncementData = async (announcement_code) => {
  try {
    const res = await fetchAPI("/announcements");
    let neededAnnouncement = new Object();
    res.forEach((announcement) => {
      if (announcement.announcement_code === announcement_code) {
        neededAnnouncement = announcement;
      }
    });
    return neededAnnouncement;
  } catch (error) {
    console.log(error);
  }
};
