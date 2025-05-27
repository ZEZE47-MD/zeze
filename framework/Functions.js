const { zokou } = require("../framework/zokou");
const fs = require('fs');
const path = require('path');
const conf = require('../set.js');

const badWords = ["wtf", "mia", "xxx", "fuck", "sex", "huththa", "pakaya", "ponnaya", "hutto", "lol"];
const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi, // WhatsApp group or chat links
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi, // Telegram links
    /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi, // YouTube links
    /https?:\/\/youtu\.be\/\S+/gi, // YouTube short links
    /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi, // Facebook links
    /https?:\/\/fb\.me\/\S+/gi, // Facebook short links
    /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi, // Instagram links
    /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi, // Twitter links
    /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi, // TikTok links
    /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi, // LinkedIn links
    /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi, // Snapchat links
    /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi, // Pinterest links
    /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi, // Reddit links
    /https?:\/\/ngl\/\S+/gi, // NGL links
    /https?:\/\/(?:www\.)?discord\.com\/\S+/gi, // Discord links
    /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi, // Twitch links
    /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi, // Vimeo links
    /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi, // Dailymotion links
    /https?:\/\/(?:www\.)?medium\.com\/\S+/gi // Medium links
];

zoku({
    on: "body"
}, async (dest, zk, commandeOptions) => {
    const {
        repondre, msgRepondu, infosGroupe, auteurMsgRepondu,
        verifGroupe, verifAdmin, nomAuteurMessage, auteurMessage,
        superUser, idBot
    } = commandeOptions;
  
    try {
        // Check if the user is in the group, is not an admin, and bot is an admin
        if (!verifGroupe || verifAdmin || !superUser || !idBot) return;

        // Process for bad words
        const lowerCaseMessage = body.toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));
        
        if (containsBadWord && conf.ANTI_BAD === 'yes') {
            await zk.sendMessage(dest, { delete: key }, { quoted: ms });
            await zk.sendMessage(dest, { text: "🚫 ⚠️BAD WORDS NOT ALLOWED⚠️ 🚫" }, { quoted: ms });
            return; // Stop further processing
        }

        // Process for links
        const containsLink = linkPatterns.some(pattern => pattern.test(body));

        if (containsLink && conf.ANTI_LINK === 'yes') {
            // Delete the message with a link
            await zk.sendMessage(dest, { delete: key }, { quoted: ms });

            // Warn the user who sent the link
            await zk.sendMessage(dest, {
                text: `⚠️ Links are not allowed in this group.\n@${sender.split('@')[0]} has been removed. 🚫`,
                mentions: [sender]
            }, { quoted: ms });

            // Remove the user from the group
            await zk.groupParticipantsUpdate(dest, [sender], 'remove');
        }
    } catch (error) {
        console.error(error);
        repondre("An error occurred while processing the message.");
    }
})
