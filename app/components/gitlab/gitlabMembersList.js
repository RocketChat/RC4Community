import Image from 'next/image';

const MembersList = (props) => {
  
  let contributors = props.data.members.members;

  return (
    <div className="container">
      {Array.isArray(contributors) &&
        contributors.map((contributor) => (
          <a href={contributor.web_url} key={contributor.id}>
            <Image
              className="rounded-circle"
              src={contributor.avatar_url}
              width={40}
              height={40}
            />
          </a>
        ))}
    </div>
  );
};

export default MembersList;