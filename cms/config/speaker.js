module.exports.updateSpeakerData = async function () {
  try {
    let speakerList = await strapi.service("api::speaker.speaker").find({});
    if (Array.isArray(speakerList)) {
      speakerList.forEach(async (speaker) => {
        const speakerTalkTime = new Date(speaker.date_time);
        const currentDateTime = new Date();
        const timeDifferene = (speakerTalkTime - currentDateTime) / 60000;

        if (
          timeDifferene <= 0 &&
          -1 * timeDifferene <= speaker.duration_minutes
        ) {
          if (!speaker.live) {
            await strapi.service("api::speaker.speaker").update(
              {
                id: speaker.id,
              },
              {
                live: true,
                ended: false,
              }
            );
          }
        } else if (
          timeDifferene <= 0 &&
          -1 * timeDifferene > speaker.duration_minutes
        ) {
          if (!speaker.ended) {
            await strapi.service("api::speaker.speaker").update(
              {
                id: speaker.id,
              },
              {
                live: false,
                ended: true,
              }
            );
          }
        } else {
          if (speaker.live || speaker.ended) {
            await strapi.service("api::speaker.speaker").update(
              {
                id: speaker.id,
              },
              {
                live: false,
                ended: false,
              }
            );
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
