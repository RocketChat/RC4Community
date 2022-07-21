'use strict';
const { updateSpeakerData } = require('./speaker')
const { getLatestCommunityActivity } = require('./fetchTopPosts')
/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  '*/5 * * * *': () => {
    getLatestCommunityActivity();
  },
  '*/60 * * * * *': () => {
    updateSpeakerData();
  },
};