const axios = require("axios");

module.exports = async () => {
  const APIEndpoint =
    "https://raw.githubusercontent.com/Sing-Li/bbug/master/api/";
  const carouselResponse = await axios.get(APIEndpoint + "carousels.json");
  const guidesResponse = await axios.get(APIEndpoint + "guides.json");
  const personaResponse = await axios.get(APIEndpoint + "personas.json");

  const personaIconsResponse = await axios.get(
    APIEndpoint + "persona-icons.json"
  );
  const releaseNotesResponse = await axios.get(
    APIEndpoint + "release-notes.json"
  );
  const subMenuResponse = await axios.get(APIEndpoint + "sub-menus.json");
  const topNavItemResponse = await axios.get(APIEndpoint + "top-nav-item.json");

  try {
    var carouselCount = await strapi.query("carousel").count();
    var personaIconsCount = await strapi.query("persona-icons").count();
    var personaCount = await strapi.query("persona").count();
    var subMenuCount = await strapi.query("sub-menu").count();
    var topNavItemCount = await strapi.query("top-nav-item").count();
    var releaseNotesCount = await strapi.query("release-notes").count();
    var guidesCount = await strapi.query("guides").count();

    carouselResponse.data.map(async (carousel, index) => {
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

    personaIconsResponse.data.map(async (personaIcon, index) => {
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

    personaResponse.data.map(async (persona, index) => {
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

    subMenuResponse.data.map(async (subMenu, index) => {
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
          label: releaseNotesResponse.data.label,
          location: releaseNotesResponse.data.location,
        }
      );
    } else {
      await strapi.query("release-notes").create({
        label: releaseNotesResponse.data.label,
        location: releaseNotesResponse.data.location,
      });
    }

    if (guidesCount) {
      await strapi.query("guides").update(
        { id: 1 },
        {
          label: guidesResponse.data.label,
          location: guidesResponse.data.location,
        }
      );
    } else {
      await strapi.query("guides").create({
        label: guidesResponse.data.label,
        location: guidesResponse.data.location,
      });
    }

    if (topNavItemCount) {
      await strapi.query("top-nav-item").update(
        { id: 1 },
        {
          body: topNavItemResponse.data.body.map((topNavItem, index) => {
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
        body: topNavItemResponse.data.body.map((topNavItem, index) => {
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
