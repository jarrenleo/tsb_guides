export const guideEmbed = (
  [name, url, releaseDateAndTime, channel, method, price, sku, country, image],
  notes
) => {
  return [
    {
      title: name,
      url: url,
      color: 11036160,
      fields: [
        {
          name: "Release Date",
          value: `<t:${releaseDateAndTime}:F> | <t:${releaseDateAndTime}:R>`,
        },
        {
          name: "Channel",
          value: channel,
          inline: true,
        },
        {
          name: "Method",
          value: method,
          inline: true,
        },
        {
          name: "Price",
          value: price,
          inline: true,
        },
        {
          name: "SKU",
          value: sku,
          inline: true,
        },
        {
          name: "Region",
          value: country,
          inline: true,
        },
        {
          name: "Release Notes",
          value: notes,
          inline: true,
        },
      ],
      footer: {
        text: "The Shit Bot",
        icon_url:
          "https://cdn.discordapp.com/attachments/891506947457712188/895677549831659560/TSB_Icon.png",
      },
      thumbnail: {
        url: image,
      },
    },
  ];
};
