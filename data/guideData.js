import { getNikeGuideData } from "./nikeAPI.js";
import { getLanguage } from "../utilities/helpers.js";

export class GuideData {
  getProductInfo(product, sku) {
    return product.length === 1
      ? product[0]
      : product.find((product) => product.merchProduct.styleColor === sku);
  }

  getChannelName(channel) {
    switch (channel) {
      case "SNKRS Web":
        return "SNKRS";
      case "Nike.com":
        return "NIKE";
    }
  }

  getURL(channel, sku, country, slug) {
    const countryPath = country !== "US" ? `/${country.toLowerCase()}` : "";

    switch (channel) {
      case "SNKRS Web":
        return `https://www.nike.com${countryPath}/launch/t/${slug}`;
      case "Nike.com":
        return `https://www.nike.com${countryPath}/t/${slug}/${sku}`;
    }
  }

  getImage(sku) {
    return `https://secure-images.nike.com/is/image/DotCom/${sku.replace(
      "-",
      "_"
    )}`;
  }

  getMethod(product) {
    const method =
      product.launchView?.method ?? product.merchProduct.publishType ?? "-";

    if (method === "DAN") {
      const duration =
        (Date.parse(product.launchView.stopEntryDate) -
          Date.parse(product.launchView.startEntryDate)) /
        (60 * 1000);

      return `${method} (${duration} minutes)`;
    }

    return method;
  }

  getPrice(price) {
    if (price.discounted)
      return `${price.currency} ${price.currentPrice.toLocaleString(
        "en-US"
      )} ~~${price.fullPrice.toLocaleString("en-US")}~~`;

    return `${price.currency} ${price.fullPrice.toLocaleString("en-US")}`;
  }

  getProductInput(products) {
    let productInput = [];

    for (const product of products) {
      productInput.push(
        `${product.productContent.subtitle}\n${"`"}${
          product.merchProduct.styleColor
        }${"`"}`
      );
    }

    const t = productInput.join("\n\n");
    productInput = [];

    return t;
  }

  getSizeInput(productType) {
    return productType === "FOOTWEAR" ? "7,7.5,8" : "S,M,L";
  }

  async getGuideData(m, sku, country) {
    try {
      const language = getLanguage(country);
      if (!language) throw Error(`Country **${country}** is not supported`);

      const [snkrsData, nikecomData] = await Promise.all([
        getNikeGuideData("SNKRS%20Web", sku, country, language),
        getNikeGuideData("Nike.com", sku, country, language),
      ]);

      const data = nikecomData ?? snkrsData;
      if (!data) throw Error(`Product **${sku}** not found in **${country}**`);

      const productInfo = this.getProductInfo(data.productInfo, sku);
      const channel = this.getChannelName(data.channelName);
      const name = productInfo.productContent.title;
      const url = this.getURL(
        data.channelName,
        sku,
        country,
        productInfo.productContent.slug
      );
      const image = this.getImage(sku);
      const launchDateAndTime =
        Date.parse(
          productInfo.launchView?.startEntryDate ??
            productInfo.merchProduct.commerceStartDate
        ) / 1000;
      const method = this.getMethod(productInfo);
      const price = this.getPrice(productInfo.merchPrice);
      const productInput = this.getProductInput(data.productInfo);
      const sizeInput = this.getSizeInput(productInfo.merchProduct.productType);
      const author = m.author.username;

      return [
        channel,
        country,
        name,
        url,
        image,
        launchDateAndTime,
        method,
        price,
        productInput,
        sizeInput,
        author,
      ];
    } catch (e) {
      throw Error(e.message);
    }
  }
}
