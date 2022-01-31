import { Octokit } from '@octokit/core';

const octokit = new Octokit();

export const getIssues = async (owner, repo) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo
    });
    let issues = [];
    if (res.status === 200) {
      issues = res.data.filter((issue) => !issue.pull_request);
    }
    return issues;
  } catch (err) {
    return err;
  }
}

export const getPRs = async (owner, repo) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo
    });
    let prs = [];
    if (res.status === 200) {
      prs = res.data.filter((issue) => issue.pull_request);
    }
    return prs;
  } catch (err) {
    return err.message;
  }
}

export const getContributors = async (owner, repo) => {
  try {
    const res = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
      owner,
      repo,
      per_page: 100,
    });
    let contributors = [];
    if (res.status === 200) {
      contributors = res.data;
    }
    return contributors;
  } catch (err) {
    return err.message;
  }
}
