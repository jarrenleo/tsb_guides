export class GuideData {
  getURL(channel, sku, country, slug) {
    const countryPath = country !== "US" ? `/${country.toLowerCase()}` : "";

    switch (channel) {
      case "UNKNOWN":
      case "SNKRS Web":
      case "SNKRS":
        return `https://www.nike.com${countryPath}/launch/t/${slug}`;
      case "Nike.com":
        return `https://www.nike.com${countryPath}/t/${slug}/${sku}`;
    }
  }

  getChannel(channel) {
    switch (channel) {
      case "UNKNOWN":
      case "SNKRS Web":
      case "SNKRS":
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

  getImage(nodes, sku) {
    const imageNode = nodes.find((node) =>
      node.properties.internalName?.includes(sku)
    );
    if (!imageNode) return nodes[0].nodes[0].properties.squarishURL;

    return imageNode.properties.squarishURL;
  }

  getGuideData(productInfos) {
    const guideData = [];

    for (const productInfo of productInfos) {
      const name = productInfo.productContent.fullTitle;
      const url = this.getURL(
        productInfo.channel,
        productInfo.merchProduct.styleColor,
        productInfo.country,
        productInfo.productContent.slug
      );
      const releaseDateAndTime =
        Date.parse(
          productInfo.launchView?.startEntryDate ??
            productInfo.merchProduct.commerceStartDate
        ) / 1000;
      const channel = this.getChannel(productInfo.channel);
      const method = this.getMethod(productInfo);
      const price = this.getPrice(productInfo.merchPrice);
      const productSKU = productInfo.merchProduct.styleColor;
      const country = productInfo.country;
      const image = this.getImage(productInfo.imageNodes, productSKU);

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
  }
}
