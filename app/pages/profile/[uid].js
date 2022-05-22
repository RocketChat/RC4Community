import { useRouter } from 'next/router'
import { useLazyQuery, gql } from '@apollo/client'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { NoUserAvatar } from '../../components/auth/NoUserAvatar';


const FindUserByUid = gql`
  query findbyUid($uid: String!) {
    findUserByUid(uid: $uid) {
        _id
        uid
        displayName
        email
        photoURL
        phoneNumber
      }
  }
`;

const Profile = () => {
    const router = useRouter()
    const { uid } = router.query
    const cookies = Cookies.get('user');
    const [getCurrentUser, { data, error, loading }] = useLazyQuery(FindUserByUid);

    useEffect(() => {
        if(!cookies) {
          router.push('/')
        } 
        getCurrentUser({
          variables: {
            uid: uid
          }
        })
      }, [])

    if(error) console.log(error)
  
    if(data?.findUserByUid){
        const user = data.findUserByUid
        return(
            <>
            <div className="my-3" style={{display:"flex", alignItems:"center", flexDirection:"column"}}>{
            user?.photoURL ?
            <img src={user.photoURL}
                alt={user.displayName}
                className="rounded-circle"
                height="130px"
                width="130px" />
            :
            <NoUserAvatar name={user?.displayName} size="130" />
            }
            <h2 className="my-3">{user.displayName}</h2>
            </div>
            </>
        )
      }

    return <></>
    }  
  export default Profile