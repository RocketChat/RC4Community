import React, { useState } from "react";
import { fetchAPI } from "../lib/api";
import {
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import Slider from "react-slick";
import * as FontAwesome from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Countup from "../components/common/Countup";
import { Trans, useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Icon = (props) => {
  const { iconName, size, color, className } = props;
  const icon = React.createElement(FontAwesome[iconName]);
  return (
    <div className={className} style={{ fontSize: size, color: color }}>
      {icon}
    </div>
  );
};

export default function Home({
  carousels,
  personas,
  guides,
  releaseNotes,
  topNavItems,
  topPosts
}) {
  const [searchCategory, setSearchCategory] = useState("");
  const { t } = useTranslation();
  let loginWindow = null;


  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  let activityItems = [];
  topPosts[0]?.TopPost?.topic_list?.topics.map((topic) => {
    let newTopic = {
      title: topic.fancy_title,
      time: timeSince(new Date(topic.created_at)),
      upvotes: topic.like_count,
      comments: topic.posts_count,
      link: `https://forums.rocket.chat/t/${topic.slug}/${topic.id}`,
      image_url: topic.image_url
    }
    activityItems.push(newTopic);
  })


  const Item = (props) => {
    return (
      <div className="carousel-item-wrapper">
        <a
          href={props.item.url}
          target="_blank"
          rel="noreferrer"
          className="carousel-item-link"
        >
          <img className="carousel-item-image" src={props.item.imageUrl} />
          <h2>{props.item.name}</h2>
        </a>
        <p className="carousel-item-description">{props.item.description}</p>
      </div>
    );
  };

  const handleChange = (event) => {
    setSearchCategory(event.target.value);
  };

  return (
    <div className="home-wrapper">
      <header className="unsigned-home-header">
        <div className="nav-wrapper">
          <div className="header-menu">
            <a
              class="logo"
              href="https://community.rocket.chat/"
              title="Rocket.chat"
              alt="Rocket.chat"
            >
              <img
                src="https://rocket.chat/assets/img/header/logo.svg"
                title="Rocket.chat"
                alt="Rocket.chat"
              />
            </a>
            <ul className="nav-menu">
              {topNavItems?.body?.map((item) => {
                return item.sub_menus ? (
                  <li className="menu-item trigger-submenu">
                    <span className="item-link">{item.label}</span>
                    <div className="wrapper-submenu">
                      <ul>
                        {item.sub_menus.map((sub) => (
                          <li className="submenu-item">
                            <a href={sub.url} title={sub.label}>
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li className="menu-item trigger-submenu">
                    <a href={item.url} className="item-link">
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a onClick={(e) => {e.preventDefault(); if(!loginWindow || loginWindow.closed) loginWindow=window.open('https://open.rocket.chat','loginWindow'); else loginWindow.focus();}} className="login-button">
              Chat Now
            </a>
          </div>
        </div>
        <h1 className="unsigned-home-heading">
          {t("unsigned-home-demo.heading")}
          <br />
        </h1>

        <p className="unsigned-home-text">
          <Trans i18nKey="unsigned-home-demo.description">
            <strong>Monitor</strong> your <strong>workflows</strong>,
            <strong>collaborate</strong> and <strong>access data</strong> any
            time you need it, all in one{" "}
            <strong>productivity-amplifying</strong> full-lifecycle platform
          </Trans>
        </p>
        <br />

        <p>
          <a href={guides.location} className="header-link">
            {guides.label}
          </a>{" "}
          |{" "}
          <a href={releaseNotes.location} className="header-link">
            {releaseNotes.label}
          </a>
        </p>
        <div className="unsigned-search-wrapper">
          <Select
            variant="outlined"
            value={searchCategory}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">{t("unsigned-home-demo.menu-item-1")}</MenuItem>
            <MenuItem value={10}>
              {t("unsigned-home-demo.menu-item-2")}
            </MenuItem>
            <MenuItem value={20}>
              {t("unsigned-home-demo.menu-item-3")}
            </MenuItem>
            <MenuItem value={30}>
              {t("unsigned-home-demo.menu-item-4")}
            </MenuItem>
          </Select>

          <TextField
            id="search-bar"
            className="unsigned-search-input"
            placeholder="Search all content"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BsSearch />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="main-stats-container-demo">
          <div className="stat">
            <Icon
              iconName="FaUsers"
              size="20"
              color="black"
              className="stat-icon"
            />
            <Countup end={412442} className="stat-number" />
            <div className="stat-label">
              {t("unsigned-home-demo.users-stats-label")}
            </div>
          </div>
          <div className="stat">
            <Icon
              iconName="FaComments"
              size="20"
              color="black"
              className="stat-icon"
            />
            <Countup end={12940830} className="stat-number" />
            <div className="stat-label">
              {t("unsigned-home-demo.messages-exchanged-stats-label")}
            </div>
          </div>

          <div className="stat">
            <Icon
              iconName="FaGlobe"
              size="20"
              color="black"
              className="stat-icon"
            />
            <Countup end={507} className="stat-number" />
            <div className="stat-label">
              {t("unsigned-home-demo.online-users-stats-label")}
            </div>
          </div>
        </div>
      </header>
      <div className="home-content-wrapper">
        <h1 className="featured-content-heading">
          {t("unsigned-home-demo.blogs-heading")}
        </h1>
        <Slider
          className="carousel-slider"
          dots={true}
          arrows={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={3}
          pauseOnHover={true}
          prevArrow={<img src="/prev-button-slider.png" />}
          nextArrow={<img src="/next-button-slider.png" />}
        >
          {carousels?.body?.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Slider>
        <h1 className="select-role-heading">
          {t("unsigned-home-demo.select-role-heading")}
        </h1>
        <div className="select-role-buttons-row">
          {personas?.body?.map((persona) => (
            <div className="select-role-button">
              <Icon
                iconName={persona.persona_icon.icon}
                size={persona.persona_icon.size}
                color={persona.persona_icon.color}
                className="select-role-button-icon"
              />
              <span>{persona.name}</span>
            </div>
          ))}
        </div>
        <div className="communities-wrapper">
          <h1>{t("unsigned-home-demo.community-activity-heading")}</h1>
          {activityItems.map((item) => (
            <a href={item.link} className="community-activity-wrapper">
              <div className="community-activity-content">
                <img
                  src={item.image_url || `https://open.rocket.chat/avatar/rocket.cat`}
                  className="community-activity-author-image"
                />
                <div className="community-activity-heading">
                  <h3>{item.title}</h3>
                  <p className="community-activity-info">
                    <i>{item.time}</i>{" "}
                  </p>
                </div>
              </div>
              <div className="community-activity-actions-wrapper">
                <div className="community-activity-action">
                  <Icon
                    iconName={"FaRegThumbsUp"}
                    size={25}
                    color={"black"}
                    className="community-activity-action-button"
                  />
                  <span>{item.upvotes}</span>
                </div>
                <div className="community-activity-action">
                  <Icon
                    iconName={"FaRegComment"}
                    size={25}
                    color={"black"}
                    className="community-activity-action-button"
                  />
                  {item.comments}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const carousels = await fetchAPI("/carousels");
  const personas = await fetchAPI("/personas");
  const guides = await fetchAPI("/guides");
  const releaseNotes = await fetchAPI("/release-notes");
  const topNavItems = await fetchAPI("/top-nav-item");
  const topPosts = await fetchAPI("/discourses");

  return {
    props: { carousels, personas, guides, releaseNotes, topNavItems, topPosts },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 second
    revalidate: 1,
  };
}
