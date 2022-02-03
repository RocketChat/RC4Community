# Open-Source Contribution Leaderboard

The Open-Source Leaderboard project was started by Rocket.Chat as an indipendent project but it can be easily incorporated as a ReactJS Component anywhere you want in RC4Community . It helps you track contibutions by aspiring developers to various open-source projects which are maintained by your community/organization. 

<p align="center" width="100%">
  <img alt="leaderboard" src="https://user-images.githubusercontent.com/70485812/152374738-8c0e1472-ada2-49ce-ab94-90e047a9138c.png" width="70%" align="center">
</p>


###  Steps to setup your own Open-Souce Contribution Leaderboard :

1. Setup your [Open-Source contribution leaderboard](https://github.com/RocketChat/Opensource-Contribution-Leaderboard) by following the instruction in the [documentation](https://github.com/RocketChat/Opensource-Contribution-Leaderboard#introduction). This is a crucial step as this will serve data to your own leader board component.

2. Once the your own open-source contribution leader board is hosted, grab the url of your hosted leaderboard and append `/api/data` to the end of it. This will serve as the API endpoint to fetch contributor data to your component. For example, Rocket.Chat's leaderboard is hosted at : `https://gsoc.rocket.chat`  hence , our API endpoint will be  `https://gsoc.rocket.chat/api/data`.

3. Now, open the your cron.js folder in the forked repository on your system. ( This can be located in the following path : `RC4Community/cms/config/functions/cron.js` ). This cron.js folder will help you fetch your contributor data at regular intervals, so your leaderboard is always up to date !
 
4. Now add your community name, a unique community ID (this will be used in the route to acces your leaderboard , by default , so dont add any spaces) and your API endpoint which we discussed in the above points. 

5. For Example , suppose your community is Socket.Chat, your API endpoint is : `https://gsoc.socket.chat/api/data` and you want your leaderboard to be accessed on the following route `root/gsoc/gsoc2022/socketChat` (ex : `https://community.rocket.chat/gsoc/gsoc2022/socketChat`) , then ,we perform teh following changes as seen in the picture below. This will update your leader board data in the strapi database after every 50 second. You can learn more about scheduled cron jobs from [documentation](https://docs.strapi.io/developer-docs/latest/guides/scheduled-publication.html#example) and [examples](https://stackoverflow.com/questions/54875367/cron-example-for-strapi).  

<p align="center" width="100%">
  <img alt="crons-example" src="https://user-images.githubusercontent.com/70485812/152384131-917c5be2-b6ea-4ad9-b643-e73c353b63be.png" width="50%" align="center">
</p>


6. In the front-end of the application, Next.js will by default show you your leaderboard using dynamic routes which is rendered on the page found at : `RC4Community/app/pages/gsoc/gsoc2022/[id].js`. it is rendered using our `LeaderboardTable` component and you can use your own leaderboard on any page of your choice by fecthing communities from strapi. 

    - Find your community in this fetched array using your 'communityId'. 
    - Sort the data according to mergedPRs, OpenPRs and issues using our `contrinutorList(){...}` function provided in `/RC4Community/app/lib/leaderboard.js`. 
    - Pass the data as props to the `LeaderboardTable` component. and use it wherver you want.
  
  <p align="center" width="100%">
  <img alt="leaderboard" src="https://user-images.githubusercontent.com/70485812/152395227-3a0c0e37-0281-45c5-9ec8-9806603347af.png" width="70%" align="center">
</p>

---

### <a href="../">:arrow_left: Explore More Components</a>

