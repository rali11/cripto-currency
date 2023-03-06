const getInfoToken = async idToken => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${idToken}`);
  const json = await response.json();
  return {
    id:idToken,
    img:json.image.small,
    symbol:json.symbol,
    name:json.name,
    price:json.market_data.current_price.usd,
    change:json.market_data.price_change_percentage_24h,
  };
}

export const getListInfoToken = async arrayToken => {
  const infoTokens = [];
  for (const item of arrayToken) {
    const dataToken = await getInfoToken(item);
    infoTokens.push(dataToken);
  } 
  return infoTokens;
}

export const searchToken = async searchString => {
  const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${searchString}`);
  const { coins } = await response.json();
  return coins;
}