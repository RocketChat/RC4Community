import { gql, useMutation } from "@apollo/client";

const UPSERT_NFT = gql`
  mutation UpsertNFT($id: String!, $address: String!, $token: String!) {
    upsertNFT(id: $id, address: $address, token: $token) {
      _id
      address
      token
    }
  }
`;
const UPSERT_USER = gql`
  mutation UpsertUser(
    $uid: String!
    $email: String!
    $displayName: String!
    $phoneNumber: String
    $photoURL: String
  ) {
    upsertUser(
      uid: $uid
      email: $email
      displayName: $displayName
      phoneNumber: $phoneNumber
      photoURL: $photoURL
    ) {
      _id
      uid
      email
      displayName
      phoneNumber
      photoURL
    }
  }
`;

export const superProMutate = (target) => {
  //the different useMutation function goes here
  let mutationSchema = null;
  if (target == "nft") {
    mutationSchema = UPSERT_NFT;
  }
  if (target === "user") {
    mutationSchema = UPSERT_USER;
  }
  const callSuper = (key, prop) => {
    if (key === "nft") {
      upsert({
        variables: { id: prop.uid, address: prop.address, token: prop.token },
      });
    }
    if (key === "user") {
      upsert({
        variables: {
          uid: prop.user.uid,
          email: prop.user.email,
          displayName: prop.user.displayName,
          phoneNumber: prop.user.phoneNumber,
          photoURL: prop.user.photoURL,
        },
      });
    }
    // Add other cases eg. if (key == "user")
  };
  const [upsert, { data, loading, error, reset }] = useMutation(mutationSchema);

  return [ callSuper, {data, loading, error, reset} ];
};
