<h1 align='center'> DevOpsCommunity x Rocket.Chat  </h1>

<img src="https://github.com/rohitg00/DevOpsCommunity/raw/main/assets/cover.png" />
DevOps/SRE community is for those folks who are trying to learn or explore DevOps with the help of experienced professionals. Opportunities are open to share. 

---

Initially created by [Rohit Ghumare](https://github.com/rohitg00/) on [Twitter](https://twitter.com/ghumare64).

---


# Open - Source Contribution

* If you want to contribute, This repository is in build. Feel free to do.
* Help needed for Alignment of Resources, and Readme.md creation with proper contributing guidelines.

## ☁️ Contribute on the Cloud 
Start developing and make changes to your code via a single click **Anytime-Anywhere**!

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/KapadiaNaitik/RC4Community)

Start **designing and customizing your community** management system by opening the **already setup and ready to code developer environment** using Gitpod!

Some *Recommendations* while using **Gitpod**:

- Download the [gitpod browser extension](https://www.gitpod.io/docs/configure/user-settings/browser-extension) to start working on any branch,issue or PR via a single click in under a minute!
- To enjoy *BLAZINGLY FAST* startup times while developing on your forked branches, consider [enabling prebuilds by installing Gitpod's GitHub App](https://www.gitpod.io/docs/configure/projects/prebuilds/#configuring-prebuilds-manually)

## 💻 Contribute Locally

**No prior setup needed**
During development, our data provider is a headless CMS, strapi.

Note that it is used only during development and build time, not during production.

> **_NOTE:_**  You can follow the below instructions to setup your developer environment in your `local machine` or use the `gitpod` method to code on the cloud ⚡️ as suggested above as well!

Pre-requisites:

*volta*
Nodejs versioning is managed by [volta](https://docs.volta.sh/guide/). You can install it by running `curl https://get.volta.sh | bash` in your terminal. This assures that appropriate versions of nodeJS and npm are used and ensures compatibility for all distributed development teams.

*docker*
Your system should have docker available for superprofile we use a dockerized local flauna instance.

```
git clone https://github.com/rocketchat/RC4Community
cd RC4Community
sh startdevenv.sh localhost
```
> Note: Please replace the "localhost" with your static IP if you are doing environment setup on your VM.

The application is written on nextjs and deployable on all nextjs compatible CDN + microservices and scaled deployment platforms. 

Using strapi directly - you can now have designers and devs modify the portal content directly and independently from the dev and devOps folks working on the app.  While developers can now enjoy the hot refresh and rapid iterations of the nextjs dev environment.

## 🛠 Application build time

This app is deployable on all nextjs compatible CDN + microservices and scaled deployment platforms.

To build for deployment, first make sure cms (strapi) is up and running, then:

```
cd app
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:<your strapi port>   npm run build
```

Upon successful build, the cms (strapi) is no longer needed for deployemnt. For example, you may want to deploy to vercel via a `git push`.

For a workable but simple minded, non-scalable, never to be used in production deployment:

```
cd app
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:<your strapi port>   npm run prod
```

Again, note that cms/strapi is not required in production and should not be started.

---

<h3 align='center'>✨ About the repository ✨</h3>

![build and grow massive online communities with rocket.chat](./assets/readme-banner.png)

Since 2015, [Rocket.Chat](https://rocket.chat) has been used globally by groups and organizations to create and build online communities of all shapes and sizes. Today, with millions of end users and hundreds of thousands of deployed servers, Rocket.Chat has uniquely become a networked community of community builders - a community of communities.

With its upcoming decentralized federation refactor, Rocket.Chat stands to become the next level Internet fabric that will loosely unite all on-line communities in a decentralized yet consistent manner.

This project is an extension to Rocket.Chat tailored for [**DevOpsCommunity**](https://github.com/rohitg00/DevOpsCommunity).

Unlike the team chat heritage of Rocket.Chat, this area is a trending but nascent field where major innovations are yet to be imagined. Participants in both open source and closed source space are diligently working on scalability of their platforms and systems. Rocket.Chat for Communities uniquely features an already proven scalable collaboration engine right from day number one.

If you are involved in some ways in the creation, building, and growth of massive communities online - we invite you to participate in [this](https://github.com/RocketChat/RC4Community) project and help us steer its direction and ensure its long term success.


