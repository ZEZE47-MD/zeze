const { zokou } = require("../framework/zokou");
const axios = require("axios");
const ytSearch = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const conf = require("../set");


zokou(
  {
    nomCom: "movie1",
    aliases: ["gtmovie", "mvdl"],
    categorie: "Search",
    reaction: "🎬",
  },
  async (jid, sock, data) => {
    const { arg, ms } = data;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363295141350550@newsletter",
        newsletterName: "ALONE Queen MD V²",
        serverMessageId: 143,
      },
      externalAdReply: {
        title: "Movie Finder",
        body: "Powered by ZEZE47 MD V²",
        thumbnailUrl: "https://telegra.ph/file/94f5c37a2b1d6c93a97ae.jpg",
        sourceUrl: "https://github.com/Zokou1/zeze",
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    };

    const repondre = async (text) => {
      return sock.sendMessage(
        jid,
        {
          text,
          contextInfo,
        },
        { quoted: ms }
      );
    };

    if (!arg[0]) return repondre("❌ Please provide a movie title.");

    const query = arg.join(" ");
    await repondre("🔍 Searching for movie and trailer...");

    const apiKey = "38f19ae1"; // Replace with process.env.OMDB_API_KEY in production

    try {
      const searchRes = await axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`);
      const searchData = searchRes.data;

      if (searchData.Response === "False") return repondre(`❌ Movie not found: ${searchData.Error}`);

      const movieID = searchData.Search[0].imdbID;
      const detailsRes = await axios.get(`http://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`);
      const movie = detailsRes.data;

      if (movie.Response === "False") return repondre(`❌ Error fetching movie details: ${movie.Error}`);

      const ytResult = await ytSearch(`${movie.Title} trailer`);
      const trailer = ytResult.videos.find((v) => v.seconds <= 240); // max 4 min

      if (!trailer) return repondre("❌ No trailer found on YouTube.");

      const trailerInfo = await ytdl.getInfo(trailer.url);
      const format = ytdl.chooseFormat(trailerInfo.formats, { quality: "18" });

      if (!format || !format.contentLength) return repondre("❌ No downloadable video format available.");

      const sizeMB = parseInt(format.contentLength, 10) / (1024 * 1024);
      if (sizeMB > 100) return repondre("❌ Trailer is too large (over 100MB).");

      await sock.sendMessage(
        jid,
        {
          video: { stream: ytdl(trailer.url, { quality: "18" }) },
          caption: `🎬 *${movie.Title}* (${movie.Year})\n⭐ *IMDb:* ${movie.imdbRating}/10\n\n📖 *Plot:* ${movie.Plot}`,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title: movie.Title,
              body: "Watch the trailer",
              thumbnailUrl: movie.Poster !== "N/A" ? movie.Poster : "https://telegra.ph/file/94f5c37a2b1d6c93a97ae.jpg",
              sourceUrl: `https://www.imdb.com/title/${movie.imdbID}`,
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: ms }
      );
    } catch (err) {
      console.error("Movie trailer error:", err);
      return repondre("❌ An error occurred. Please try again.");
    }
  }
);
zokou({
  nomCom: "video",
  aliases: ["video", "ytvideo", "ytmp4","getmovie", "moviedl","movie"],
  categorie: "Search",
  reaction: "🎬",
}, async (jid, sock, data) => {
  const { arg, ms } = data;

  const repondre = async (text) => {
    await sock.sendMessage(jid, {
      text,
      contextInfo: {forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363295141350550@newsletter",
                newsletterName: "ZEZE47 MD V²",
                serverMessageId: 143,
              },
        externalAdReply: {
          title: "ZEZE47 MD VIDEO DOWNLOADER",
          body: "Enjoy using ALONE MD",
          thumbnailUrl: conf.URL,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    }, { quoted: ms });
  };

  if (!Array.isArray(arg) || !arg.length) return repondre("Please provide a video name.");
  const query = arg.join(" ");

  try {
    const results = await ytSearch(query);
    if (!results || !results.videos.length) return repondre("No video found for the specified query.");
    const video = results.videos[0];
    const videoUrl = video.url;

    await sock.sendMessage(jid, {
      text: "```Downloading video...```",
      contextInfo: {forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363295141350550@newsletter",
                newsletterName: "ZEZE47 MD V²",
                serverMessageId: 143,
              },
        externalAdReply: {
          title: video.title,
          body: "Searching YouTube...",
          thumbnailUrl: video.thumbnail,
          sourceUrl: videoUrl,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    }, { quoted: ms });

    const apiUrls = [
      `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`,
      `https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://api.dreaded.site/api/ytdl/video?query=${encodeURIComponent(videoUrl)}`,
      `https://youtube-download-api.matheusishiyama.repl.co/mp4/?url=${encodeURIComponent(videoUrl)}`,
    ];

    let response;
    for (let url of apiUrls) {
      try {
        console.log("Trying API:", url);
        const res = await axios.get(url);
        console.log("Response:", JSON.stringify(res.data));
        const link = res.data?.result?.download_url || res.data?.result?.link || res.data?.link;
        if (link) {
          response = {
            title: res.data?.result?.title || res.data?.title || video.title,
            link,
            thumbnail: res.data?.result?.thumbnail || res.data?.thumbnail || video.thumbnail,
          };
          break;
        }
      } catch (e) {
        console.log("API failed:", url, e.message);
      }
    }

    // Final fallback using ytdl-core
    if (!response) {
      try {
        const info = await ytdl.getInfo(videoUrl);
        const format = ytdl.chooseFormat(info.formats, { quality: '18' }); // 360p mp4
        if (format && format.url) {
          response = {
            title: info.videoDetails.title,
            link: format.url,
            thumbnail: info.videoDetails.thumbnails?.pop()?.url,
          };
        }
      } catch (err) {
        console.error("ytdl-core fallback failed:", err);
      }
    }

    if (!response || !response.link) {
      return repondre("All sources failed. Try again later.");
    }

    await sock.sendMessage(jid, {
      video: { url: response.link },
      caption: response.title,
      mimetype: "video/mp4",
      contextInfo: {
        externalAdReply: {
          title: response.title,
          body: "Tap to watch on YouTube",
          mediaType: 1,
          showAdAttribution: false,
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363295141350550@newsletter',
            newsletterName: 'ZEZE47 MD V²',
            serverMessageId: 143
          }
        },
      },
    }, { quoted: ms });

  } catch (err) {
    console.error("Video Download Error:", err);
    return repondre("Video download failed: " + (err.message || err));
  }
});

zokou({
  nomCom: "lyrics",
  aliases: ["ly", "songlyrics", "lyric"],
  categorie: "Search",
  reaction: "📝",
}, async (jid, sock, data) => {
  const { arg, ms } = data;

  const repondre = async (text) => {
    await sock.sendMessage(jid, {
      text,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363295141350550@newsletter',
          newsletterName: 'ALONE Queen MD V²',
          serverMessageId: 143
        },
        externalAdReply: {
          title: "🎵 ZEZE47 MD LYRICS FINDER",
          body: "Powered by ZEZE47 MD V²",
          thumbnailUrl: "https://telegra.ph/file/94f5c37a2b1d6c93a97ae.jpg",
          sourceUrl: "https://github.com/Zokou1/zeze",
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    }, { quoted: ms });
  };

  if (!arg[0]) return repondre("Please provide the song name.");

  const query = arg.join(" ");
  let lyricsData = null;

  const sources = [
    async () => {
      const res = await axios.get(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(query)}`).catch(() => null);
      if (!res || !res.data || !res.data.lyrics) throw new Error("Popcat failed");
      return {
        title: res.data.title,
        author: res.data.artist,
        lyrics: res.data.lyrics,
        thumbnail: res.data.image,
        link: res.data.url
      };
    },
    async () => {
      const res = await axios.get(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(query)}`).catch(() => null);
      if (!res || !res.data || !res.data.lyrics) throw new Error("Some-Random-API failed");
      return {
        title: res.data.title,
        author: res.data.author || "Unknown",
        lyrics: res.data.lyrics,
        thumbnail: res.data.thumbnail?.genius,
        link: res.data.links?.genius
      };
    },
    async () => {
      const res = await axios.get(`https://lyrist.vercel.app/api/${encodeURIComponent(query)}`).catch(() => null);
      if (!res || !res.data || !res.data.content) throw new Error("Lyrist failed");
      return {
        title: query,
        author: "Unknown",
        lyrics: res.data.content,
        thumbnail: "https://telegra.ph/file/94f5c37a2b1d6c93a97ae.jpg",
        link: "https://github.com/Zokou1/ALONE-MD"
      };
    }
  ];

  for (const fetchLyrics of sources) {
    try {
      const data = await fetchLyrics();
      if (data && data.lyrics) {
        lyricsData = data;
        break;
      }
    } catch (err) {
      console.log("Lyrics source failed:", err.message);
    }
  }

  if (!lyricsData) return repondre("Couldn't find lyrics from any source. Try again with a different song title.");

  const { title, author, lyrics, thumbnail, link } = lyricsData;
  const message = `*🎵 Title:* ${title}\n*👤 Artist:* ${author}\n\n${lyrics.slice(0, 4096)}`;

  await sock.sendMessage(jid, {
    image: { url: thumbnail },
    caption: message,
    contextInfo: {
      externalAdReply: {
        title: title,
        body: `By ${author}`,
        mediaType: 1,
        thumbnailUrl: thumbnail,
        sourceUrl: link,
        renderLargerThumbnail: false,
      },
    },
  }, { quoted: ms });
});


zokou({
  nomCom: "play",
  aliases: ["song", "ytmp3", "audio", "mp3"],
  categorie: "Search",
  reaction: "⬇️",
}, async (jid, sock, data) => {
  const { arg, ms } = data;

  const repondre = async (text) => {
    await sock.sendMessage(jid, {
      text,
      contextInfo: {forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363295141350550@newsletter',
              newsletterName: 'ZEZE47 MD V²',
              serverMessageId: 143},
        externalAdReply: {
          title: "♻️ ZEZE47 MD AUDIO DOWNLOADER ♻️",
          body: "Powered by ZEZE47 MD V²",
          thumbnailUrl: "https://telegra.ph/file/94f5c37a2b1d6c93a97ae.jpg",
          sourceUrl: "https://github.com/Zokou1/zeze",
          mediaType: 1,
          renderLargerThumbnail: false,
          showAdAttribution: false,
        },
      },
    }, { quoted: ms });
  };

  if (!arg[0]) return repondre("Please provide a Audio name.");
  const query = arg.join(" ");

  try {
    const results = await ytSearch(query);
    if (!results || !results.videos.length)
      return repondre("No audio found for the specified query.");

    const video = results.videos[0];
    const videoUrl = video.url;
    const title = video.title;

    // Attempt to split title into artist and song
    const [artist, songTitle] = title.includes(" - ") ? title.split(" - ", 2) : ["Unknown Artist", title];

    await sock.sendMessage(jid, { text: "```Downloading....```" }, { quoted: ms });

    const tryApi = async (url) => {
      try {
        const res = await axios.get(url);
        return res.data;
      } catch {
        return { success: false };
      }
    };

    let response =
      await tryApi(`https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`)
      || await tryApi(`https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`)
      || await tryApi(`https://api.dreaded.site/api/ytdl/video?query=${encodeURIComponent(videoUrl)}`);

    if (!response.success) return repondre("All sources failed. Try again later.");

    const { download_url, thumbnail } = response.result;

    await sock.sendMessage(jid, {
      audio: { url: download_url },
      mimetype: "audio/mp4",
      contextInfo: {
        externalAdReply: {
          title: "♻️ ZEZE47 MD AUDIO DOWNLOADER ♻️",
          body: `🎵 ${artist} - ${songTitle}`,
          mediaType: 1,
          thumbnailUrl: thumbnail,
          sourceUrl: videoUrl,
          renderLargerThumbnail: false,
          showAdAttribution: false,
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363295141350550@newsletter',
            newsletterName: 'ZEZE47 MD V²',
            serverMessageId: 143
          }
        },
      },
    }, { quoted: ms });

  } catch (err) {
    console.error("Download Error:", err);
    return repondre("Download failed: " + (err.message || err));
  }
});
