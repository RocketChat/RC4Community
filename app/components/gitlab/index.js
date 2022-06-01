import GitlabIssuesList from "./gitlabIssuesList";
import MembersList from "./gitlabMembersList";
import GitlabMergeList from "./gitlabMergeRequestList";
import GitlabProject from "./gitlabProject";

const Gitlab = (props) => {
  if(props.type === 'issues'){
    return (<GitlabIssuesList data={props.gitlabData}/>);
  }else if(props.type === 'merges'){
    return(<GitlabMergeList data={props.gitlabData}/>)
  }else if(props.type === 'members'){
    return (<MembersList data={props.gitlabData}/>);
  }
  return (<GitlabProject data={props.gitlabData.project_data}/>);
};

export default Gitlab;