
export const fetchOpenSea = async (address="0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb", token="1") => {
    const options = {method: 'GET'};

    const response = await fetch(`https://api.opensea.io/api/v1/asset/${address}/${token}/?include_orders=false`, options)
    const data = response.json()
    return data
}

export const fetchAssets = async (owner, limit=5, offset=0) => {
    const options = {method: 'GET'};

    const response = await fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${owner}&order_direction=desc&offset=${offset}&limit=${limit}`, options)
    const data = response.json()
    return data
}

export const connectAccount = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      return account
    } catch (e) {
      return e
    }
  };