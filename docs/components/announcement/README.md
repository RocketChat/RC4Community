# Announcemnet Component

The Announcemnt allows community builders to add an announcemnt at the top of any page. 

![image](https://user-images.githubusercontent.com/70485812/160879805-4facf945-1219-4f9f-a192-b83965956596.png)


## Announcement Component Props

We use our helper function `getAnnouncementData(announcement_code);` to fetch the data for the component inorder for it to be visible and pass it as `announcement` object in the props passed to the page.The announcement prop will be automtically then passed to the component in the layout.

| Prop Name     | Description                | Type  |
| ------------- |------------------------- | -----|
| announcement  | This will contain the details of the announcement  | JSON |

# Usage 

### Setting up component data in CMS

1. Add the Announcement details in the backend under the announcemnts collection. 

![image](https://user-images.githubusercontent.com/70485812/160881585-b66378fb-c144-45e1-9bb0-f5a2d4985460.png)

2. The publish_date is the date when we want the announcemnt to be displayed on the.
3. Announcement Code should be unqiue as it will be used to fetch the announcemnt details on the page where we wish to display the announcement.
4. The `deleteOldAnnouncemts()` runs once a day to delete the announcements which have crossed the unpublish_date, this helps us avoid cluttering of old announcemnts form the database.

NOTE :  If you want any initial announcement to be added to the database during initialization when we run , `INITIALIZE_DATA=true npm run develop`  , add that announcemnt in json format in `cms/config/initialdata/annoucements.json`. This will populate the DB with the announcemnt at the time data is initialised.

### Using the component

```
import Head from "next/head";
import { Github } from '../components/github';
import { githubKitData } from '../lib/github';
import { getAnnouncementData } from '../lib/announcement'; 

export default function Leaderboardpage(props){
  return (
    <div>
      <Head>
        <title>GSOC2022 LeaderBoard</title>
      </Head>
        <div>
          <h2 >
            Repository Overview
          </h2>
          <Github githubData={props.githubData} />
        </div>
    </div>  
  );
}

export async function getStaticProps(){
  
  const githubData = await githubKitData('RocketChat','RC4Community',['issues','pulls','contributors']);
  const topNavItems = await fetchAPI("/top-nav-item");
  
  //the helper function will fetch the relevant anouncement data linked to announcemnt with code 'rc_alumini_conf'
  //Now we will have to pass announcements to page props it and this will display the annoucement on the page
  const announcement = await getAnnouncementData('rc_alumini_conf');

  return {
    props: {
      leaderboardProps,
      githubData,
      announcement
    },
    revalidate: 30,
  };
}
```






### <a href="../">:arrow_left: Explore More Components</a>