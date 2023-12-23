import { config } from "dotenv";
import { Client, GatewayIntentBits, Events } from "discord.js";
import { Guide } from "./modules/guides.js";
config();

class Discord {
  guide = new Guide();

  constructor() {
    this.discord = this.initDiscord();
    this.handleMessage();
  }

  initDiscord() {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    client.login(process.env.DISCORD_TOKEN);

    return client;
  }

  getParams(content) {
    const skus = [];
    const countries = [];

    const params = content.split(" ");
    for (const param of params) {
      if (!param) continue;
      param.length > 2
        ? skus.push(param.toUpperCase())
        : countries.push(param.toUpperCase());
    }

    return [skus, countries];
  }

  handleMessage() {
    this.discord.on(Events.MessageCreate, async (m) => {
      if (!m.content.includes("!guide")) return;

      const [skus, countries] = this.getParams(m.content.slice(6).trimStart());
      await this.guide.handleMessage(m, skus, countries);
    });
  }
}

new Discord();
