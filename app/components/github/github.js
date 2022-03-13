import GithubIssuesList from "./githubissueslist";
import ContributorsList from "./contributorslist";
import GithubPullRequestsList from "./githubpullreqeusts";

const Github = (props) => {
  if(props.type === 'issues'){
    return (<><GithubIssuesList data={props.githubData}/></>);
  }else if(props.type === 'pulls'){
    return(<><GithubPullRequestsList data={props.githubData}/></>)
  }else if(props.type === 'contributors'){
    return (<ContributorsList data={props.githubData}/>);
  }
  return (<></>);
};

export default Github;
