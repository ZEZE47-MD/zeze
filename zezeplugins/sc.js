const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "sc", categorie: "General", reaction: "☣️" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `  
╔════◇ *𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 𝐈𝐍𝐅𝐎* ◇════╗
*📡 contact me 0682937675*:

*👥 𝐒𝐮𝐩𝐩𝐨𝐫𝐭 𝐆𝐫𝐨𝐮𝐩*:
https://chat.whatsapp.com/CS06nnz6auIIVESZwycqOl

*📡 support channel*:
https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r
╭───────────────────◇
│💻 *𝐑𝐀𝐌 𝐔𝐬𝐚𝐠𝐞*: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│👑 *𝐎𝐰𝐧𝐞𝐫 1*: @255682937675
│🌟 *𝐎𝐰𝐧𝐞𝐫 2*: @255760109840
╰───────────────────◇
╚════◇ *𝐏𝐨𝐰𝐞𝐫𝐞𝐝 by 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏* ◇════╝
    `;
    
    let menuMsg = `
╔════◇ *𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 V² 𝐌𝐄𝐍𝐔* ◇════╗
`;

    var lien = mybotpic();
    const mentionedJid = [
        '255682937675@s.whatsapp.net', 
        '255760109840@s.whatsapp.net'
    ];

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    video: { url: lien },
                    caption: infoMsg + menuMsg,
                    footer: "*𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 - 𝐓𝐡𝐞 𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭*",
                    mentions: mentionedJid,
                    gifPlayback: true 
                },
                { quoted: ms }
            );
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    image: { url: lien },
                    caption: infoMsg + menuMsg,
                    footer: "*𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 - 𝐓𝐡𝐞 𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭*",
                    mentions: mentionedJid
                },
                { quoted: ms }
            );
        } else {
            await repondre(infoMsg + menuMsg, { mentions: mentionedJid });
        }
    } catch (e) {
        console.error("❌ 𝐄𝐫𝐫𝐨𝐫:", e);
        repondre("❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐧𝐝 𝐦𝐞𝐧𝐮. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧.");
    }
});
