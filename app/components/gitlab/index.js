import GitlabIssuesList from "./gitlabIssuesList";
import MembersList from "./gitlabMembersList";
import GitlabMergeList from "./gitlabMergeRequestList";
import GitlabProject from "./gitlabProject";

const Gitlab = (props) => {
  if(props.type === 'issues'&& typeof props.gitlabData.issues !=="undefined"){
    return (<GitlabIssuesList data={props.gitlabData}/>);
  }else if(props.type === 'merges' && typeof props.gitlabData.merges !=="undefined"){
    return(<GitlabMergeList data={props.gitlabData}/>)
  }else if(props.type === 'members' && typeof props.gitlabData.members!=="undefined"){
    return (<MembersList data={props.gitlabData}/>);
  }
  return (<GitlabProject data={props.gitlabData.project_data}/>);
};

export default Gitlab;