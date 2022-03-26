# GitHub Component Kit

The Github Component kit cane be used by communtiy builders to showcase the progress of their projects. The current github component kit can be usedto showcase the following details of a repository : 

### 1. Repository Overview 

<p align="center" width="100%">
  <img alt="overview" src="https://user-images.githubusercontent.com/70485812/158334060-0f006063-3bae-472c-b85b-b32a018a5e1e.png">
</p>


### 2. Issues

<p align="center" width="100%">
  <img alt="crons-example" src="https://user-images.githubusercontent.com/70485812/158072201-55ec7fbc-ecfe-4509-8b51-0b057d608bc3.png">
</p>

### 3. Contributors

<p align="center" width="100%">
  <img alt="crons-example" src="https://user-images.githubusercontent.com/73601258/152670586-1ec2b0cd-d51c-4bc4-97f3-3717bbcce162.png">
</p>
	
### 4. Pull Requests

<p align="center" width="100%">
  <img alt="crons-example" src="https://user-images.githubusercontent.com/70485812/158337347-ae75da38-3b3d-4f9f-a816-4f5e0fe0cc66.png">
</p>



All the componets use the same `<Github >` tag and the same data fetchig library with additional paramters.

## Github Tag Props

We use our helper function `githubKitData(repoName,ownerName,[... needs]);` to fetch the data for the component. The returned object can be directly passed to the component and it will render data based on the passed paramters

| Prop Name     | Description                | Type  |
| ------------- |------------------------- | -----|
| type  | This specifies the `type` of github kit components we wish to use. If `type` is not specified, by default the `repository overview` component is rendered. Type can be set to : `issues` , `pulls` or `contributors`  | string |
| githubData     | This will contain the data which will be rendered by the component      |   json |

# Usage Examples

## #Example 1 : Using GitHub Repository Overview , Issues, Contributors and Pull Request all at once.

### Using the component

```
import Head from "next/head";
import { Github } from '../components/github';
import { githubKitData } from '../lib/github';

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
       <div>
          <h2>
            GitHub Issues
          </h2>
          <Github type={'issues'} githubData={props.githubData} />
        </div>
        
        <div>
          <h2>
            GitHub Pull Requests
          </h2>
          <Github type={'pulls'} githubData={props.githubData} />
        </div>

        <div>
          <h2 >
            Contributors ✨
          </h2>
          <Github type={'contributors'} githubData={props.githubData} />
        </div>
    </div>  
  );
}

export async function getStaticProps(){
  
  const githubData = await githubKitData('RocketChat','RC4Community',['issues','pulls','contributors']);
  const topNavItems = await fetchAPI("/top-nav-item");

  return {
    props: {
      leaderboardProps,
      githubData
    },
    revalidate: 30,
  };
}
```

### Setting up component data in CMS

1. Open the your cron.js ( This can be located in the following path : `RC4Community/cms/config/functions/cron.js` ).
2. We need to add cron jobs to handle the fetch requests to GitHub, as frequent fetch request will forbid the IP address to fetch data.
   This example means after each 60 seconds we will re-fetch and update our data.
   
   ![image](https://user-images.githubusercontent.com/70485812/158072721-744b2475-7310-46f2-a3de-0f166bf72324.png)
   
3. The `githubKit()` function takes three arguments:
	1. The github user name of the owner of the repostory.
	2. Name of the repository.
	3. The components we wish to use, as it fetches data accordigly. This will be an array of strinng and can take a combinationof values : `issues`, `contributors`,`pulls` depending on our usecase.

4. Just one more change and we are good to go! As the cron job will populate and re-populate data after some time interval. We can't just wait for the first one hour to work with the data right? So we need an initial fetch!

5. Go to `fetchData.js` file which is also in the same functions directory and change the `owner` and `repo` here so that when we first call `INITIALIZE_DATA=true npm run develop` it will call these functions and populate the data for us!

![image](https://user-images.githubusercontent.com/70485812/158073123-6c637835-fc06-46f8-a279-af7003002ae6.png)

## #Example 2 : Using Contributors and PullRequest components for the Rocket.Chat repository of RocketChat.

### Using the component

```
import Head from "next/head";
import { Github } from '../components/github';
import { githubKitData } from '../lib/github';

export default function Leaderboardpage(props){
  return (
    <div>
      <Head>
        <title>GSOC2022 LeaderBoard</title>
      </Head>
        <div>
          <h2>
            GitHub Pull Requests
          </h2>
          <Github type={'pulls'} githubData={props.githubData} />
        </div>

        <div>
          <h2 >
            Contributors ✨
          </h2>
          <Github type={'contributors'} githubData={props.githubData} />
        </div>
    </div>  
  );
}

export async function getStaticProps(){
  
  const githubData = await githubKitData('RocketChat','RC4Community',['contributors','pulls']);
  const topNavItems = await fetchAPI("/top-nav-item");

  return {
    props: {
      leaderboardProps,
      githubData
    },
    revalidate: 30,
  };
}
```

### Setting up component data in CMS


1. Cron Jobs ![image](https://user-images.githubusercontent.com/70485812/158073275-873f47dc-02ff-4998-83e9-71b5b83ff7b4.png)
   
2. Initial Fetch ![image](https://user-images.githubusercontent.com/70485812/158073303-054200ed-a6c9-4f15-b527-9e35ba2ac314.png)


## #Example 3 : Using Repository Overview Component only.

Note : the repository overview component can be used by default. We don not need to specify any `type` in Github component or add anything to `needed` in `githubKitData`
or in `githubKit` in the cron job.

### Using the component

```
import Head from "next/head";
import { Github } from '../components/github';
import { githubKitData } from '../lib/github';

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
  
  const githubData = await githubKitData('RocketChat','RC4Community');
  const topNavItems = await fetchAPI("/top-nav-item");

  return {
    props: {
      leaderboardProps,
      githubData
    },
    revalidate: 30,
  };
}
```

### Setting up component data in CMS


1. Cron Jobs ![image](https://user-images.githubusercontent.com/70485812/158336100-165bd60b-2528-47cb-a999-321ddbe325c3.png)
   
2. Initial Fetch ![image](https://user-images.githubusercontent.com/70485812/158336345-fd2cfde2-f435-4fd7-92c4-c52a54fc0789.png)





### <a href="../">:arrow_left: Explore More Components</a>