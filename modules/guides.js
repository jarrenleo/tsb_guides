import { config } from "dotenv";
import { WebhookClient } from "discord.js";
import { GuideData } from "../data/guideData.js";
import { jpEmbed, euEmbed, usEmbed, gsEmbed } from "../utilities/embeds.js";
config();

export class Guide extends GuideData {
  JP_WEBHOOK = new WebhookClient({
    url: process.env.JP_WEBHOOK,
  });
  EU_WEBHOOK = new WebhookClient({
    url: process.env.EU_WEBHOOK,
  });
  US_WEBHOOK = new WebhookClient({
    url: process.env.US_WEBHOOK,
  });
  GS_WEBHOOK = new WebhookClient({
    url: process.env.GS_WEBHOOK,
  });

  constructor() {
    super();
  }

  async createEmbed(m, sku, country) {
    try {
      const data = await this.getGuideData(m, sku, country);

      switch (country) {
        case "JP":
          return jpEmbed(data);
        case "NL":
          return euEmbed(data);
        case "US":
          return usEmbed(data);
        default:
          return gsEmbed(data);
      }
    } catch (e) {
      throw Error(e.message);
    }
  }

  async sendEmbed(m, sku, country) {
    try {
      const embed = await this.createEmbed(m, sku, country);

      switch (country) {
        case "JP":
          this.JP_WEBHOOK.send({
            embeds: embed,
          });
          break;
        case "NL":
          this.EU_WEBHOOK.send({
            embeds: embed,
          });
          break;
        case "US":
          this.US_WEBHOOK.send({
            embeds: embed,
          });
          break;
        default:
          this.GS_WEBHOOK.send({
            embeds: embed,
          });
      }
    } catch (e) {
      this.sendError(m, e.message);
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

      for (const sku of skus) {
        for (const country of countries) {
          await this.sendEmbed(m, sku, country);
        }
      }
    } catch (e) {
      this.sendError(m, e.message);
    }
  }
}
