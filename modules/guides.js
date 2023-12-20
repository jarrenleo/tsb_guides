import { config } from "dotenv";
import { WebhookClient } from "discord.js";
import { getLanguage } from "../utilities/helpers.js";
import { getNikeData } from "../data/nikeAPI.js";
import uniqBy from "lodash.uniqby";
import { GuideData } from "../data/guideData.js";
import { guideEmbed } from "../utilities/embeds.js";
config();

export class Guide extends GuideData {
  errorMessages = [];
  US_WEBHOOK = new WebhookClient({
    url: process.env.US_WEBHOOK,
  });
  EU_WEBHOOK = new WebhookClient({
    url: process.env.EU_WEBHOOK,
  });
  JP_WEBHOOK = new WebhookClient({
    url: process.env.JP_WEBHOOK,
  });
  KR_WEBHOOK = new WebhookClient({
    url: process.env.KR_WEBHOOK,
  });
  GS_WEBHOOK = new WebhookClient({
    url: process.env.GS_WEBHOOK,
  });

  constructor() {
    super();
  }

  async getProductData(sku, country) {
    try {
      const language = getLanguage(country);
      if (!language) {
        this.errorMessages.push(`Country **${country}** is not supported`);
        return null;
      }

      const data = await getNikeData(sku, country, language);
      if (!data) {
        this.errorMessages.push(
          `Product **${sku}** not found in **${country}**`
        );
        return null;
      }

      return data;
    } catch (e) {
      throw Error(e.message);
    }
  }

  async getUniqueProductInfo(skus, countries) {
    try {
      const productInfos = [];

      for (const country of countries) {
        for (const sku of skus) {
          const data = await this.getProductData(sku, country);
          if (!data) continue;

          for (const productInfo of data.productInfo) {
            productInfos.push({
              channel: data.channelName,
              country,
              ...productInfo,
            });
          }
        }
      }

      return uniqBy(productInfos, (info) => info.merchProduct.styleColor);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async createAndSendEmbed(guideData) {
    try {
      for (const data of guideData) {
        switch (data[7]) {
          case "US":
            this.US_WEBHOOK.send({
              embeds: guideEmbed(data, process.env.US_NOTES),
            });
            break;
          case "NL":
            this.EU_WEBHOOK.send({
              embeds: guideEmbed(data, process.env.EU_NOTES),
            });
            break;
          case "JP":
            this.JP_WEBHOOK.send({
              embeds: guideEmbed(data, process.env.JP_NOTES),
            });
            break;
          case "KR":
            this.KR_WEBHOOK.send({
              embeds: guideEmbed(data, "-"),
            });
          default:
            this.GS_WEBHOOK.send({
              embeds: guideEmbed(data, process.env.GS_NOTES),
            });
        }
      }
    } catch (e) {
      throw Error(e.message);
    }
  }

  checkErrorMessages() {
    try {
      if (this.errorMessages.length) throw Error(this.errorMessages.join("\n"));
    } catch (e) {
      throw Error(e.message);
    } finally {
      this.errorMessages = [];
    }
  }

  sendError(m, message) {
    m.reply({
      content: message,
    });
  }

  async handleMessage(m, skus, countries) {
    try {
      if (!skus.length) throw Error("Missing SKU parameter");
      if (!countries.length) throw Error("Missing country parameter");

      const uniqueProductInfo = await this.getUniqueProductInfo(
        skus,
        countries
      );
      const guideData = this.getGuideData(uniqueProductInfo);
      this.createAndSendEmbed(guideData);
      this.checkErrorMessages();
    } catch (e) {
      this.sendError(m, e.message);
    }
  }
}
