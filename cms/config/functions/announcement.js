module.exports.deleteOldAnnouncemts = async function () {
  try {
    let announcements = await strapi.query("announcement").find({});
    announcements.forEach(async (announcement) => {
      const announcementUnpublishDateTime = new Date(
        announcement.unpublish_date
      );
      const currentDateTime = new Date();
      if (
        (currentDateTime - announcementUnpublishDateTime) / (1000 * 60 * 60) >
        2
      ) {
        await strapi.query("announcement").delete({
          id: announcement.id,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
