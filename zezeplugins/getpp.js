const { zokou } = require("../framework/zokou");

zokou(
  {
    nomCom: "getpp",
    categorie: "General",
    reaction: "📷",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu, auteurMsgRepondu, mybotpic, nomAuteurMessage } = commandeOptions;

    // Check if the message is a reply
    if (!msgRepondu) {
      return repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, reply to someone’s message to snag their profile pic! 😡 Don’t make ZEZE47 MD do extra work! 🤔\n◈━━━━━━━━━━━━━━━━◈`);
    }

    try {
      // Notify the user that the profile picture is being fetched
      await repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, ZEZE47 MD’s hunting for @${auteurMsgRepondu.split("@")[0]}’s profile pic! 📸 Hold tight! 🔍\n◈━━━━━━━━━━━━━━━━◈`, { mentions: [auteurMsgRepondu] });

      // Fetch the profile picture of the replied person
      let ppuser;
      try {
        ppuser = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
      } catch {
        ppuser = mybotpic();
        await repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, @${auteurMsgRepondu.split("@")[0]}’s profile pic is locked tight! 😣 ZEZE MD got you my pic instead! 😎\n◈━━━━━━━━━━━━━━━━◈`, { mentions: [auteurMsgRepondu] });
      }

      // Send the profile picture
      await zk.sendMessage(
        dest,
        {
          image: { url: ppuser },
          caption: `𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ BOOM, ${nomAuteurMessage}! Snagged @${auteurMsgRepondu.split("@")[0]}’s profile pic! 🔥\n│❒ Powered by zeze_md\n◈━━━━━━━━━━━━━━━━◈`,
          footer: `Hey ${nomAuteurMessage}! I'm Zeze-MD, created by zeze_�{md 😎`,
          mentions: [auteurMsgRepondu],
        },
        { quoted: ms }
      );

    } catch (error) {
      console.error("Error in .getpp command:", error);
      await repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ TOTAL BUST, ${nomAuteurMessage}! ZEZE47 MD crashed while grabbing the pic: ${error.message} 😡 Try again or flop! 😣\n◈━━━━━━━━━━━━━━━━◈`);
    }
  }
);
