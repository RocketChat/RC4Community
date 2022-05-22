import { useMutation, gql } from "@apollo/client";
import { useEffect } from "react";

const UPSERT_NFT = gql`
  mutation UpsertNFT($id: String!, $address: String!, $token: String!) {
    upsertNFT(id: $id, address: $address, token: $token) {
      _id
      address
      token
    }
  }
`;

export const mutationNFT = async ({ uid, address, token, setMutate }) => {
  const [upsertNFT, { data, loading, error, reset }] = useMutation(UPSERT_NFT);
  useEffect(async () => {
    await upsertNFT({ variables: { id: uid, address: address, token: token } });
  }, [uid]);

  if (data) {
    setMutate(false);
    return { data: data };
  }

  if (loading) {
    return { loading: loading };
  }

  if (error) {
    return { error: error, reset: reset };
  }
};

const SuperProfileUpsertNFT = ({
  setMutate,
  setErrMess,
  setLoad,
  uid,
  address,
  token,
}) => {
  const mutationData = mutationNFT({ uid, address, token, setMutate })
    .then((res) => {
      if (!res) {
        return;
      }
      if (res && res.data) {
        setLoad(false);
        setMutate("yay");
        return;
      }

      if (res && res.error) {
        setMutate("err");
        if (
          res.error.graphQLErrors[0].extensions.code == "instance not found"
        ) {
          setErrMess("User not found");
        }
        if (
          res.error.graphQLErrors[0].extensions.code == "instance not unique"
        ) {
          setErrMess("NFT is owned by someone else");
        } else {
          setErrMess(res.error.message);
        }
        setTimeout(() => {
          res.reset();
          setLoad(false);
          setMutate(false);
        }, 5000);
      }

      if (res && res.loading) {
        setLoad(true);
        return;
      }
    })
    .catch((err) => {
      console.log("catch error", err);
    });

  return <></>;
};

export default SuperProfileUpsertNFT;
