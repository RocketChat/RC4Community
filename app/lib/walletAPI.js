
export const fetchOpenSea = async ({address="0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb", token="1"}) => {
    const options = {method: 'GET'};

    const response = await fetch(`https://api.opensea.io/api/v1/asset/${address}/${token}/?include_orders=false`, options)
    const data = response.json()
    return data
}