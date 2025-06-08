const axios = require('axios');

module.exports = {
  cmdname: ['movie1', 'video', 'lyrics'],
  desc: 'Download movies, videos, or get lyrics using the command.',
  type: 'media',
  fromMe: true,
  usage: 'movie1|video|lyrics <query>',

  async handler(m, { text, cmdName, sock }) {
    if (!text) {
      return m.reply(`❗ Please provide a search query.\n\nUsage: ${cmdName} <query>`);
    }

    try {
      const response = await axios.get(`https://vihangayt.me/${cmdName}?query=${encodeURIComponent(text)}`);
      const result = response.data;

      const channel = '\n\n🔗 View our channel:\nhttps://whatsapp.com/channel/0029VbANIT5D8SDpK7oExi1v';

      if (!result.status) {
        return m.reply('❌ No results found.');
      }

      if (cmdName === 'movie2') {
        const movie = result.data;
        await sock.sendMessage(m.chat, {
          video: { url: movie.sd },
          caption: `🎬 *Title:* ${movie.title}\n📅 *Year:* ${movie.year}\n🌐 *Source:* ${movie.url}${channel}`
        }, { quoted: m });

      } else if (cmdName === 'video1') {
        const video = result.data;
        await sock.sendMessage(m.chat, {
          video: { url: video.url },
          caption: `🎥 *Title:* ${video.title}\n👁️ *Views:* ${video.views}\n🗓️ *Published:* ${video.published}${channel}`
        }, { quoted: m });

      } else if (cmdName === 'lyrics1') {
        const song = result.result;
        await sock.sendMessage(m.chat, {
          image: { url: song.thumb },
          caption: `🎵 *Title:* ${song.title}\n🎤 *Artist:* ${song.artist}\n\n📝 *Lyrics:*\n${song.lyrics}${channel}`
        }, { quoted: m });

      } else {
        m.reply('❌ Invalid command.');
      }

    } catch (error) {
      console.error(error);
      m.reply('⚠️ An error occurred while processing your request.');
    }
  }
};
