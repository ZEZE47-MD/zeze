const { zokou } = require("../framework/zokou");

// Store messages per chat
const messageCache = new Map();

// Message listener to cache all incoming messages
module.exports.cacheMessageHandler = async (message, zk) => {
  try {
    const chatId = message.key.remoteJid;
    const msgId = message.key.id;
    if (!chatId || !msgId || message.key.fromMe) return;

    // Save the message to cache
    if (!messageCache.has(chatId)) {
      messageCache.set(chatId, new Map());
    }
    messageCache.get(chatId).set(msgId, message);
    
    // Optional: Limit cache size per chat to prevent memory issues
    const cache = messageCache.get(chatId);
    if (cache.size > 100) {
      const oldestKey = [...cache.keys()][0];
      cache.delete(oldestKey);
    }

  } catch (err) {
    console.error("Cache Message Error:", err);
  }
};

// Deleted message handler
module.exports.antiDeleteHandler = async (message, zk) => {
  try {
    const chatId = message.key.remoteJid;
    const msgId = message.messageStubParameters?.[0];

    // Only proceed if a delete event
    if (message.messageStubType === 68 && chatId && msgId) {
      const cachedMsg = messageCache.get(chatId)?.get(msgId);
      if (!cachedMsg) return;

      const sender = cachedMsg.key.participant || cachedMsg.key.remoteJid || "Unknown";
      const content = extractMessageContent(cachedMsg.message);

      if (content) {
        const alertText = `*🚨 Anti-Delete Alert!*\n👤 *Sender:* @${sender.split('@')[0]}\n📩 *Recovered Message:* ${content}`;
        await zk.sendMessage(chatId, { text: alertText, mentions: [sender] });
      }
    }

  } catch (err) {
    console.error("Anti-Delete Handler Error:", err);
  }
};

// Extract readable content from message object
function extractMessageContent(msg) {
  if (!msg) return null;
  return (
    msg.conversation ||
    msg.extendedTextMessage?.text ||
    (msg.imageMessage && "[📷 Image]") ||
    (msg.videoMessage && "[📹 Video]") ||
    (msg.stickerMessage && "[🧩 Sticker]") ||
    (msg.audioMessage && "[🎵 Voice Note]") ||
    "[🚫 Unsupported Message Type]"
  );
}
