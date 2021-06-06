import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import Slider from "react-slick";
import { BsSearch } from "react-icons/bs";
import { FiThumbsUp } from "react-icons/fi";
import { FaRegComment, FaLaptopCode, FaRegSun } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import Countup from "./components/common/Countup";
import { Trans, useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { rcApiDomain } from "./utils/constants";

import "./App.css";

function App() {
  const [searchCategory, setSearchCategory] = useState("");

  const { t, i18n } = useTranslation();

  const carouselItems = [
    {
      name: "Data protection solutions",
      description: "5 security features that every company should keep in mind",
      imageUrl:
        "https://528977-1685022-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2021/03/Cover-Image-Blog-11.jpg.webp",
      url:
        "https://rocket.chat/blog/learn/data-protection-solutions-security-features/",
    },
    {
      name: "Rocket.Chat raises $19m",
      description:
        "In Series A funding confirming privacy-first communication as a major trend in 2021",
      imageUrl:
        "https://528977-1685022-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2021/02/new_header.jpg.webp",
      url:
        "https://rocket.chat/blog/company/rocket-chat-raises-19-million-in-series-a-funding-confirming-privacy-first-communication-as-a-major-trend-in-2021/",
    },
    {
      name: "4 Different Slack Alternatives",
      description:
        "We’ve Tried 4 Different Slack Alternatives & Here’s Our Conclusion",
      imageUrl:
        "https://528977-1685022-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/12/Frame-9.png.webp",
      url: "https://rocket.chat/blog/learn/slack-alternative/",
    },
    {
      name: "Is WhatsApp safe for companies?",
      description: "A quick guide for secure messaging",
      imageUrl:
        "https://528977-1685022-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2021/01/whatsapp-safe-secure-messaging-blog.jpg",
      url: "https://rocket.chat/blog/learn/whatsapp-guide-secure-messaging/",
    },
    {
      name: "Security Bundle",
      description:
        "Get to Know Rocket.Chat’s Newest Weapon For Secure Messaging",
      imageUrl:
        "https://528977-1685022-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2021/02/Security-Bundle-Ilustra.jpg.webp",
      url:
        "https://rocket.chat/blog/product/security-bundle-for-secure-messaging/",
    },
  ];

  const activityItems = [
    {
      title:
        "I am setting up live chat and want to send an attachment ...how do I do that?",
      author: "LigayaFernandez",
      role: "LiveChat User",
      community: "Question Forum",
      time: "17 min ago",
      upvotes: 0,
      comments: 1,
    },
    {
      title: "Stranger Introduction",
      author: "Izzie ",
      role: "GSoC Student",
      community: "GSoC 2021",
      time: "1 hour ago",
      upvotes: 5,
      comments: 10,
    },
    {
      title: "Setting Up Rocket Chat",
      author: "arary",
      role: "Developer",
      community: "Developer Discussions",
      time: "2 hours ago",
      upvotes: 0,
      comments: 1,
    },
    {
      title: "RC4Community Improvements",
      author: "aumurad",
      role: "Admin",
      community: "Announcements",
      time: "4 hours ago",
      upvotes: 50,
      comments: 3,
    },
  ];

  const Item = (props) => {
    return (
      <div className="carousel-item-wrapper">
        <a
          href={props.item.url}
          target="_blank"
          rel="noreferrer"
          className="carousel-item-link"
        >
          <img className="carousel-item-image" src={props.item.imageUrl}></img>
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
          <a
            href="https://docs.rocket.chat/guides/user-guides"
            className="header-link"
          >
            {t("unsigned-home-demo.user-guides")}
          </a>
          |{" "}
          <a
            href="https://github.com/RocketChat/Rocket.Chat/releases"
            className="header-link"
          >
            {t("unsigned-home-demo.release-notes")}
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
          <div className="stat-container">
            <img
              src="https://img.icons8.com/color/80/000000/circled-user-male-skin-type-7--v2.png"
              alt="users"
              className="stat-icon"
            />
            <Countup end={412442} className="stat-number" />
            <div className="stat-label">
              {t("unsigned-home-demo.users-stats-label")}
            </div>
          </div>
          <div className="stat-container">
            <img
              src="https://img.icons8.com/color/80/000000/filled-chat.png"
              alt="messages"
              className="stat-icon"
            />
            <Countup end={12940830} className="stat-number" />

            <div className="stat-label">
              {t("unsigned-home-demo.messages-exchanged-stats-label")}
            </div>
          </div>
          <div className="stat-container">
            <img
              src="https://img.icons8.com/color/80/000000/online--v1.png"
              alt="online-users"
              className="stat-icon"
            />
            <Countup end={507} className="stat-number" />
            <div className="stat-label">
              {t("unsigned-home-demo.online-users-stats-label")}
            </div>
          </div>
        </div>

        <div className="button-container-demo">
          <Button variant="contained" color="primary" href="/login">
            {t("unsigned-home-demo.join-button")}
          </Button>
        </div>
      </header>
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
        {carouselItems.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Slider>
      <h1 className="select-role-heading">
        {t("unsigned-home-demo.select-role-heading")}
      </h1>
      <div className="select-role-buttons-row">
        <div className="select-role-button">
          <RiAdminLine className="select-role-button-icon" />
          <span>{t("unsigned-home-demo.admin-role")}</span>
        </div>
        <div className="select-role-button">
          <FaLaptopCode className="select-role-button-icon" />
          <span>{t("unsigned-home-demo.developer-role")}</span>
        </div>
        <div className="select-role-button">
          <BsChatDots className="select-role-button-icon" />
          <span>{t("unsigned-home-demo.live-chat-user-role")}</span>
        </div>
        <div className="select-role-button">
          <FaRegSun className="select-role-button-icon" />
          <span>{t("unsigned-home-demo.gsoc-student-role")}</span>
        </div>
      </div>
      <div className="communities-wrapper">
        <h1>{t("unsigned-home-demo.community-activity-heading")}</h1>
        {activityItems.map((item) => (
          <div className="community-activity-wrapper">
            <div className="community-activity-content">
              <img
                src={`https://open.rocket.chat/avatar/rocket.cat`}
                className="community-activity-author-image"
              />
              <div className="community-activity-heading">
                <h3>{item.title}</h3>
                <p className="community-activity-info">
                  by{" "}
                  <strong>
                    {item.author}({item.role})
                  </strong>{" "}
                  in <strong>{item.community}</strong> <i>{item.time}</i>{" "}
                </p>
              </div>
            </div>
            <div className="community-activity-actions-wrapper">
              <div className="community-activity-action">
                <FiThumbsUp className="community-activity-action-button" />
                <span>{item.upvotes}</span>
              </div>
              <div className="community-activity-action">
                <FaRegComment className="community-activity-action-button" />
                {item.comments}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
