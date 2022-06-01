# Gitlab Component Kit

The Gitlab Component kit cane be used by communtiy builders to showcase the progress of their projects. The current gitlab component kit can be used to showcase the following details of a project : 

### 1. Project Overview 

<p align="center" width="100%">
  <img alt="overview" src="https://user-images.githubusercontent.com/70485812/160277459-5c6cf36a-4c46-4b60-b00d-a6e6ee99ebb6.png">
</p>


### 2. Issues

<p align="center" width="100%">
  <img alt="issues-example" src="https://user-images.githubusercontent.com/70485812/160277482-06a82f86-6dd6-4292-92fd-e3439ce0df01.png">
</p>

### 3. Project Members

<p align="center" width="100%">
  <img alt="members-example" src="https://user-images.githubusercontent.com/70485812/160277505-32231bd4-c1a9-4261-bfa9-74d6b3703e88.png">
</p>
	
### 4. Merge Requests

<p align="center" width="100%">
  <img alt="merge-example" src="https://user-images.githubusercontent.com/70485812/160277532-3055bfd7-cb5a-40f6-be20-dca0b237978a.png">
</p>


## Component Details

All the componets use the same `<Gitlab >` tag and the same data fetchig library with additional paramters.
Some components require an [access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) to be set as environment variable in our cms '.env' file . Create a .env and set `GITLAB_TOKEN` variable as your personal access token. Checkout `/cms/.env.example` for reference.

|  Serial Number   | Component Name | Usage        | Access Token Required  |
| ------------- |------------------------- |-------------------------- | -----|
| 1  | Project Overview | `<Gitlab gitlabData={props.gitlabData}>`  | No |
| 2  | Project Issues |  `<Gitlab gitlabData={props.gitlabData}> type={"issues"}` | No |
| 3  | Project Merge Requests |  `<Gitlab gitlabData={props.gitlabData}> type={"merges"}` | No |
| 4  | Project Members |  `<Gitlab gitlabData={props.gitlabData}> type={"members"}` | Yes |


## Gitlab Tag Props

We use our helper function `gitlabKitData(project_id,[... needs]);` to fetch the data for the component. The returned object can be directly passed to the component and it will render data based on the passed paramters

| Prop Name     | Description                | Type  |
| ------------- |------------------------- | -----|
| type  | This specifies the `type` of gitlab kit components we wish to use. If `type` is not specified, by default the `project overview` component is rendered. Type can be set to : `issues` , `merges` or `members`  | string |
| gitlabData     | This will contain the data which will be rendered by the component      |   json |


# Usage Examples

## #Example 1 : Using Gitlab Project Overview , Issues, Members and Merge Request all at once.

### Using the component

```
import Head from "next/head";
import { Gitlab } from '../components/gitlab';
import { gitlabKitData } from '../lib/gitlab';

export default function GitlabPage(props){
  return (
    <div>
      <Head>
        <title>Gitlab Example 1</title>
      </Head>
        <div>
          <h2 >
            Project Overview
          </h2>
          <Gitlab gitlabData={props.gitlabData} />
        </div>
       <div>
          <h2>
            Gitlab Issues
          </h2>
          <Gitlab type={'issues'} gitlabData={props.gitlabData} />
        </div>
        
        <div>
          <h2>
            Gitlab Pull Requests
          </h2>
          <Gitlab type={'merges'} gitlabData={props.gitlabData} />
        </div>

        <div>
          <h2 >
            Project Members ✨
          </h2>
          <Gitlab type={'members'} gitlabData={props.gitlabData} />
        </div>
    </div>  
  );
}

export async function getStaticProps(){
  
  const gitlabData = await gitlabKitData(3472737,['issues','merges','members']);

  return {
    props: {
      gitlabData
    },
    revalidate: 30,
  };
}
```

### Setting up component data in CMS

1. Open the your cron.js ( This can be located in the following path : `RC4Community/cms/config/functions/cron.js` ).
2. We need to add cron jobs to handle the fetch requests to Gitlab, as frequent fetch request will forbid the IP address to fetch data.
   This example means after each 30 minutes we will re-fetch and update our data.
   
  ![image](https://user-images.githubusercontent.com/70485812/160277772-265d6371-699d-405a-89fd-6909f9f12125.png)
   
3. The `gitlabKit()` function takes two arguments:
	1. The gitlab `Project ID` of the project.
	2. The components we wish to use, as it fetches data accordigly. This will be an array of strinng and can take a combinationof values : `issues`, `members`,`merges` depending on our usecase.

4. Some components require an [access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) to be set as environment variable in our cms `.env` file . Create a .env and set `GITLAB_TOKEN` variable as your personal access token. Checkout `/cms/.env.example` for reference. ![image](https://user-images.githubusercontent.com/70485812/160278557-7e596b2b-7f28-484e-b20b-b8cba8de08e1.png)


5. Just one more change and we are good to go! As the cron job will populate and re-populate data after some time interval. We can't just wait for the first one hour to work with the data right? So we need an initial fetch!

6. Go to `fetchData.js` file which is also in the same functions directory and change the `Project ID` here so that when we first call `INITIALIZE_DATA=true npm run develop` it will call these functions and populate the data for us!

![image](https://user-images.githubusercontent.com/70485812/160277935-375534a0-41ce-4357-8123-b653d704fed3.png)

## #Example 2 : Using Project Members and Merge Request components for the [Inkscape Project](https://gitlab.com/inkscape/inkscape) by Inkscape.

### Using the component

```
import Head from "next/head";
import { Gitlab } from '../components/gitlab';
import { gitlabKitData } from '../lib/gitlab';

export default function GitlabPage(props){
  return (
    <div>
      <Head>
        <title>GSOC2022 Gitlab</title>
      </Head>
        <div>
          <h2>
            Gitlab Merge Requests
          </h2>
          <Gitlab type={'merges'} gitlabData={props.gitlabData} />
        </div>

        <div>
          <h2 >
            Project Members ✨
          </h2>
          <Gitlab type={'members'} gitlabData={props.gitlabData} />
        </div>
    </div>  
  );
}

export async function getStaticProps(){
  
  const gitlabData = await gitlabKitData(3472737,['members','merges']);

  return {
    props: {
      gitlabData
    },
    revalidate: 30,
  };
}
```

### Setting up component data in CMS


1. Cron Jobs ![image](https://user-images.githubusercontent.com/70485812/160278155-d48975a5-474c-4307-92c8-d2c168d9db1c.png)
   
2. Initial Fetch ![image](https://user-images.githubusercontent.com/70485812/160278175-f7845508-4edd-4bf3-ac00-cb7a188cfc9b.png)


## #Example 3 : Using Project Overview Component only.

Note : the Project overview component can be used by default. We do not need to specify any `type` in Gitlab component or add anything to `needed` in `gitlabKitData`
or in `gitlabKit` in the cron job.

### Using the component

```
import Head from "next/head";
import { Gitlab } from '../components/gitlab';
import { gitlabKitData } from '../lib/gitlab';

export default function GitlabPage(props){
  return (
    <div>
      <Head>
        <title>Gitlab Page</title>
      </Head>
        <div>
          <h2 >
            Project Overview
          </h2>
          <Gitlab gitlabData={props.gitlabData} />
        </div>
    </div>  
  );
}

export async function getStaticProps(){
  
  const gitlabData = await gitlabKitData(3472737);

  return {
    props: {
      gitlabData
    },
    revalidate: 30,
  };
}
```

### Setting up component data in CMS


1. Cron Jobs ![image](https://user-images.githubusercontent.com/70485812/160278317-481ef952-e039-4d1d-ad00-a3cb4a179701.png)
   
2. Initial Fetch ![image](https://user-images.githubusercontent.com/70485812/160278332-fffb4261-c693-49bc-b496-352463173683.png)





### <a href="../">:arrow_left: Explore More Components</a>