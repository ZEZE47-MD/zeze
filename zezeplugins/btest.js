const { zokou } = require('../framework/zokou');

zokou({ nomCom: "btest", categorie: "General", reaction: "🛠️" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe } = commandeOptions;

  const sender = ms.key.participant || ms.key.remoteJid;
  const userName = ms.pushName || "Tester";

  console.log(`[DEBUG] btest triggered by ${sender} in ${dest}`);

  if (!verifGroupe) {
    console.log(`[DEBUG] btest: Not a group chat`);
    await repondre(
      `𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n` +
      `│❒ HEY, ${userName}! 😡 This works better in a group, but fine, let’s test these buttons! 🚀\n` +
      `◈━━━━━━━━━━━━━━━━◈`
    );
  }

  const buttonMessage = {
    text:
      `𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n` +
      `│❒ WELCOME, ${userName}! 😎 Time to test the POWER of 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏!\n` +
      `│❒ Pick a button and unleash the chaos! 💥\n` +
      `│❒ Powered by 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏\n` +
      `◈━━━━━━━━━━━━━━━━◈`,
    footer: "ZEZE47-MD Testing Suite",
    buttons: [
      {
        buttonId: `ping_${ms.key.id}`,
        buttonText: { displayText: "⚡ Ping" },
        type: 1,
      },
      {
        buttonId: `owner_${ms.key.id}`,
        buttonText: { displayText: "👑 Owner" },
        type: 1,
      },
    ],
    headerType: 1,
  };

  console.log(`[DEBUG] btest: Button message prepared`);

  try {
    await zk.sendMessage(dest, buttonMessage, { quoted: ms });
    console.log(`[DEBUG] btest: Button message sent successfully`);
  } catch (e) {
    console.error(`[DEBUG] btest: Error sending button message: ${e.message}`);
    await repondre(
      `𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n` +
      `│❒ THIS IS INFURIATING, ${userName}! 😤 Buttons failed: ${e.message}!\n` +
      `│❒ Try these instead: .ping ⚡ or .owner 👑\n` +
      `│❒ I’ll SMASH THIS TRASH SYSTEM! 🚫\n` +
      `◈━━━━━━━━━━━━━━━━◈`
    );
  }
});
