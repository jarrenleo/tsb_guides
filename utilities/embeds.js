export const jpEmbed = (data) => {
  const [
    channel,
    _,
    name,
    url,
    image,
    launchDateAndTime,
    method,
    price,
    productInput,
    sizeInput,
    author,
  ] = data;

  return [
    {
      color: 11036160,
      author: {
        name: `${channel} JP RELEASE GUIDES`,
      },
      title: name,
      url: url,
      description: `<t:${launchDateAndTime}:F> | <t:${launchDateAndTime}:R>\nLaunch Method: ${method}\nRetail Price: ${price}`,
      thumbnail: {
        url: image,
      },
      fields: [
        {
          name: "Mode",
          value: "`Request Mode`",
        },
        {
          name: "Channel",
          value: "LEO / DAN / RESTOCKS: `SNKRS`\nLEO / FLOW / RESTOCKS: `NIKE`",
        },
        {
          name: "Product Input",
          value: productInput,
        },
        {
          name: "Size Input",
          value: `Random: ${"`"}RA${"`"}\nSpecific: ${"`"}${sizeInput}${"`"}`,
        },
        {
          name: "Notes",
          value:
            "- TASKを編集しないでください。起動ごとに常に新しいTASKを作成してください\n- FILLER TASKは 1 回実行する必要があります - いつでも実行できます\n- ACCOUNTを確認し、リリースの 3 ～ 5 時間前までに GUCCI を得てください。\n- [PROFILE] タブで住所をチェックして、J1Gされた 住所が表示されていることを確認します\n- ACCOUNTに設定されたSIZE選択をお勧めします\n- LEOではre-entryをon\n- リリースの30分前にTASKを開始\n- 細かいセットアップ手順 https://ptb.discord.com/channels/555044271925887016/841944947426590770/999302390685642822/\n\nCheckout Failures\n- 新しいPROXYを設定します (禁止されたPROXYはチェックアウトでブロックされます)\n-  J1Gのやり直し/新しい CC\n- 新しいPROFILEをBIND\n- FILLER TASK の再実行",
        },
      ],
      footer: {
        text: `The Shit Bot by ${author}`,
        icon_url:
          "https://cdn.discordapp.com/attachments/891506947457712188/895677549831659560/TSB_Icon.png",
      },
    },
  ];
};

export const euEmbed = (data) => {
  const [
    channel,
    _,
    name,
    url,
    image,
    launchDateAndTime,
    method,
    price,
    productInput,
    sizeInput,
    author,
  ] = data;

  return [
    {
      color: 11036160,
      author: {
        name: `${channel} EU RELEASE GUIDES`,
      },
      title: name,
      url: url,
      description: `<t:${launchDateAndTime}:F> | <t:${launchDateAndTime}:R>\n\n**Launch Method**\n> ${method}\n\n**Channel**\n> ${channel}\n\n**Retail Price**\n> ${price}\n\n**Mode**\n> Request Mode\n\n**Input**\n> ${productInput}\n\n**Size Input**\n> Random - RA\n> Specific - ${sizeInput}\n\n**Notes**\n> Don't use pre-submit in the EU at the moment\n> Proxy set can be found under the accounts tab\n> Do not edit tasks, always create new tasks for every launch\n> Check your Accounts prior to a drop [dont do it too late, though]`,
      image: {
        url: image,
      },
      footer: {
        text: `The Shit Bot by ${author}`,
        icon_url:
          "https://cdn.discordapp.com/attachments/891506947457712188/895677549831659560/TSB_Icon.png",
      },
    },
  ];
};

export const usEmbed = (data) => {
  const [
    channel,
    _,
    name,
    url,
    image,
    launchDateAndTime,
    method,
    price,
    productInput,
    sizeInput,
    author,
  ] = data;

  return [
    {
      color: 11036160,
      author: {
        name: `${channel} US RELEASE GUIDES`,
      },
      title: name,
      url: url,
      description: `<t:${launchDateAndTime}:F> | <t:${launchDateAndTime}:R>\nLaunch Method: ${method}\nRetail Price: ${price}`,
      thumbnail: {
        url: image,
      },
      fields: [
        {
          name: "Mode",
          value: "`Request Mode`",
        },
        {
          name: "Channel",
          value: "`" + `${channel}` + "`",
        },
        {
          name: "Product Input",
          value: productInput,
        },
        {
          name: "Size Input",
          value: `Random: ${"`"}RA${"`"}\nSpecific: ${"`"}${sizeInput}${"`"}`,
        },
        {
          name: "Notes",
          value:
            "- Do not edit tasks, always create new tasks for every launch\n- Filler tasks should be done ONCE (Can be done whenever)\n- Accounts at Gucci @ 50 minutes before drop time\n- Check address in Profile tab to make sure they show your j1gged address\n- Recommend for account sizes to be used\n- Start tasks @ 20 minutes before drop time (NOT MORE)\n- Make sure that you have set up your IMAP before you check your accounts and begin running for releases. If you already have valid sessions, there is no need to add them again.\n\n**Checkout Failures**\n- Set new proxies (Banned proxies are blocked from checking out)\n- Change address j1gs (Verified address)\n- Use same phone number / first name / last name / email as account and unique 1:1 relationships\n- Bind new profiles\n- Run filler tasks again (Okay to run before release without restrictions)\n\nP.S: ACCOUNTS PLAY A HUGE ROLE IN DECLINES AS WELL / MOSTLY ADDRESS",
        },
      ],
      footer: {
        text: `The Shit Bot by ${author}`,
        icon_url:
          "https://cdn.discordapp.com/attachments/891506947457712188/895677549831659560/TSB_Icon.png",
      },
    },
  ];
};

export const gsEmbed = (data) => {
  const [
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
  ] = data;

  return [
    {
      color: 11036160,
      author: {
        name: `${channel} ${country} RELEASE GUIDES`,
      },
      title: name,
      url: url,
      description: `<t:${launchDateAndTime}:F> | <t:${launchDateAndTime}:R>\nLaunch Method: ${method}\nRetail Price: ${price}`,
      thumbnail: {
        url: image,
      },
      fields: [
        {
          name: "Mode",
          value: "`Request Mode`",
        },
        {
          name: "Channel",
          value: "`" + `${channel}` + "`",
        },
        {
          name: "Product Input",
          value: productInput,
        },
        {
          name: "Size Input",
          value: `Random: ${"`"}RA${"`"}\nSpecific: ${"`"}${sizeInput}${"`"}`,
        },
        {
          name: "Notes",
          value:
            "- Ensure that account are checked and bound prior to launch\n- Start tasks in batches 30 - 35 minutes prior to launch\n- Filler Mode and Re-Entry is recommended\n- Pre-Submit or Account Sizes are optional",
        },
      ],
      footer: {
        text: `The Shit Bot by ${author}`,
        icon_url:
          "https://cdn.discordapp.com/attachments/891506947457712188/895677549831659560/TSB_Icon.png",
      },
    },
  ];
};
