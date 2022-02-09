# GitHub Components Kit

## GitHub Issues Component

![gh-issues-rc4_comm](https://user-images.githubusercontent.com/73601258/152670598-3972804c-4493-4fb1-a066-b12ee8ed0d5d.png)

## Contributors List Component

![rc4_comm_contributors1](https://user-images.githubusercontent.com/73601258/152670586-1ec2b0cd-d51c-4bc4-97f3-3717bbcce162.png)

## Steps to setup your own GitHub Components:

### CMS

1. We need to add cron jobs to handle the fetch requests to GitHub, as frequent fetch request will forbid the IP address to fetch data. You can find `cron.js` file under `cms/config/functions` folder.
   This example means after each 1 hour we will re-fetch and update our data.
   ![cms1](https://user-images.githubusercontent.com/73601258/152671447-aeebd701-5ae7-4da8-91c0-2a97cf62ce36.png)
2. These functions exist at `github.js` file under the same functions directory. If you will check, you need to provide `owner` and `repo` to get data. Simply, owner = organisation or the user and repo = repository.
3. Just one more change and we are good to go! As the cron job will populate and re-populate data after 1 hour interval. We can't just wait for the first one hour to work with the data right? So we need an initial fetch!
4. Go to `fetchData.js` file which is also in the same functions directory and change the `owner` and `repo` here so that when we first call `INITIALIZE_DATA=true npm run develop` it will call these functions and populate the data for us!
   ![initfetch-gh](https://user-images.githubusercontent.com/73601258/152671919-8a7656f9-1445-47fe-a8f4-e3e88bc0ffcf.png)

### Frontend

1. All the GitHub Components reside in the `app/components/github` folder. You can just pull any one of them and use however you like.
2. There are helper functions in `lib/github.js` file, so that you don't worry much about setting up things or handling errors and focus on instant results.
3. Now that you know where stuffs exist, let's get started:
4. While using `getStaticProps` you can fetch data through the helper functions we talked about in _point 2_. So in any page you wish to render them you just need to,

```javascript
export  async  function  getStaticProps({ params }) {
	...
	// owner is (organisation/user), repo is (repository)
	const  issues = await  getIssues('RocketChat', 'RC4Community');
	const  contributors = await  getContributors();
	return {
		props: { issues, contributors }
	}
}
```

5. Now use them like any react component (make sure to import them),

```jsx
<GithubIssuesList  issues={props.issues} noOfIssues={DEFAULT=6} />
or
<ContributorsList  contributors={props.contributors} />
```

---

### <a href="../">:arrow_left: Explore More Components</a>
