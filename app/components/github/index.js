import GithubIssuesList from "./githubissueslist";
import ContributorsList from "./contributorslist";
import GithubPullRequestsList from "./githubpullreqeusts";
import GithubRepo from "./githubrepo";

const Github = (props) => {
  if(props.type === 'issues' && typeof props.githubData.issues !== "undefined"){
    return (<GithubIssuesList data={props.githubData}/>);
  }else if(props.type === 'pulls' && typeof props.githubData.pulls !== "undefined"){
    return(<GithubPullRequestsList data={props.githubData}/>)
  }else if(props.type === 'contributors' && typeof props.githubData.contributors !== "undefined"){
    return (<ContributorsList data={props.githubData}/>);
  }
  return (<GithubRepo data={props.githubData.repositoryData}/>);
};

export default Github;