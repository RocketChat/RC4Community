const axios = require("axios");

module.exports = async () => {
  const carouselResponse = await axios.get(
    "https://community.rocket.chat/api/carousels"
  );
  const guidesResponse = await axios.get(
    "https://community.rocket.chat/api/guides"
  );
  const personaResponse = await axios.get(
    "https://community.rocket.chat/api/personas"
  );

  const personaIconsResponse = await axios.get(
    "https://community.rocket.chat/api/persona-icons"
  );
  const releaseNotesResponse = await axios.get(
    "https://community.rocket.chat/api/release-notes"
  );
  const subMenuResponse = await axios.get(
    "https://community.rocket.chat/api/sub-menus"
  );
  const topNavItemResponse = await axios.get(
    "https://community.rocket.chat/api/top-nav-item"
  );

  try {
    var carouselCount = await strapi.query("carousel").count();
    var personaIconsCount = await strapi.query("persona-icons").count();
    var personaCount = await strapi.query("persona").count();
    var subMenuCount = await strapi.query("sub-menu").count();
    var topNavItemCount = await strapi.query("top-nav-item").count();

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

    await strapi.query("release-notes").update(
      { id: 1 },
      {
        label: releaseNotesResponse.data.label,
        location: releaseNotesResponse.data.location,
      }
    );

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
  } catch (error) {
    console.log("Error:= ", error);
  }
};
