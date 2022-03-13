import GithubIssuesList from "./githubissueslist";
import ContributorsList from "./contributorslist";
import GithubPullRequestsList from "./githubpullreqeusts";

const Github = (props) => {
  if(props.type === 'issues'){
    return (<><GithubIssuesList data={props.githubData}/></>);
  }else if(props.type === 'pulls'){
    return(<><GithubPullRequestsList data={props.githubData}/></>)
  }
  return (<ContributorsList data={props.githubData}/>);
};

export default Github;
