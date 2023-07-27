export const getNikeGuideData = async (channel, sku, country, language) => {
  const response = await fetch(
    `https://api.nike.com/product_feed/threads/v3/?filter=marketplace(${country})&filter=language(${language})&filter=channelName(${channel})&filter=productInfo.merchProduct.styleColor(${sku})&filter=exclusiveAccess(true,false)`
  );
  const data = await response.json();

  return data.objects?.at(0);
};
