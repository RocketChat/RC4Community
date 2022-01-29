import { Octokit } from '@octokit/core';

const octokit = new Octokit();

export const octokitClient = async (method, params) => {
  try {
    const res = await octokit.request(method, params);
  
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    return err.message;
  }
};
