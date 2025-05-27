const axios = require('axios');

async function downloadMusic(url, format) {
  try {
    if (!url || !format) {
      throw new Error("URL and format parameters are required.");
    }

    // Convert the desired format (e.g., 'mp3') to a recognized audio format type
    const audioFormat = format.toLowerCase();

    const params = {
      'button': 1,
      'start': 1,
      'end': 1,
      'format': audioFormat,  // Assuming 'format' corresponds to audio type
      'url': url
    };

    // Set up headers to mimic a real browser request
    const headers = {
      'Accept': '*/*',
      'Accept-Encoding': "gzip, deflate, br",
      'Accept-Language': "en-GB,en-US;q=0.9,en;q=0.8",
      'Origin': 'https://loader.to',
      'Referer': "https://loader.to",
      'Sec-Ch-Ua': "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': "\"Android\"",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Mode': "cors",
      'Sec-Fetch-Site': "cross-site",
      'User-Agent': "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    };

    // Send the initial request to begin the music download process
    const response = await axios.get('https://ab.cococococ.com/ajax/download.php', {
      params: params,
      headers: headers
    });

    const musicId = response.data.id;

    // Function to check the download progress
    const checkProgress = async () => {
      try {
        const progressResponse = await axios.get("https://p.oceansaver.in/ajax/progress.php", {
          params: { id: musicId },
          headers: headers
        });

        const { progress, download_url, text } = progressResponse.data;

        // If the download is finished, return the download URL
        if (text === "Finished") {
          return download_url;
        } else {
          // If not finished, wait for 1 second and recheck
          await new Promise(resolve => setTimeout(resolve, 1000));
          return await checkProgress();
        }
      } catch (error) {
        throw new Error("Error in progress check: " + error.message);
      }
    };

    return await checkProgress();
  } catch (error) {
    console.error("Error:", error);
    return { 'error': error.message };
  }
}

module.exports = {
  downloadMusic
}
