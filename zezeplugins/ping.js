const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

const AUDIO_URL = "https://files.catbox.moe/fw6by8.mp3"; // New audio URL
const THUMBNAIL_URL = "https://files.catbox.moe/tllsog.jpg"; // New image URL

moment.tz.setDefault(`${conf.TZ}`);

const getTimeAndDate = () => {
    return {
        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')
    };
};

// Ping Command
zokou({ nomCom: "ping", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 1000) + 1; // Simulate random ping

    try {
        await zk.sendMessage(dest, {
            audio: { url: AUDIO_URL },
            mimetype: 'audio/mp4',
            ptt: true, // Send as voice note
            text: `𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏 online...: ${ping}ms\n🌹❣️`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "Follow Zeze47 Channel 🌺",
                    body: "Click to view the channel",
                    thumbnailUrl: conf.URL,
                    sourceUrl: "https://whatsapp.com/channel/0029VbANIT5D8SDpK7oExi1v",
                    mediaType: 1
                }
            }
        }, { quoted: ms });

        // Optional second voice note without context
        await zk.sendMessage(dest, {
            audio: { url: AUDIO_URL },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});
