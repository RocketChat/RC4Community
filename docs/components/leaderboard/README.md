# Open-Source Contribution Leaderboard

The Open-Source Leaderboard project was started by Rocket.Chat as an indipendent project but it can be easily incorporated as a ReactJS Component anywhere you want in RC4Community . It helps you track contibutions by aspiring developers to various open-source projects which are maintained by your community/organization. 

<p align="center" width="100%">
  <img alt="leaderboard" src="https://user-images.githubusercontent.com/70485812/152374738-8c0e1472-ada2-49ce-ab94-90e047a9138c.png" width="70%" align="center">
</p>

### Props

We use our helper function `getLeaderboardStaticProps(communityId,leaderboardSize);` to generate the props needed for the component to work. The returned object breaks down into the following 3 props.

| Prop Name     | Description                | Type  |
| ------------- |------------------------- | -----|
| contributors  | This is the contributor data which we want to display. This contains array of contributors  | array |
| community     | Your Community Name which will be displayed on top your leaderboard       |   string |
| leaderboardSize | Sets the number of contributors you wish to display on your leaderboard |   intiger |

### Usage 

```
import Head from "next/head";
import { fetchAPI } from "../../../lib/api";
import * as LeaderboardComponent from "../../../components/leaderboard";

export default function Leaderboardpage({ leaderboardProps }){
  return (
    <div>
      <Head>
        <title>GSOC2022 LeaderBoard</title>
      </Head>
      { LeaderboardComponent.Leaderboard({... leaderboardProps}) }
    </div>  
  );
}

export async function getStaticProps(){
  
  const communityId = rocket.Chat ; //add your community id here
  const leaderboardProps = await LeaderboardComponent.getLeaderboardProps(communityId,30); //this function will take the communtiyId and leaderboard size 
  const topNavItems = await fetchAPI("/top-nav-item");

  return {
    props: {
      leaderboardProps,
      topNavItems,
    },
    revalidate: 30,
  };
}
```
### Setup Leaderboard in CMS

1. Setup your [Open-Source contribution leaderboard](https://github.com/RocketChat/Opensource-Contribution-Leaderboard) by following the instruction in the [documentation](https://github.com/RocketChat/Opensource-Contribution-Leaderboard#introduction). This is a crucial step as this will serve data to your own leader board component.

2. Once the your own open-source contribution leader board is hosted, grab the url of your hosted leaderboard and append `/api/data` to the end of it. This will serve as the API endpoint to fetch contributor data to your component. For example, Rocket.Chat's leaderboard is hosted at : `https://gsoc.rocket.chat`  hence , our API endpoint will be  `https://gsoc.rocket.chat/api/data`.

3. Open the your cron.js ( This can be located in the following path : `RC4Community/cms/config/functions/cron.js` ). Add your community name, a unique community ID (this will be used in the route to acces your leaderboard , by default , so dont add any spaces) and your API endpoint which we discussed in the above points. 

4. For Example , suppose your community is Socket.Chat, your API endpoint is : `https://gsoc.socket.chat/api/data` and you want your leaderboard to be accessed on the following route `root/gsoc/gsoc2022/socketChat` (ex : `https://community.rocket.chat/gsoc/gsoc2022/socketChat`) and wish ti update your contributore data after every 50 second. You can learn more about scheduled cron jobs from [documentation](https://docs.strapi.io/developer-docs/latest/guides/scheduled-publication.html#example) and [examples](https://stackoverflow.com/questions/54875367/cron-example-for-strapi).  

<p align="center" width="100%">
  <img alt="crons-example" src="https://user-images.githubusercontent.com/70485812/152384131-917c5be2-b6ea-4ad9-b643-e73c353b63be.png" width="50%" align="center">
</p>


5. In the front-end of the application, Next.js will by default show you your leaderboard using dynamic routes which is rendered on the page found at : `RC4Community/app/pages/gsoc/gsoc2022/[id].js`. You can display your `leaderboard` on any other page.

---

### <a href="../">:arrow_left: Explore More Components</a>