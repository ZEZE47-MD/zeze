aconst util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'gemini',
    categorie: 'AI',
    reaction: '🤖',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - geminiai triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ YO ${nomAuteurMessage}, DON’T BE DUMB! Ask me something, like .geminiai What’s the vibe today? 😡\n◈━━━━━━━━━━━━━━━━◈`);
      }

      const query = arg.join(' ').trim();
      await repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, hitting up Gemini AI with "${query}"! Let’s see what it spits out! 🔍\n◈━━━━━━━━━━━━━━━━◈`);

      const apiUrl = `https://api.giftedtech.web.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.result) {
        return repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌�{D\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ NO DICE, ${nomAuteurMessage}! Gemini AI flopped on "${query}"! Try a better question! 😣\n◈━━━━━━━━━━━━━━━━◈`);
      }

      await zk.sendMessage(
        dest,
        {
          text: `𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ BOOM, ${nomAuteurMessage}! Gemini AI says: "${data.result.trim()}" 🔥\n│❒ Powered by 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏\n◈━━━━━━━━━━━━━━━━◈`,
          footer: `Hey ${nomAuteurMessage}! I'm Toxic-MD, created by zeze_md 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Gemini AI error:', e);
      await repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ TOTAL CRASH, ${nomAuteurMessage}! Something blew up: ${e.message} 😡 Fix it or flop! 😣\n◈━━━━━━━━━━━━━━━━◈`);
    }
  }
);
