const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");
const wiki = require("wikipedia");
const conf = require(__dirname + "/../set");
zokou({
  'nomCom': "hand",
  'categorie': 'fun',
  'reaction': "📽️"
}, async (_0x147c4b, _0x5ab300, _0x1b00c8) => {
  const {
    repondre: _0x11e5b2,
    ms: _0x2c9e34
  } = _0x1b00c8;
  try {
    const _0x39d715 = await _0x5ab300.sendMessage(_0x147c4b, {
      'text': "✊🏻 *STARTED...* 💦"
    });
    const _0x1c6cbb = ['8✊️===D', "8=✊️==D", '8==✊️=D', '8===✊️D', "8==✊️=D", '8=✊️==D', "8✊️===D", "8=✊️==D", "8==✊️=D", "8===✊️D", "8==✊️=D", '8=✊️==D', "8✊️===D", "8=✊️==D", "8==✊️=D", "8===✊️D", "8==✊️=D", "8=✊️==D", '8✊️===D', '8=✊️==D', '8==✊️=D', "8===✊️D 💦", "8==✊️=D💦 💦", "8=✊️==D 💦💦 💦"];
    for (const _0x2dd152 of _0x1c6cbb) {
      await new Promise(_0x35aa91 => setTimeout(_0x35aa91, 0x3e8));
      await _0x5ab300.relayMessage(_0x147c4b, {
        'protocolMessage': {
          'key': _0x39d715.key,
          'type': 0xe,
          'editedMessage': {
            'conversation': _0x2dd152
          }
        }
      }, {});
    }
  } catch (_0x828362) {
    console.log(_0x828362);
    _0x11e5b2("❌ *Error!* " + _0x828362.message);
  }
});
zokou({
  'nomCom': "hack",
  'aliases': ["malware", "trojan"],
  'reaction': '🪅',
  'categorie': "Fun"
}, async (_0x2da42b, _0x465507, _0x585c13) => {
  try {
    const {
      ms: _0xa169ff
    } = _0x585c13;
    const _0x544c7e = ["```Injecting Malware```", "``` █ 10%```", "```█ █ 20%```", "```█ █ █ 30%```", "``` █ █ █ █ 40%```", "``` █ █ █ █ █ 50%```", "``` █ █ █ █ █ █ 60%```", "``` █ █ █ █ █ █ █ 70%```", "```█ █ █ █ █ █ █ █ 80%```", "```█ █ █ █ █ █ █ █ █ 90%```", "```█ █ █ █ █ █ █ █ █ █ 100%```", "```System hijacking on process..```", "```Connecting to Server error to find 404```", "```Device successfully connected...\nReceiving data...```", "```Data hijacked from device 100% completed\nKilling all evidence, killing all malwares...```", "```HACKING COMPLETED```", "```SENDING LOG DOCUMENTS...```", "```SUCCESSFULLY SENT DATA AND Connection disconnected```", "```BACKLOGS CLEARED```", "```POWERED BY 𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃```", "```love it 💚❤️```"];
    for (const _0x57bb91 of _0x544c7e) {
      await _0x465507.sendMessage(_0x2da42b, {
        'text': _0x57bb91
      }, {
        'quoted': _0xa169ff
      });
      await new Promise(_0x25c71c => setTimeout(_0x25c71c, 0x3e8));
    }
  } catch (_0x276af4) {
    console.error("Error during prank:", _0x276af4);
    await _0x465507.sendMessage(_0x2da42b, {
      'text': "❌ *Error!* Something went wrong. Reason: " + _0x276af4.message + ". Please try again later."
    });
  }
});
zokou({
  'nomCom': "fact",
  'reaction': '✌️',
  'categorie': "Fun"
}, async (_0x468981, _0x37391b, _0x4e9867) => {
  const {
    repondre: _0x18b344,
    arg: _0xa7bfc6,
    ms: _0x138307
  } = _0x4e9867;
  try {
    const _0xc76f74 = await axios.get('https://nekos.life/api/v2/fact');
    const _0xddf031 = _0xc76f74.data;
    const _0x29fa45 = "\n┏━━━━ *𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 V²-FACT* ━━━━━◆                     \n┃\n┃   *◇* " + _0xddf031.fact + " \n┃\n┃   *◇* Regards *𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃*\n┃      \n ╭────────────────◆\n │ *_Powered by 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏._*\n ╰─────────────────◆\n    ";
    await _0x37391b.sendMessage(_0x468981, {
      'text': _0x29fa45,
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363295141350550@newsletter",
          'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
          'serverMessageId': 0x8f
        },
        'externalAdReply': {
          'title': "Fun Fact",
          'body': "Here's a fun fact to enlighten your day!",
          'thumbnailUrl': conf.URL,
          'sourceUrl': conf.GURL,
          'mediaType': 0x1
        }
      }
    }, {
      'quoted': _0x138307
    });
  } catch (_0x1939ff) {
    console.error(_0x1939ff);
    await _0x18b344("An error occurred while fetching the fact.");
  }
});
zokou({
  'nomCom': "quotes",
  'reaction': '💥',
  'categorie': "Fun"
}, async (_0x576418, _0x23869a, _0x53fcb3) => {
  const {
    repondre: _0x1e57a4,
    arg: _0x38ea7b,
    ms: _0x2fcb22
  } = _0x53fcb3;
  try {
    const _0x68d727 = await axios.get("https://favqs.com/api/qotd");
    const _0x459567 = _0x68d727.data;
    const _0x4dde22 = "\n┏━━━━━QUOTE━━━━━━◆\n┃   *◇* _" + _0x459567.quote.body + "_\n┃  \n┃   *◇* *AUTHOR:* " + _0x459567.quote.author + "\n┃      \n┃    *◇*  *regards 𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃*\n┃    \n╭────────────────◆\n│ *_Powered by 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏._*\n╰─────────────────◆\n    ";
    await _0x23869a.sendMessage(_0x576418, {
      'text': _0x4dde22,
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363295141350550@newsletter",
          'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃  V²",
          'serverMessageId': 0x8f
        },
        'externalAdReply': {
          'title': "Daily Quote",
          'body': "Here's an inspiring quote to motivate you!",
          'thumbnailUrl': conf.URL,
          'sourceUrl': conf.GURL,
          'mediaType': 0x1
        }
      }
    }, {
      'quoted': _0x2fcb22
    });
  } catch (_0x51f686) {
    console.error(_0x51f686);
    await _0x1e57a4("An error occurred while fetching the quote.");
  }
});
zokou({
  'nomCom': "happy",
  'categorie': "fun",
  'reaction': "📽️"
}, async (_0x26af29, _0xb42b75, _0x4690a2) => {
  const {
    repondre: _0x56c462,
    ms: _0x3760ac
  } = _0x4690a2;
  try {
    const _0x44fbe9 = await _0xb42b75.sendMessage(_0x26af29, {
      'text': "✊🏻 *STARTED...* 💦"
    });
    const _0x4e108a = ['😃', '😄', '😁', '😊', '😎', '🥳', '😸', '😹', '🌞', '🌈', '😃', '😄', '😁', '😊', '😎', '🥳', '😸', '😹', '🌞', '🌈', '😃', '😄', '😁', '😊'];
    for (const _0x374340 of _0x4e108a) {
      await new Promise(_0x1470ec => setTimeout(_0x1470ec, 0x3e8));
      await _0xb42b75.relayMessage(_0x26af29, {
        'protocolMessage': {
          'key': _0x44fbe9.key,
          'type': 0xe,
          'editedMessage': {
            'conversation': _0x374340
          }
        }
      }, {});
    }
  } catch (_0x2fb1e4) {
    console.log(_0x2fb1e4);
    _0x56c462("❌ *Error!* " + _0x2fb1e4.message);
  }
});
zokou({
  'nomCom': 'hrt',
  'aliases': ["moyo", 'heart'],
  'categorie': "fun",
  'reaction': "📽️"
}, async (_0x4f91c5, _0x2a7312, _0x36d212) => {
  const {
    repondre: _0x18c779,
    ms: _0x4c73a5
  } = _0x36d212;
  try {
    const _0x39f849 = await _0x2a7312.sendMessage(_0x4f91c5, {
      'text': "✊🏻 *STARTED...* 💦"
    });
    const _0x554a3a = ['💖', '💗', '💕', '❤️', '💛', '💚', '🫀', '💙', '💜', '🖤', '♥️', '🤍', '🤎', '💗', '💞', '💓', '💘', '💝', '♥️', '💟', '🫀', '❤️'];
    for (const _0x5257b9 of _0x554a3a) {
      await new Promise(_0x5b748c => setTimeout(_0x5b748c, 0x3e8));
      await _0x2a7312.relayMessage(_0x4f91c5, {
        'protocolMessage': {
          'key': _0x39f849.key,
          'type': 0xe,
          'editedMessage': {
            'conversation': _0x5257b9
          }
        }
      }, {});
    }
  } catch (_0x585f1f) {
    console.log(_0x585f1f);
    _0x18c779("❌ *Error!* " + _0x585f1f.message);
  }
});
zokou({
  'nomCom': "angry1",
  'categorie': 'fun',
  'reaction': '📽️'
}, async (_0x49e7c5, _0x3dfa89, _0x526d18) => {
  const {
    repondre: _0x3e5666,
    ms: _0x56dd03
  } = _0x526d18;
  try {
    const _0x226afc = await _0x3dfa89.sendMessage(_0x49e7c5, {
      'text': "✊🏻 *STARTED...* 💦"
    });
    const _0x458bd9 = ['😡', '😠', '🤬', '😤', '😾', '😡', '😠', '🤬', '😤', '😾'];
    for (const _0x1a5368 of _0x458bd9) {
      await new Promise(_0x58ae09 => setTimeout(_0x58ae09, 0x3e8));
      await _0x3dfa89.relayMessage(_0x49e7c5, {
        'protocolMessage': {
          'key': _0x226afc.key,
          'type': 0xe,
          'editedMessage': {
            'conversation': _0x1a5368
          }
        }
      }, {});
    }
  } catch (_0x5e0466) {
    console.log(_0x5e0466);
    _0x3e5666("❌ *Error!* " + _0x5e0466.message);
  }
});
zokou({
  'nomCom': "heartbroken",
  'aliases': ['heartbroken', "hrtbroken"],
  'categorie': "fun",
  'reaction': "📽️"
}, async (_0x420b0b, _0x28397e, _0xe63756) => {
  const {
    repondre: _0x355c77,
    ms: _0x1520fa
  } = _0xe63756;
  try {
    const _0x23037e = await _0x28397e.sendMessage(_0x420b0b, {
      'text': "✊🏻 *STARTED...* 💦"
    });
    const _0x16e79f = ['🥺', '😟', '😕', '😖', '😫', '🙁', '😩', '😥', '😓', '😪', '😢', '😔', '😞', '😭', '💔', '😭', '😿'];
    for (const _0x539133 of _0x16e79f) {
      await new Promise(_0x5977d0 => setTimeout(_0x5977d0, 0x3e8));
      await _0x28397e.relayMessage(_0x420b0b, {
        'protocolMessage': {
          'key': _0x23037e.key,
          'type': 0xe,
          'editedMessage': {
            'conversation': _0x539133
          }
        }
      }, {});
    }
  } catch (_0x2fb91a) {
    console.log(_0x2fb91a);
    _0x355c77("❌ *Error!* " + _0x2fb91a.message);
  }
});
zokou({
  'nomCom': 'shy',
  'aliases': ["shyoff", "shyy"],
  'categorie': "fun",
  'reaction': '🥺'
}, async (_0x2ab49a, _0x93ec93, _0x56c960) => {
  const {
    repondre: _0x544a32,
    ms: _0x5cfd1e
  } = _0x56c960;
  try {
    const _0x49bb5a = await _0x93ec93.sendMessage(_0x2ab49a, {
      'text': "✊🏻 *STARTED...* 💦"
    });
    const _0x120245 = ['😳', '😊', '😶', '🙈', '🙊', '😳', '😊', '😶', '🙈', '🙊'];
    for (const _0x3fe79f of _0x120245) {
      await new Promise(_0x6f929f => setTimeout(_0x6f929f, 0x3e8));
      await _0x93ec93.relayMessage(_0x2ab49a, {
        'protocolMessage': {
          'key': _0x49bb5a.key,
          'type': 0xe,
          'editedMessage': {
            'conversation': _0x3fe79f
          }
        }
      }, {});
    }
  } catch (_0x153e0b) {
    console.log(_0x153e0b);
    _0x544a32("❌ *Error!* " + _0x153e0b.message);
  }
});
zokou({
  'nomCom': "moon",
  'aliases': ['mon', 'crescent'],
  'categorie': "fun",
  'reaction': '🙃'
}, async (_0x34ac68, _0x172b98, _0x1fa98c) => {
  const {
    repondre: _0x1c8884,
    ms: _0x35ac16
  } = _0x1fa98c;
  try {
    const _0x57abee = await _0x172b98.sendMessage(_0x34ac68, {
      'text': "✊🏻 *STARTED...* 💦"
    });
    const _0x17829e = ['🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', "🌚🌝"];
    for (const _0x574728 of _0x17829e) {
      await new Promise(_0x1c30ce => setTimeout(_0x1c30ce, 0x3e8));
      await _0x172b98.relayMessage(_0x34ac68, {
        'protocolMessage': {
          'key': _0x57abee.key,
          'type': 0xe,
          'editedMessage': {
            'conversation': _0x574728
          }
        }
      }, {});
    }
  } catch (_0x2204e0) {
    console.log(_0x2204e0);
    _0x1c8884("❌ *Error!* " + _0x2204e0.message);
  }
});
zokou({
  'nomCom': 'nikal',
  'categorie': 'fun',
  'reaction': '🥱'
}, async (_0x3b5a1e, _0x466a9e, _0x11f10f) => {
  const {
    repondre: _0x21c950,
    ms: _0x5a424f
  } = _0x11f10f;
  try {
    const _0x3fe73f = await _0x466a9e.sendMessage(_0x3b5a1e, {
      'text': "✊🏻 *STARTED...* 💦"
    });
    const _0x399f4a = ["   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏          ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄   __        ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏          ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Lavde   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄  |__|     ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸   Pehli   ⡇\n ⣟⣿⡭     ⢱       ⣿  ⢹            ⡇\n  ⠙⢿⣯⠄  (P)       ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Fursat  ⡇\n ⣟⣿⡭     ⢱         ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄   __        ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Meeee   ⡇\n ⣟⣿⡭     ⢱         ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄  |__|      ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸           ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲   ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹            ⡇\n  ⠙⢿⣯⠄  lodu     ⡿  ⡇       ⡼\n   ⠹⣶⠆       ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸ "];
    for (const _0x4bb908 of _0x399f4a) {
      await new Promise(_0x448af6 => setTimeout(_0x448af6, 0x3e8));
      await _0x466a9e.relayMessage(_0x3b5a1e, {
        'protocolMessage': {
          'key': _0x3fe73f.key,
          'type': 0xe,
          'editedMessage': {
            'conversation': _0x4bb908
          }
        }
      }, {});
    }
  } catch (_0x48947d) {
    console.log(_0x48947d);
    _0x21c950("❌ *Error!* " + _0x48947d.message);
  }
});
zokou({
  'nomCom': "advice",
  'aliases': ["wisdom", "wise"],
  'reaction': "🗨️",
  'categorie': "Fun"
}, async (_0x4e6f1b, _0xb29356, _0x21defe) => {
  const {
    reply: _0x2f1a66,
    ms: _0x3f111e
  } = _0x21defe;
  try {
    const _0x101f33 = await axios.get("https://api.adviceslip.com/advice");
    const _0x4e92ee = _0x101f33.data.slip.advice;
    await _0xb29356.sendMessage(_0x4e6f1b, {
      'text': "Here is your advice: " + _0x4e92ee + " 😊",
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363295141350550@newsletter",
          'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
          'serverMessageId': 0x8f
        },
        'externalAdReply': {
          'title': "Daily Dose of Advice",
          'body': "Here’s a little nugget of wisdom to brighten your day!",
          'thumbnailUrl': conf.URL,
          'sourceUrl': conf.GURL,
          'mediaType': 0x1
        }
      }
    }, {
      'quoted': _0x3f111e
    });
  } catch (_0x555edb) {
    console.error("Error fetching advice:", _0x555edb.message || "An error occurred");
    await _0x2f1a66("Oops, an error occurred while processing your request.");
  }
});
zokou({
  'nomCom': "trivia",
  'reaction': '🤔',
  'categorie': "Fun"
}, async (_0x1c520b, _0x3d374b, _0x47c680) => {
  const {
    reply: _0x28f169,
    prefix: _0x552372,
    ms: _0x45467c
  } = _0x47c680;
  try {
    const _0x1fc469 = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
    if (_0x1fc469.status !== 0xc8) {
      return _0x28f169("Invalid response from the trivia API. Status code: " + _0x1fc469.status);
    }
    const _0x1a63ef = _0x1fc469.data.results[0x0];
    const _0x2001d5 = _0x1a63ef.question;
    const _0x376d01 = _0x1a63ef.correct_answer;
    const _0x53329b = [..._0x1a63ef.incorrect_answers, _0x376d01].sort();
    const _0x551c11 = _0x53329b.map((_0x284808, _0x5b9685) => _0x5b9685 + 0x1 + ". " + _0x284808).join("\n");
    await _0x3d374b.sendMessage(_0x1c520b, {
      'text': "Here's a trivia question for you: \n\n" + _0x2001d5 + "\n\n" + _0x551c11 + "\n\nI will send the correct answer in 10 seconds...",
      'contextInfo': {
        'externalAdReply': {
          'title': "Trivia Time!",
          'body': "Challenge yourself with this fun trivia question!",
          'thumbnailUrl': conf.URL,
          'sourceUrl': conf.GURL,
          'mediaType': 0x1,
          'showAdAttribution': true
        }
      }
    }, {
      'quoted': _0x45467c
    });
    setTimeout(async () => {
      await _0x3d374b.sendMessage(_0x1c520b, {
        'text': "The correct answer is: " + _0x376d01,
        'contextInfo': {
          'forwardingScore': 0x3e7,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': "120363295141350550@newsletter",
            'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
            'serverMessageId': 0x8f
          },
          'externalAdReply': {
            'title': "Trivia Answer Revealed",
            'body': "Did you get it right? Try another trivia question!",
            'thumbnailUrl': conf.URL,
            'sourceUrl': conf.GURL,
            'mediaType': 0x1
          }
        }
      }, {
        'quoted': _0x45467c
      });
    }, 0x2710);
  } catch (_0x150705) {
    console.error("Error getting trivia:", _0x150705.message);
    await _0x3d374b.sendMessage(_0x1c520b, {
      'text': "Error getting trivia. Please try again later.",
      'contextInfo': {
        'externalAdReply': {
          'title': "Trivia Error",
          'body': "There was an error retrieving the trivia question. Please try again.",
          'thumbnailUrl': conf.URL,
          'sourceUrl': conf.GURL,
          'mediaType': 0x1,
          'showAdAttribution': true
        }
      }
    }, {
      'quoted': _0x45467c
    });
  }
});
zokou({
  'nomCom': 'define',
  'aliases': ["dictionary", "dict", 'def'],
  'reaction': '😁',
  'categorie': "Search"
}, async (_0x32183a, _0xa5573c, _0x49e3d7) => {
  const {
    repondre: _0x4449b,
    arg: _0x2c4ab7,
    ms: _0x2132a3
  } = _0x49e3d7;
  const _0x33b95d = _0x2c4ab7.join(" ");
  if (!_0x33b95d) {
    return _0x4449b("Please provide a term to define.");
  }
  try {
    const {
      data: _0x36a5f5
    } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x33b95d);
    const _0x42f5df = _0x36a5f5.list[0x0];
    if (_0x42f5df) {
      const _0x2142e7 = "\n        Word: " + _0x33b95d + "\n        Definition: " + _0x42f5df.definition.replace(/\[|\]/g, '') + "\n        Example: " + _0x42f5df.example.replace(/\[|\]/g, '') + "\n      ";
      await _0xa5573c.sendMessage(_0x32183a, {
        'text': _0x2142e7,
        'contextInfo': {
          'forwardingScore': 0x3e7,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': '120363295141350550@newsletter',
            'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 V²",
            'serverMessageId': 0x8f
          },
          'externalAdReply': {
            'title': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 V² DICTIONARY",
            'body': "Definition of " + _0x33b95d,
            'mediaType': 0x1,
            'thumbnailUrl': 'https://files.catbox.moe/28j7yx.jpg',
            'sourceUrl': conf.GURL
          }
        }
      }, {
        'quoted': _0x2132a3
      });
    } else {
      return _0x4449b("No result found for \"" + _0x33b95d + "\".");
    }
  } catch (_0x28d5fd) {
    console.error(_0x28d5fd);
    return _0x4449b("An error occurred while fetching the definition.");
  }
});
zokou({
  'nomCom': "code",
  'aliases': ["session", 'pair', "paircode", "qrcode"],
  'reaction': '💫',
  'categorie': "system"
}, async (_0x28a2d7, _0xd018e9, _0x2ce9ff) => {
  const {
    repondre: _0xe0dae8,
    arg: _0x568580,
    ms: _0x3d5490
  } = _0x2ce9ff;
  if (!_0x568580 || _0x568580.length === 0x0) {
    return _0xe0dae8("Example Usage: .code 2556737xxxxx.");
  }
  try {
    await _0xe0dae8("```Wait 𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 is getting your pair code ❤️💚...```");
    const _0x51d7a1 = encodeURIComponent(_0x568580.join(" "));
    const _0x9c0646 = 'https://alone-md-nkds.onrender.com/code?number=' + _0x51d7a1;
    const _0x1a8461 = await axios.get(_0x9c0646);
    const _0x943e63 = _0x1a8461.data;
    if (_0x943e63 && _0x943e63.code) {
      const _0x16a73f = _0x943e63.code;
      await _0xd018e9.sendMessage(_0x28a2d7, {
        'text': _0x16a73f,
        'contextInfo': {
          'forwardingScore': 0x3e7,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': "120363295141350550@newsletter",
            'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
            'serverMessageId': 0x8f
          },
          'externalAdReply': {
            'title': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 V²PAIR CODE",
            'body': "Here is your pairing code:",
            'mediaType': 0x1,
            'thumbnailUrl': conf.URL,
            'sourceUrl': conf.GURL
          }
        }
      }, {
        'quoted': _0x3d5490
      });
      await _0xe0dae8("Here is your pair code, copy and paste it to the notification above or link devices.");
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (_0x9488dd) {
    console.error("Error getting API response:", _0x9488dd.message);
    _0xe0dae8("Error getting response from API.");
  }
});
zokou({
  'nomCom': 'element',
  'reaction': '📓',
  'categorie': "search"
}, async (_0x586688, _0x3ece79, _0x3a900e) => {
  const {
    repondre: _0x42545a,
    arg: _0x59a9c1,
    ms: _0x45af5d
  } = _0x3a900e;
  const _0x53b14e = _0x59a9c1.join(" ").trim();
  if (!_0x53b14e) {
    return _0x42545a("Please provide an element symbol or name.");
  }
  try {
    const _0x26e6c5 = await axios.get("https://api.popcat.xyz/periodic-table?element=" + _0x53b14e);
    if (!_0x26e6c5.data) {
      return _0x42545a("Could not find information for the provided element. Please check the symbol or name.");
    }
    const _0x247bf5 = _0x26e6c5.data;
    const _0x134f5a = _0x247bf5.image;
    const _0x393453 = "\n*Alone Md Element Information:*\n🚀 *Name:* " + _0x247bf5.name + "\n🚀 *Symbol:* " + _0x247bf5.symbol + "\n🚀 *Atomic Number:* " + _0x247bf5.atomic_number + "\n🚀 *Atomic Mass:* " + _0x247bf5.atomic_mass + "\n🚀 *Period:* " + _0x247bf5.period + "\n🚀 *Phase:* " + _0x247bf5.phase + "\n🚀 *Discovered By:* " + _0x247bf5.discovered_by + "\n🚀 *Summary:* " + _0x247bf5.summary + "\n   \nRegards " + conf.BOT + " ";
    await _0x3ece79.sendMessage(_0x586688, {
      'text': _0x393453,
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363295141350550@newsletter",
          'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 V²",
          'serverMessageId': 0x8f
        },
        'externalAdReply': {
          'title': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 V²ELEMENT INFORMATION",
          'body': "Here is the information you requested:",
          'mediaType': 0x1,
          'thumbnailUrl': _0x134f5a,
          'sourceUrl': conf.GURL
        }
      }
    }, {
      'quoted': _0x45af5d
    });
  } catch (_0x2007d2) {
    console.error("Error fetching the element data:", _0x2007d2);
    _0x42545a("An error occurred while fetching the element data. Please try again later.");
  }
});
zokou({
  'nomCom': "github",
  'aliases': ['git'],
  'reaction': '💻',
  'categorie': "Search"
}, async (_0x2c1c24, _0xfb7077, _0x79cf70) => {
  const {
    repondre: _0x134028,
    arg: _0x5941ff,
    ms: _0x46a293
  } = _0x79cf70;
  const _0x5470eb = _0x5941ff.join(" ");
  if (!_0x5470eb) {
    return _0x134028("Give me a valid GitHub username like: github 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏");
  }
  try {
    const _0x1fe339 = await axios.get('https://api.github.com/users/' + _0x5470eb);
    const _0xc7b882 = _0x1fe339.data;
    if (_0xc7b882.message === "Not Found") {
      return _0x134028("User " + _0x5470eb + " not found.");
    }
    const _0x34fa58 = _0xc7b882.avatar_url;
    const _0x25c6dc = "\n°GITHUB USER INFO°\n🚩 Id: " + _0xc7b882.id + "\n🔖 Name: " + _0xc7b882.name + "\n🔖 Username: " + _0xc7b882.login + "\n✨ Bio: " + _0xc7b882.bio + "\n🏢 Company: " + _0xc7b882.company + "\n📍 Location: " + _0xc7b882.location + "\n📧 Email: " + (_0xc7b882.email || "Not provided") + "\n📰 Blog: " + (_0xc7b882.blog || "Not provided") + "\n🔓 Public Repos: " + _0xc7b882.public_repos + "\n🔐 Public Gists: " + _0xc7b882.public_gists + "\n👪 Followers: " + _0xc7b882.followers + "\n🫶 Following: " + _0xc7b882.following + "\n";
    await _0xfb7077.sendMessage(_0x2c1c24, {
      'text': _0x25c6dc,
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363295141350550@newsletter",
          'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
          'serverMessageId': 0x8f
        },
        'externalAdReply': {
          'title': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 GITHUB USER INFO",
          'body': "Information about " + _0xc7b882.login,
          'mediaType': 0x1,
          'thumbnailUrl': _0x34fa58,
          'sourceUrl': conf.GURL
        }
      }
    }, {
      'quoted': _0x46a293
    });
  } catch (_0x4a308b) {
    console.error("Error fetching GitHub user data:", _0x4a308b);
    await _0x134028("An error occurred while fetching GitHub user data.");
  }
});
zokou({
  'nomCom': "tempmail",
  'aliases': ["mail", "temp"],
  'reaction': '💞',
  'categorie': "General"
}, async (_0x1568a0, _0x4b22dd, _0x2fed5f) => {
  const {
    repondre: _0x3d4bd2,
    prefix: _0x49fae2,
    ms: _0x258be7
  } = _0x2fed5f;
  try {
    const _0x33bf11 = Math.random().toString(0x24).substring(0x2, 0xe) + "@1secmail.com";
    await _0x4b22dd.sendMessage(_0x1568a0, {
      'text': "Your temporary email is: " + _0x33bf11 + "\n\nYou can use this email for temporary purposes. I will notify you if you receive any emails.",
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': '120363295141350550@newsletter',
          'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
          'serverMessageId': 0x8f
        },
        'externalAdReply': {
          'title': "Temporary Email Service",
          'body': "Create temporary emails quickly and easily for privacy and security.",
          'thumbnailUrl': conf.URL,
          'sourceUrl': conf.GURL,
          'mediaType': 0x1
        }
      }
    }, {
      'quoted': _0x258be7
    });
    const _0x478c4c = async () => {
      try {
        const _0x19a2ee = await axios.get("https://www.1secmail.com/api/v1/?action=getMessages&login=" + _0x33bf11 + "&domain=1secmail.com");
        const _0x47dd95 = _0x19a2ee.data;
        if (_0x47dd95.length > 0x0) {
          for (const _0x13f745 of _0x47dd95) {
            const _0x88b22b = await axios.get('https://www.1secmail.com/api/v1/?action=readMessage&login=' + _0x33bf11 + '&domain=1secmail.com&id=' + _0x13f745.id);
            const _0x37aa52 = _0x88b22b.data;
            const _0x2b5f8e = _0x37aa52.textBody.match(/(https?:\/\/[^\s]+)/g);
            const _0x1215ef = _0x2b5f8e ? _0x2b5f8e.join("\n") : "No links found in the email content.";
            await _0x4b22dd.sendMessage(_0x1568a0, {
              'text': "You have received a new email!\n\nFrom: " + _0x37aa52.from + "\nSubject: " + _0x37aa52.subject + "\n\n" + _0x37aa52.textBody + "\nLinks found:\n" + _0x1215ef,
              'contextInfo': {
                'forwardingScore': 0x3e7,
                'isForwarded': true,
                'forwardedNewsletterMessageInfo': {
                  'newsletterJid': "120363295141350550@newsletter",
                  'newsletterName': "ALONE Queen MD V²",
                  'serverMessageId': 0x8f
                },
                'externalAdReply': {
                  'title': "Temporary Email Notification",
                  'body': "You received a new email on your temporary inbox. Check it out now!",
                  'thumbnailUrl': conf.URL,
                  'sourceUrl': conf.GURL,
                  'mediaType': 0x1
                }
              }
            }, {
              'quoted': _0x258be7
            });
          }
        }
      } catch (_0x7153b5) {
        console.error("Error checking temporary email:", _0x7153b5.message);
      }
    };
    const _0x33afe2 = setInterval(_0x478c4c, 0x7530);
    setTimeout(() => {
      clearInterval(_0x33afe2);
      _0x4b22dd.sendMessage(_0x1568a0, {
        'text': "Your temporary email session has ended. Please create a new temporary email if needed.",
        'contextInfo': {
          'forwardingScore': 0x3e7,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': "120363295141350550@newsletter",
            'newsletterName': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
            'serverMessageId': 0x8f
          },
          'externalAdReply': {
            'title': "Temporary Email Session Ended",
            'body': "Your temporary email session has ended. Need another one? Just ask!",
            'thumbnailUrl': conf.URL,
            'sourceUrl': conf.GURL,
            'mediaType': 0x1
          }
        }
      }, {
        'quoted': _0x258be7
      });
    }, 0x927c0);
  } catch (_0x5f582b) {
    console.error("Error generating temporary email:", _0x5f582b.message);
    await _0x4b22dd.sendMessage(_0x1568a0, {
      'text': "Error generating temporary email. Please try again later.",
      'contextInfo': {
        'externalAdReply': {
          'title': "Temporary Email Error",
          'body': "There was an issue generating your temporary email. Please try again later.",
          'thumbnailUrl': conf.URL,
          'sourceUrl': conf.GURL,
          'mediaType': 0x1,
          'showAdAttribution': true
        }
      }
    }, {
      'quoted': _0x258be7
    });
  }
});
zokou({
  'nomCom': 'wiki',
  'aliases': ["wikipedia", "wikipeda"],
  'reaction': '❤️',
  'categorie': 'search'
}, async (_0x12d017, _0x3e12d0, _0x37ef62) => {
  const {
    repondre: _0x1e714b,
    arg: _0x8d8408,
    ms: _0x19116b
  } = _0x37ef62;
  const _0x12ace0 = _0x8d8408.join(" ").trim();
  try {
    if (!_0x12ace0) {
      return _0x1e714b("Provide the term to search,\nE.g What is JavaScript!");
    }
    const _0x11895a = await wiki.summary(_0x12ace0);
    const _0x426ae2 = "\n*📚 Wikipedia Summary 📚*\n\n🔍 *Title*: _" + _0x11895a.title + "_\n\n📝 *Description*: _" + _0x11895a.description + "_\n\n💬 *Summary*: _" + _0x11895a.extract + "_\n\n🔗 *URL*: " + _0x11895a.content_urls.mobile.page + "\n\n> Powered by 𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n    ";
    _0x1e714b(_0x426ae2);
  } catch (_0x503a84) {
    console.error(_0x503a84);
    _0x1e714b("Got 404. I did not find anything!");
  }
});
