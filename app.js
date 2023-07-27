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

  checkUserId(id) {
    const idSet = new Set([
      "276649462166978560",
      "430516215719657472",
      "414181363135021057",
      "534784678364708866",
      "570580983192223765",
      "413911980600983554",
    ]);

    return idSet.has(id);
  }

  handleMessage() {
    this.discord.on(Events.MessageCreate, async (m) => {
      if (!m.content.startsWith("!guide")) return;
      if (!this.checkUserId(m.author.id)) return;

      const [skus, countries] = this.getParams(m.content.trimStart().slice(6));
      await this.guide.handleMessage(m, skus, countries);
    });
  }
}

new Discord();
