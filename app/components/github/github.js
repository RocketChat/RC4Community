import GithubIssuesList from "./githubissueslist";
import ContributorsList from "./contributorslist";
import { useState } from "react";

const Github = (props) => {

  if(props.type === 'issues'){
    return (<>
    <GithubIssuesList data={props.githubData}/></>);
  }
  return (<ContributorsList data={props.githubData}/>);
// return (<h1>hey</h1>)
};

export default Github;
