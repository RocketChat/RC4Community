import { fetchAPI } from './api';

export const getIssues = async (owner, repo) => {
  let issues = [
    {
      id: 1,
      title:
        'An error occurred, you can still visit our issues clicking this link',
      html_url: `https://github.com/${owner}/${repo}/issues`,
      reactions: { '+1': 0 },
      comments: 0,
      body: '',
      state: 'open',
      number: 1,
    },
  ];
  const res = await fetchAPI('/ghissues');
  console.log(res);
  if (Array.isArray(res) && Array.isArray(res[0].Issues)) {
    issues = res[0].Issues;
  }
  return issues;
};

export const getContributors = async () => {
  let contributors = [];
  const res = await fetchAPI('/ghcontributors');
  if (Array.isArray(res) && Array.isArray(res[0].Contributors)) {
    contributors = res[0].Contributors;
  }
  return contributors;
};
