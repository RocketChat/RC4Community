import { useLazyQuery } from "@apollo/client";

const FIND_USER_UID = gql`
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

export const superProQuery = (target) => {
    //the different useMutation function goes here
    let querySchema = null;
    if (target === "user") {
      querySchema = UPSERT_USER;
    }
    const callSuper = (key, prop) => {
      if (key === "user") {
        query({
          variables: {
            uid: prop.uid
          }
        });
      }
      // Add other cases eg. if (key == "user")
    };
    const [query, { data, error, loading }] = useLazyQuery(querySchema);
  
    return [ callSuper, {data, loading, error} ];
  };