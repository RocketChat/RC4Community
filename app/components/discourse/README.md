# Discourse Components for RC4Community

## Client side set up
1. The discourse components should be wrapped with `DiscourseProvider`. 
```
<DiscourseProvider host={discourseHostUrl}>
	<DiscourseTopicList variant='latest'/>
</DiscourseProvider>
```

2. `DiscourseTopicList` supports three variants `latest`, `top`, `solved` and `unsolved`.

3. `DiscourseTopicListTabs` could be used when user wants to show multiple variants.
```
<DiscourseProvider host={discourseHostUrl}>
	<DiscourseTopicListTabs 
		max={10} 
		maxWidth={'900px'} 
		tabs={['top', 'latest', 'solved']}/>
</DiscourseProvider>
```

## Server side set up
Coming soon. Contributors are welcomed to create server side components for discourse.

# ENVIRONMENT VARIABLES
Though you can pass host directly to DiscourseProvider, to run the index.js page of RC4Community. Set:
```
NEXT_PUBLIC_DISCOURSE_HOST='forum host url'
```