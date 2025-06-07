const { zokou } = require("../framework/zokou");
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require("axios");

const channelLink = "🔗 View Channel: https://whatsapp.com/channel/0029VbANIT5D8SDpK7oExi1v";

// Instagram Downloader
zokou({
  nomCom: "igdl",
  categorie: "Download"
}, async (_ctx, sock, { ms, repondre, arg }) => {
  const url = arg.join(" ");
  if (!arg[0]) {
    repondre("Veillez insérer un lien video instagramme");
    return;
  }
  try {
    const res = await axios("https://api.vihangayt.com/downloader/ig?url=" + url);
    const media = res.data.data.data[0];
    if (media.type === "video") {
      sock.sendMessage(_ctx, {
        video: { url: media.url },
        caption: `ig video downloader powered by *𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃*\n${channelLink}`,
        gifPlayback: false
      }, { quoted: ms });
    } else {
      sock.sendMessage(_ctx, {
        image: { url: media.url },
        caption: `ig image downloader powered by *𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃*\n${channelLink}`
      });
    }
  } catch (err) {
    repondre("Erreur survenue lors du téléchargement:\n" + err);
  }
});

// Facebook Downloader 1
zokou({
  nomCom: "fbdl",
  categorie: "Download",
  reaction: "📽️"
}, async (_ctx, sock, { repondre, ms, arg }) => {
  if (!arg[0]) {
    repondre("Insert a public facebook video link!");
    return;
  }
  const url = arg.join(" ");
  try {
    getFBInfo(url).then(data => {
      const info = `titre: ${data.title}\nLien: ${data.url}\n${channelLink}`;
      sock.sendMessage(_ctx, {
        image: { url: data.thumbnail },
        caption: info
      }, { quoted: ms });

      sock.sendMessage(_ctx, {
        video: { url: data.hd },
        caption: `facebook video downloader powered by 𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n${channelLink}`
      }, { quoted: ms });
    }).catch(err => {
      console.log("Error:", err);
      repondre("try fbdl2 on this link");
    });
  } catch (err) {
    console.error("Erreur:", err);
    repondre("Erreur lors du téléchargement de la vidéo.");
  }
});

// TikTok Lite Downloader
zokou({
  nomCom: "tiktoklite",
  categorie: "Download",
  reaction: "🎵"
}, async (_ctx, sock, { arg, ms, prefixe, repondre }) => {
  if (!arg[0]) {
    repondre(`how to use this command:\n${prefixe}tiktoklite tiktok_video_link`);
    return;
  }
  const url = arg.join(" ");
  try {
    const res = await axios.get("https://api.onesytex.my.id/api/tiktok-dl=" + url);
    const data = res.data.data;
    const caption = `Author: ${data.author}\nDescription: ${data.desc}\n${channelLink}`;
    sock.sendMessage(_ctx, {
      video: { url: data.links[0].a },
      caption
    }, { quoted: ms });
  } catch (err) {
    repondre("Error downloading TikTok video.");
  }
});

// Facebook Downloader 2
zokou({
  nomCom: "fbdl2",
  categorie: "Download",
  reaction: "📽️"
}, async (_ctx, sock, { repondre, ms, arg }) => {
  if (!arg[0]) {
    repondre("Insert a public facebook video link!");
    return;
  }
  const url = arg.join(" ");
  try {
    getFBInfo(url).then(data => {
      const info = `titre: ${data.title}\nLien: ${data.url}\n${channelLink}`;
      sock.sendMessage(_ctx, {
        image: { url: data.thumbnail },
        caption: info
      }, { quoted: ms });

      sock.sendMessage(_ctx, {
        video: { url: data.sd },
        caption: `facebook video downloader powered by ®𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n${channelLink}`
      }, { quoted: ms });
    }).catch(err => {
      console.log("Error:", err);
      repondre(err);
    });
  } catch (err) {
    console.error("Erreur:", err);
    repondre("Erreur lors du téléchargement de la vidéo.");
  }
});
