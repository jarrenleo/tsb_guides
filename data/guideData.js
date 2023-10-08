import { getLanguage } from "../utilities/helpers.js";
import { getNikeGuideData } from "./nikeAPI.js";

export class GuideData {
  async getProductData(sku, country) {
    try {
      const language = getLanguage(country);
      if (!language) throw Error(`Country **${country}** is not supported`);

      const data = await getNikeGuideData(sku, country, language);
      if (!data) throw Error(`Product **${sku}** not found in **${country}**`);

      return data;
    } catch (e) {
      throw Error(e.message);
    }
  }

  getURL(channel, sku, country, slug) {
    const countryPath = country !== "US" ? `/${country.toLowerCase()}` : "";

    switch (channel) {
      case "SNKRS Web" || "SNKRS":
        return `https://www.nike.com${countryPath}/launch/t/${slug}`;
      case "Nike.com":
        return `https://www.nike.com${countryPath}/t/${slug}/${sku}`;
    }
  }

  getChannel(channel) {
    switch (channel) {
      case "SNKRS Web" || "SNKRS":
        return "SNKRS";
      case "Nike.com":
        return "NIKE";
    }
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

  getImage(sku) {
    return `https://secure-images.nike.com/is/image/DotCom/${sku.replace(
      "-",
      "_"
    )}`;
  }

  async getGuideData(sku, country) {
    try {
      const guideData = [];
      const productData = await this.getProductData(sku, country);

      for (const productInfo of productData.productInfo) {
        const name = productInfo.productContent.fullTitle;
        const url = this.getURL(
          productData.channelName,
          sku,
          country,
          productInfo.productContent.slug
        );
        const releaseDateAndTime =
          Date.parse(
            productInfo.launchView?.startEntryDate ??
              productInfo.merchProduct.commerceStartDate
          ) / 1000;
        const channel = this.getChannel(productData.channelName);
        const method = this.getMethod(productInfo);
        const price = this.getPrice(productInfo.merchPrice);
        const productSKU = productInfo.merchProduct.styleColor;
        const image = this.getImage(productSKU);

        guideData.push([
          name,
          url,
          releaseDateAndTime,
          channel,
          method,
          price,
          productSKU,
          country,
          image,
        ]);
      }

      return guideData;
    } catch (e) {
      throw Error(e.message);
    }
  }
}
