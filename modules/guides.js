import { config } from "dotenv";
import { WebhookClient } from "discord.js";
import { GuideData } from "../data/guideData.js";
import { guideEmbed } from "../utilities/embeds.js";
config();

export class Guide extends GuideData {
  US_WEBHOOK = new WebhookClient({
    url: process.env.US_WEBHOOK,
  });
  EU_WEBHOOK = new WebhookClient({
    url: process.env.EU_WEBHOOK,
  });
  JP_WEBHOOK = new WebhookClient({
    url: process.env.JP_WEBHOOK,
  });
  GS_WEBHOOK = new WebhookClient({
    url: process.env.GS_WEBHOOK,
  });

  constructor() {
    super();
  }

  async createAndSendEmbed(country, data) {
    try {
      switch (country) {
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
        default:
          this.GS_WEBHOOK.send({
            embeds: guideEmbed(data, process.env.GS_NOTES),
          });
      }
    } catch (e) {
      throw Error(e.message);
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

      for (const country of countries) {
        for (const sku of skus) {
          const guideData = await this.getGuideData(sku, country);

          for (const data of guideData) {
            await this.createAndSendEmbed(country, data);
          }
        }
      }
    } catch (e) {
      this.sendError(m, e.message);
    }
  }
}
