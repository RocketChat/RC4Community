const { carousels,
  guides,
  persona,
  personaIcons,
  releaseNotes,
  subMenus,
  topNavItem,
  speakers,
  forms } = require('../initialData');
const { githubKit } = require('./github');
const { gitlabKit } = require('./gitlab')

module.exports = async () => {

  try {
    var carouselCount = await strapi.query("carousel").count();
    var personaIconsCount = await strapi.query("persona-icons").count();
    var personaCount = await strapi.query("persona").count();
    var subMenuCount = await strapi.query("sub-menu").count();
    var topNavItemCount = await strapi.query("top-nav-item").count();
    var releaseNotesCount = await strapi.query("release-notes").count();
    var guidesCount = await strapi.query("guides").count();
    var formCount = await strapi.query("form").count();
    var ghrepos = await strapi.query("github-repositories").count({});
    var speakersCount = await strapi.query("speaker").count({});
    var ghrepos =  await strapi.query("github-repositories").count({});
    var gitlabprojects = await strapi.query("gitlab-repositories").count({});
    
    // initial fetch
    speakers.map(async (speaker, index) => {
      if (index <= speakersCount - 1) {
        await strapi.query("speaker").update(
          { id: speaker.id },
          {
            name: speaker.name,
            imageUrl: speaker.imageUrl,
            bio: speaker.bio,
            short_bio: speaker.short_bio,
            talk_topic: speaker.talk_topic,
            talk_summary: speaker.talk_summary,
            date_time : (new Date(speaker.date_time)).toISOString(),
            duration_minutes : speaker.duration_minutes,
            live: speaker.live,
            ended: speaker.ended
          }
        );
      } else {
        await strapi.query("speaker").create({
          name: speaker.name,
          imageUrl: speaker.imageUrl,
          bio: speaker.bio,
          short_bio: speaker.short_bio,
          talk_topic: speaker.talk_topic,
          talk_summary: speaker.talk_summary,
          date_time : (new Date(speaker.date_time)).toISOString(),
          duration_minutes : speaker.duration_minutes,
          live: speaker.live,
          ended: speaker.ended
        });
      }
    });


    if (!ghrepos) {
      githubKit('RocketChat', 'RC4Community', ['issues', 'contributors', 'pulls']);
    }

    if (!gitlabprojects) {
      gitlabKit(3472737,['issues','merges','members']);
    }

    forms.map(async (form, index) => {
      if (index <= formCount - 1) {
        await strapi.query("form").update(
          { id: form.id },
          {
            title: form.title,
            formQs: form.formQs
          }
        );
      } else {
        await strapi.query("form").create({
          title: form.title,
          formQs: form.formQs
        });
      }
    });

    carousels.map(async (carousel, index) => {
      if (index <= carouselCount - 1) {
        await strapi.query("carousel").update(
          { id: carousel.id },
          {
            name: carousel.name,
            description: carousel.description,
            url: carousel.url,
            imageUrl: carousel.imageUrl,
          }
        );
      } else {
        await strapi.query("carousel").create({
          name: carousel.name,
          description: carousel.description,
          url: carousel.url,
          imageUrl: carousel.imageUrl,
        });
      }
    });

    personaIcons.map(async (personaIcon, index) => {
      if (index <= personaIconsCount - 1) {
        await strapi.query("persona-icons").update(
          { id: personaIcon.id },
          {
            icon: personaIcon.icon,
            size: personaIcon.size,
            color: personaIcon.color,
          }
        );
      } else {
        await strapi.query("persona-icons").create({
          icon: personaIcon.icon,
          size: personaIcon.size,
          color: personaIcon.color,
        });
      }
    });

    persona.map(async (persona, index) => {
      if (index <= personaCount - 1) {
        await strapi.query("persona").update(
          { id: persona.id },
          {
            name: persona.name,
            persona_icon: {
              id: persona.persona_icon.id,
              icon: persona.persona_icon.icon,
              size: persona.persona_icon.size,
              color: persona.persona_icon.color,
            },
          }
        );
      } else {
        await strapi.query("persona").create({
          name: persona.name,
          persona_icon: {
            id: persona.persona_icon.id,
            icon: persona.persona_icon.icon,
            size: persona.persona_icon.size,
            color: persona.persona_icon.color,
          },
        });
      }
    });

    subMenus.map(async (subMenu, index) => {
      if (index <= subMenuCount - 1) {
        await strapi.query("sub-menu").update(
          { id: subMenu.id },
          {
            label: subMenu.label,
            url: subMenu.url,
          }
        );
      } else {
        await strapi.query("sub-menu").create({
          label: subMenu.label,
          url: subMenu.url,
        });
      }
    });

    if (releaseNotesCount) {
      await strapi.query("release-notes").update(
        { id: 1 },
        {
          label: releaseNotes.label,
          location: releaseNotes.location,
        }
      );
    } else {
      await strapi.query("release-notes").create({
        label: releaseNotes.label,
        location: releaseNotes.location,
      });
    }

    if (guidesCount) {
      await strapi.query("guides").update(
        { id: 1 },
        {
          label: guides.label,
          location: guides.location,
        }
      );
    } else {
      await strapi.query("guides").create({
        label: guides.label,
        location: guides.location,
      });
    }

    if (topNavItemCount) {
      await strapi.query("top-nav-item").update(
        { id: 1 },
        {
          body: topNavItem.body.map((topNavItem, index) => {
            if (topNavItem.__component === "menu.links") {
              return {
                __component: "menu.links",
                label: topNavItem.label,
                url: topNavItem.url,
              };
            } else {
              return {
                __component: "menu.dropdown",
                label: topNavItem.label,
                sub_menus: topNavItem.sub_menus.map((subMenu) => {
                  return {
                    id: subMenu.id,
                    label: subMenu.label,
                    url: subMenu.url,
                  };
                }),
              };
            }
          }),
        }
      );
    } else {
      await strapi.query("top-nav-item").create({
        body: topNavItem.body.map((topNavItem, index) => {
          if (topNavItem.__component === "menu.links") {
            return {
              __component: "menu.links",
              label: topNavItem.label,
              url: topNavItem.url,
            };
          } else {
            return {
              __component: "menu.dropdown",
              label: topNavItem.label,
              sub_menus: topNavItem.sub_menus.map((subMenu) => {
                return {
                  id: subMenu.id,
                  label: subMenu.label,
                  url: subMenu.url,
                };
              }),
            };
          }
        }),
      });
    }
  } catch (error) {
    console.log("Error:= ", error);
  }
};
