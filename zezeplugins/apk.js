const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: 'apk',
  aliases: ['app', 'playstore'],
  reaction: '🉑',
  categorie: 'Download'
}, async (groupId, client, context) => {
  const { repondre, arg, ms } = context;

  try {
    // Get app name from arguments
    const appName = arg.join(" ").trim();
    if (!appName) {
      return repondre("❌ Please provide an app name to search.");
    }

    // Search for the app on BK9 API
    const searchUrl = `https://bk9.fun/search/apk?q=${encodeURIComponent(appName)}`;
    const searchRes = await axios.get(searchUrl);
    const searchData = searchRes.data;

    if (!searchData?.BK9?.length) {
      return repondre("❌ No app found with that name. Try a different name.");
    }

    const appId = searchData.BK9[0].id;

    // Get download details
    const downloadUrl = `https://bk9.fun/download/apk?id=${appId}`;
    const downloadRes = await axios.get(downloadUrl);
    const appData = downloadRes.data?.BK9;

    if (!appData?.dllink || !appData.name) {
      return repondre("❌ Download link not found for this app.");
    }

    // Send APK file to group
    await client.sendMessage(
      groupId,
      {
        document: { url: appData.dllink },
        fileName: `${appData.name}.apk`,
        mimetype: "application/vnd.android.package-archive",
        caption: "ZEZE47-MD"
      },
      { quoted: ms }
    );

  } catch (error) {
    console.error("APK download error:", error);
    repondre("❌ APK download failed. Please try again later.");
  }
});
