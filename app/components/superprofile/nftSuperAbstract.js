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

export const superProfile = () => {
    //the different useMutation function goes here
    const [upsertNFT, { data, loading, error, reset }] = useMutation(UPSERT_NFT);

    const callSuper = (key, prop) => {
        if (key == "nft") {
            upsertNFT({ variables: { id: prop.uid, address: prop.address, token: prop.token } })
        }
        // Add other cases eg. if (key == "user")
    }

    return {callSuper, data, loading, error, reset}

}