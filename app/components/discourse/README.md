# Discourse Components for RC4Community

## Client side set up
1. The discourse components should be wrapped with `DiscourseProvider`. 
```
<DiscourseProvider host={discourseHostUrl}>
	<DiscourseTopicList variant='latest' data={discourse_data_from_discourse_client}/>
</DiscourseProvider>
```
2. Inside of `DiscourseProvider` we can use `useDiscourseClient` to get access to the discourse client. The client exposes functions to fetch discourse data. `DiscourseClient` could also be intialised directly.

3. `DiscourseTopicList` supports three variants `latest`, `top`, `solved` and `unsolved`.

4. `DiscourseTopicListTabs` could be used when user wants to show multiple variants.

```
Const Home = () => {

	const discourseClient = new DiscourseClient(process.env.NEXT_PUBLIC_DISCOURSE_HOST, {
    /**
     * Switch to false if using apiKey and apiUserName.
     * Currently using only unauthenticated apis. So apiKey and apiUserName is not required
		 * apiKey and apiUserName should not providerd on client mode. It will throw an error if provided in client mode
     * */
    isClient: true, 
  });
  const topTopics = await discourseClient.getTopTopics()
  const latestTopics = await discourseClient.getLatestTopics()
  const solvedTopics = await discourseClient.getSolvedTopics()
  const unsolvedTopics = await discourseClient.getUnsolvedTopics()
  const discourseTabsData = [{
    variant: 'top',
    data: topTopics,
  }, {
    variant: 'latest',
    data: latestTopics,
  }, {
    variant: 'solved',
    data: solvedTopics
  }, {
    variant: 'unsolved',
    data: unsolvedTopics,
  }];

  return (
		// You can either provide discourse client or hot url
		<DiscouseProvider discourseClient={discourseClient}>
			<DiscourseTopicListTabs max={10} maxWidth={'900px'} tabs={discourseTabsData}/>
		</DiscourseProvider>
	)
}
```

## Server side set up
Coming soon. Contributors are welcomed to create server side components for discourse.

# ENVIRONMENT VARIABLES
Though you can pass host directly to DiscourseProvider, to run the index.js page of RC4Community. Set:
```
NEXT_PUBLIC_DISCOURSE_HOST='forum host url'
DISCOURSE_HOST='forum host url'
```