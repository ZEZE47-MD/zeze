const { zokou } = require("../framework/zokou");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien");
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bdd/antibot");
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');
const cron = require("../bdd/cron");
const { exec } = require("child_process");
const spamTracker = {}; // In-memory spam tracker  

zokou({ nomCom: "antispam", categorie: "Group", reaction: "⛔" }, async (dest, zk, commandeOptions) => {  
  try {
    const { repondre, auteurMessage, verifGroupe, nomAuteurMessage, args, messageId } = commandeOptions;  

    if (!verifGroupe) return await zk.sendMessage(dest, { text: "This command only works in groups." });  

    // Parse optional action argument: warn, remove, or default to delete spam messages
    const action = args && args[0] ? args[0].toLowerCase() : "delete";

    const contextInfo = {  
      forwardingScore: 999,  
      isForwarded: true,  
      forwardedNewsletterMessageInfo: {  
        newsletterJid: "120363295141350550@newsletter",  
        newsletterName: "ZEZE47 MD V²",  
        serverMessageId: 143,  
      },  
      externalAdReply: {  
        title: "❌🚫ZEZE47 MD SPAM HANDLER‼️",  
        body: "Keeps your group clean and smooth.",  
        thumbnailUrl: conf.URL,  
        sourceUrl: conf.GURL,  
        mediaType: 1,  
      },  
    };  

    const send = async (msg, mentions = []) => {
      await zk.sendMessage(dest, { text: msg, contextInfo, mentions });
    };

    const now = Date.now();  
    const userId = auteurMessage;  

    if (!spamTracker[userId]) {  
      spamTracker[userId] = { count: 1, lastMsg: now };  
    } else {  
      const diff = now - spamTracker[userId].lastMsg;  

      if (diff < 5000) {  
        spamTracker[userId].count += 1;  
      } else {  
        spamTracker[userId].count = 1;  
      }  

      spamTracker[userId].lastMsg = now;  
    }  

    if (spamTracker[userId].count >= 4) {  
      switch(action) {
        case "remove":
          await send(`⚠️ @${userId.split("@")[0]} is spamming and will be removed!`, [userId]);
          await zk.groupParticipantsUpdate(dest, [userId], "remove");
          break;

        case "warn":
          await send(`⚠️ @${userId.split("@")[0]} is spamming!\nFurther violations may result in removal or mute.`, [userId]);
          break;

        case "delete":
        default:
          // Delete the spam message(s)
          // Here we delete the current spam message; you can extend to delete multiple messages if you track them
          await zk.messageDelete(dest, [messageId]);
          await send(`Deleted spam message from @${userId.split("@")[0]}.`, [userId]);
          break;
      }
    }
  } catch (error) {
    console.error("Error in antispam handler:", error);
  }
});

zokou({ nomCom: "tagal", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  // Ensure command is for a group
  if (!verifGroupe) { 
    repondre("😩you can only use this command in groups ❌"); 
    return; 
  }

  // If no message argument, set a default message
  let mess = arg && arg.trim() ? arg.join(' ') : 'Aucun Message';

  // Get group participants if it's a group
  let membresGroupe = verifGroupe ? await infosGroupe.participants : [];

  // Prepare the initial message tag
  let tag = `========================\n  
        🌟 *ZEZE47-MD V²* 🌟
========================\n
👥 Group : ${nomGroupe} 🚀 
👤 Author : *${nomAuteurMessage}* 👋 
📜 Message : *${mess}* 📝
========================\n\n`;

  // Emoji array and random selection logic
  const emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$', '😟', '🥵', '🐅'];
  const random = Math.floor(Math.random() * emoji.length); // Fixed random calculation

  // Loop through the group members, numbering them from 1 to last
  membresGroupe.forEach((membre, index) => {
    tag += `${index + 1}. ${emoji[random]} @${membre.id.split("@")[0]}\n`;
  });

  // Send the message if user is an admin or super user
  if (verifAdmin || superUser) {
    zk.sendMessage(dest, { text: tag, mentions: membresGroupe.map(m => m.id) }, { quoted: ms });
  } else {
    repondre('command reserved for admins');
  }
});

zokou({ nomCom: "invite", categorie: 'Group', reaction: "😌" }, async (dest, zk, commandeOptions) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = commandeOptions;
  if (!verifGroupe) {
    return repondre("haha.. do you mean the group link here ..stop joking ");
  }

  const link = await zk.groupInviteCode(dest);
  const lien = `https://chat.whatsapp.com/${link}`;
  const mess = `Hello ${nomAuteurMessage}, here is the group link of ${nomGroupe} \n\nClick Here To Join: ${lien}`;
  repondre(mess);
});

/** Promote a member to admin */

const stickers = [
  'https://files.catbox.moe/kbue6l.webp',
  'https://files.catbox.moe/vel483.webp',
  'https://files.catbox.moe/kbue6l.webp'
];

/** ***fin démettre**** **/
/** **retirer** */
zokou({ nomCom: "remove", categorie: "Group", reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let {
    msgRepondu,
    infosGroupe,
    auteurMsgRepondu,
    verifGroupe,
    nomAuteurMessage,
    auteurMessage,
    superUser,
    idBot
  } = commandeOptions;

  const context = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363295141350550@newsletter",
      newsletterName: "ZEZE47 MD V²",
      serverMessageId: 143
    },
    externalAdReply: {
      title: "❗ZEZE47 MD REMOVER☠️",
      body: "📲Follow for updates!",
      thumbnailUrl: conf.URL,
      sourceUrl: conf.GURL,
      mediaType: 1
    }
  };

  const send = (text) => zk.sendMessage(dest, { text, contextInfo: context });

  if (!verifGroupe) return send("for groups only");

  let membresGroupe = await infosGroupe.participants;

  const isMember = (user) => membresGroupe.some((m) => m.id === user);
  const getAdmins = (membres) => membres.filter((m) => m.admin).map((m) => m.id);

  const adminList = getAdmins(membresGroupe);
  const isTargetAdmin = adminList.includes(auteurMsgRepondu);
  const isBotAdmin = adminList.includes(idBot);
  const isAuthorAdmin = adminList.includes(auteurMessage);
  const isTargetInGroup = isMember(auteurMsgRepondu);

  try {
    if (isAuthorAdmin || superUser) {
      if (msgRepondu) {
        if (isBotAdmin) {
          if (isTargetInGroup) {
            if (!isTargetAdmin) {
              const stickerUrl = stickers[Math.floor(Math.random() * stickers.length)];
              const sticker = new Sticker(stickerUrl, {
                pack: "ZEZE47-MD",
                author: nomAuteurMessage,
                type: StickerTypes.FULL,
                categories: ["🤩", "🎉"],
                id: "12345",
                quality: 50,
                background: "#000000"
              });

              await sticker.toFile("st.webp");

              const txt = `@${auteurMsgRepondu.split("@")[0]} was removed from the group.\n`;

              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");

              await zk.sendMessage(dest, {
                text: txt,
                mentions: [auteurMsgRepondu],
                contextInfo: context
              });

              await zk.sendMessage(dest, {
                sticker: fs.readFileSync("st.webp")
              }, { quoted: msgRepondu });
            } else {
              return send("This member cannot be removed because he is an administrator of the group.");
            }
          } else {
            return send("This user is not part of the group.");
          }
        } else {
          return send("Sorry, I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        return send("Please tag the member to be removed.");
      }
    } else {
      return send("Sorry, I cannot perform this action because you are not an administrator of the group.");
    }
  } catch (e) {
    return send("Oops " + e);
  }
});

zokou({
  'nomCom': "broadcast",
  'aliases': ['bc', "cast"],
  'reaction': '🚀',
  'categorie': 'General'
}, async (_0x323461, _0x4cdb8c, _0x4c87e6) => {
  const {
    ms: _0x54b6b4,
    repondre: _0xb269b7,
    arg: _0x17b399,
    nomAuteurMessage: _0x271224,
    superUser: _0x291ccf
  } = _0x4c87e6;
  let _0x1360fc = _0x17b399.join(" ");
  if (!_0x17b399[0x0]) {
    _0xb269b7("After the command *broadcast*, type your message to be sent to all groups you are in💀,,,.");
    return;
  }
  if (!_0x291ccf) {
    _0xb269b7("hey you!! fuck off i can't broadcast your message");
    return;
  }
  let _0x52c320 = await _0x4cdb8c.groupFetchAllParticipating();
  let _0x254221 = Object.entries(_0x52c320).slice(0x0).map(_0x35bfa1 => _0x35bfa1[0x1]);
  let _0x115598 = _0x254221.map(_0x6b0f9 => _0x6b0f9.id);
  await _0xb269b7("*ZEZE47-MD is sending this message to all groups you are in*...");
  for (let _0x398282 of _0x115598) {
    let _0x25a35f = "‼️‼️ZEZE47-𝐌𝐃 V² 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓️‼️️‼️\n\n❗*message* : " + _0x1360fc + "\n\n️‼️ *Author*: " + _0x271224;
    await _0x4cdb8c.sendMessage(_0x398282, {
      'image': {
        'url': "https://files.catbox.moe/4tu6s0.jpg"
      },
      'caption': '' + _0x25a35f
    });
  }
});
zokou({
  'nomCom': "disap-off",
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x1f053f, _0x40fcb7, _0x521ba1) => {
  const {
    ms: _0x4f524c,
    repondre: _0x331c17,
    arg: _0x2634cc,
    verifGroupe: _0x579411,
    nomGroupe: _0x441450,
    infosGroupe: _0x9588f8,
    nomAuteurMessage: _0x28b6f4,
    verifAdmin: _0x256b35,
    superUser: _0x29b8fc
  } = _0x521ba1;
  if (!_0x579411) {
    _0x331c17("This command works in groups only");
    return;
  }
  ;
  if (!_0x256b35) {
    _0x331c17("You are not an admin here!");
    return;
  }
  ;
  await _0x40fcb7.groupToggleEphemeral(_0x1f053f, 0x0);
  _0x331c17("Dissapearing messages successfully turned off!");
});
zokou({
  'nomCom': "disap",
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x541352, _0x3aeb98, _0x44eb36) => {
  const {
    ms: _0x193b28,
    repondre: _0x59b8c1,
    arg: _0x28473d,
    verifGroupe: _0xc3435d,
    nomGroupe: _0x4683a9,
    infosGroupe: _0x5c3552,
    nomAuteurMessage: _0x309bce,
    verifAdmin: _0x2ed7b0,
    superUser: _0x3fd9b9
  } = _0x44eb36;
  if (!_0xc3435d) {
    _0x59b8c1("This command works in groups only");
    return;
  }
  ;
  if (!_0x2ed7b0) {
    _0x59b8c1("You are not an admin here!");
    return;
  }
  ;
  _0x59b8c1("*Do you want to turn on disappearing messages?*\n\nIf yes type _*disap1* for messages to disappear after 1 day._\n_or *disap7* for messages to disappear after 7 days._\n_or *disap90* for messages to disappear after 90 days._\n\n To turn in off, type *disap-off*");
});
zokou({
  'nomCom': "req",
  'categorie': 'Group',
  'reaction': '👹'
}, async (_0x3f37d6, _0x3d6273, _0x16b776) => {
  const {
    ms: _0xb9a750,
    repondre: _0x31754e,
    arg: _0x12666e,
    verifGroupe: _0x28f964,
    nomGroupe: _0x53e2e0,
    infosGroupe: _0x3bff2d,
    nomAuteurMessage: _0x400ed4,
    verifAdmin: _0x24be95,
    superUser: _0x557f97
  } = _0x16b776;
  if (!_0x28f964) {
    _0x31754e("This command works in groups only");
    return;
  }
  ;
  if (!_0x24be95) {
    _0x31754e("You are not an admin here, what will you do if there are pending requests?!");
    return;
  }
  ;
  const _0x47a8dc = await _0x3d6273.groupRequestParticipantsList(_0x3f37d6);
  if (_0x47a8dc.length === 0x0) {
    return _0x31754e("there are no pending join requests.");
  }
  let _0x4143c3 = '';
  _0x47a8dc.forEach((_0x153f0a, _0x52939c) => {
    _0x4143c3 += '+' + _0x153f0a.jid.split('@')[0x0];
    if (_0x52939c < _0x47a8dc.length - 0x1) {
      _0x4143c3 += "\n";
    }
  });
  _0x3d6273.sendMessage(_0x3f37d6, {
    'text': "Pending Participants:- 🕓\n" + _0x4143c3 + "\n\nUse the command approve or reject to approve or reject these join requests."
  });
  _0x31754e(_0x4143c3);
});
zokou({
  'nomCom': 'disap90',
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x58e845, _0x202cf5, _0x2bdac3) => {
  const {
    ms: _0x57db2c,
    repondre: _0x5f3128,
    arg: _0x3d77a8,
    verifGroupe: _0x2c2a4b,
    nomGroupe: _0x257f19,
    infosGroupe: _0x3f3b71,
    nomAuteurMessage: _0x37fb1a,
    verifAdmin: _0x51a02a,
    superUser: _0xcdccad
  } = _0x2bdac3;
  if (!_0x2c2a4b) {
    _0x5f3128("This command works in groups only");
    return;
  }
  ;
  if (!_0x51a02a) {
    _0x5f3128("You are not an admin here!");
    return;
  }
  ;
  await _0x202cf5.groupToggleEphemeral(_0x58e845, 0x76a700);
  _0x58e845("Dissapearing messages successfully turned on for 90 days!");
});
zokou({
  'nomCom': "reject",
  'aliases': ["rejectall", "rej", "reject-all"],
  'categorie': "Group",
  'reaction': '👹'
}, async (_0x1ca2e8, _0x2c301e, _0x483ebc) => {
  const {
    repondre: _0x241d6c,
    verifGroupe: _0x599a8e,
    verifAdmin: _0x377b7b
  } = _0x483ebc;
  if (!_0x599a8e) {
    _0x241d6c("This command works in groups only");
    return;
  }
  if (!_0x377b7b) {
    _0x241d6c("You are not an admin here!");
    return;
  }
  const _0x131a72 = await _0x2c301e.groupRequestParticipantsList(_0x1ca2e8);
  if (_0x131a72.length === 0x0) {
    return _0x241d6c("There are no pending join requests for this group.");
  }
  for (const _0x1d01ca of _0x131a72) {
    const _0x24fec1 = await _0x2c301e.groupRequestParticipantsUpdate(_0x1ca2e8, [_0x1d01ca.jid], "reject");
    console.log(_0x24fec1);
  }
  _0x241d6c("All pending join requests have been rejected.");
});
zokou({
  'nomCom': 'disap7',
  'categorie': "Group",
  'reaction': '😂'
}, async (_0xdb7461, _0x152ba7, _0x3f9021) => {
  const {
    ms: _0x1f5ca5,
    repondre: _0x22ec79,
    arg: _0x9e9021,
    verifGroupe: _0x1828ed,
    nomGroupe: _0x1e981d,
    infosGroupe: _0x21cc83,
    nomAuteurMessage: _0x29176e,
    verifAdmin: _0x533a23,
    superUser: _0x247ddd
  } = _0x3f9021;
  if (!_0x1828ed) {
    _0x22ec79("This command works in groups only");
    return;
  }
  ;
  if (!_0x533a23) {
    _0x22ec79("You are not an admin here!");
    return;
  }
  ;
  await _0x152ba7.groupToggleEphemeral(_0xdb7461, 0x93a80);
  _0xdb7461("Dissapearing messages successfully turned on for 7 days!");
});
zokou({
  'nomCom': "disap1",
  'categorie': "Group",
  'reaction': '😂'
}, async (_0x5c9d47, _0x445664, _0x4266de) => {
  const {
    ms: _0x5a95d5,
    repondre: _0x569e5a,
    arg: _0x2f6dd1,
    verifGroupe: _0x5ad8b0,
    nomGroupe: _0x3cb0f5,
    infosGroupe: _0x1da057,
    nomAuteurMessage: _0x20e12e,
    verifAdmin: _0x1906b2,
    superUser: _0x2fe79c
  } = _0x4266de;
  if (!_0x5ad8b0) {
    _0x569e5a("This command works in groups only");
    return;
  }
  ;
  if (!_0x1906b2) {
    _0x569e5a("You are not an admin here!");
    return;
  }
  ;
  await _0x445664.groupToggleEphemeral(_0x5c9d47, 0x15180);
  _0x5c9d47("Dissapearing messages successfully turned on for 24 hours");
});
zokou({
  'nomCom': 'approve',
  'aliases': ["approve-all", "accept"],
  'categorie': "Group",
  'reaction': '💯'
}, async (_0x43946b, _0x2c3517, _0x3f224a) => {
  const {
    repondre: _0x298913,
    verifGroupe: _0x208f8e,
    verifAdmin: _0x43a6a3
  } = _0x3f224a;
  if (!_0x208f8e) {
    _0x298913("This command works in groups only");
    return;
  }
  if (!_0x43a6a3) {
    _0x298913("You are not an admin here!");
    return;
  }
  const _0x2bc3fc = await _0x2c3517.groupRequestParticipantsList(_0x43946b);
  if (_0x2bc3fc.length === 0x0) {
    return _0x298913("There are no pending join requests.");
  }
  for (const _0x5dcd51 of _0x2bc3fc) {
    const _0x9a395b = await _0x2c3517.groupRequestParticipantsUpdate(_0x43946b, [_0x5dcd51.jid], 'approve');
    console.log(_0x9a395b);
  }
  _0x298913("All pending participants have been approved to join.");
});
zokou({
  'nomCom': "vcf",
  'aliases': ["savecontact", "savecontacts"],
  'categorie': "Group",
  'reaction': '⬇️'
}, async (_0x1ec21c, _0xbcbdad, _0x341fdd) => {
  const {
    repondre: _0x2e5b52,
    verifGroupe: _0x1214da,
    verifAdmin: _0xb6471,
    ms: _0x48a83b
  } = _0x341fdd;
  const _0x511dab = require('fs');
  if (!_0xb6471) {
    _0x2e5b52("You are not an admin here!");
    return;
  }
  if (!_0x1214da) {
    _0x2e5b52("This command works in groups only");
    return;
  }
  try {
    let _0x38463f = await _0xbcbdad.groupMetadata(_0x1ec21c);
    const _0x267c2d = await _0x38463f.participants;
    let _0x4a6ecd = '';
    for (let _0x269fcd of _0x267c2d) {
      let _0x23a8f8 = _0x269fcd.id.split('@')[0x0];
      let _0x5838c2 = _0x269fcd.name || _0x269fcd.notify || "[ALPHA] +" + _0x23a8f8;
      _0x4a6ecd += "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x5838c2 + "\nTEL;type=CELL;type=VOICE;waid=" + _0x23a8f8 + ':+' + _0x23a8f8 + "\nEND:VCARD\n";
    }
    await _0x2e5b52("A moment, *ZEZE47-MD* is compiling " + _0x267c2d.length + " contacts into a vcf...");
    await _0x511dab.writeFileSync("./contacts.vcf", _0x4a6ecd.trim());
    await _0xbcbdad.sendMessage(_0x1ec21c, {
      'document': _0x511dab.readFileSync("./contacts.vcf"),
      'mimetype': "text/vcard",
      'fileName': _0x38463f.subject + '.Vcf',
      'caption': "VCF for " + _0x38463f.subject + "\nTotal Contacts: " + _0x267c2d.length + "\n*KEEP USING ALONE-MD*"
    }, {
      'ephemeralExpiration': 0x15180,
      'quoted': _0x48a83b
    });
    _0x511dab.unlinkSync('./contacts.vcf');
  } catch (_0x525d8e) {
    console.error("Error while creating or sending VCF:", _0x525d8e.message || _0x525d8e);
    _0x2e5b52("An error occurred while creating or sending the VCF. Please try again.");
  }
});
zokou({
  'nomCom': 'tagall',
  'categorie': 'Group',
  'reaction': '🏆'
}, async (_0x1739ca, _0x1dbf9d, _0x3278d3) => {
  const {
    ms: _0x369ce8,
    repondre: _0x67f29a,
    arg: _0xec84a0,
    verifGroupe: _0x57abcf,
    nomGroupe: _0x2b3359,
    infosGroupe: _0x42f894,
    nomAuteurMessage: _0x2b0f5a,
    verifAdmin: _0x5802a6,
    superUser: _0x3da57d
  } = _0x3278d3;
  if (!_0x57abcf) {
    _0x67f29a("✋🏿 ✋🏿this command works in groups only ❌");
    return;
  }
  if (!_0xec84a0 || _0xec84a0 === " ") {
    mess = "Aucun Message";
  } else {
    mess = _0xec84a0.join(" ");
  }
  ;
  let _0x5d1fc3 = _0x57abcf ? await _0x42f894.participants : '';
  var _0x4e4576 = '';
  _0x4e4576 += "========================\n  \n        🌟 *𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 V²* 🌟\n========================\n\n👥 Group : " + _0x2b3359 + " 🚀 \n👤 Author : *" + _0x2b0f5a + "* 👋 \n📜 Message : *" + mess + "* 📝\n========================\n\n\n\n\n";
  let _0x44caa0 = ['🦴', '👀', "😮‍💨", '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', "🙏🏿", '🖕', '$', '😟', '🥵', '🐅'];
  let _0x534613 = Math.floor(Math.random() * (_0x44caa0.length - 0x1));
  for (const _0x152193 of _0x5d1fc3) {
    _0x4e4576 += _0x44caa0[_0x534613] + "      @" + _0x152193.id.split('@')[0x0] + "\n";
  }
  if (_0x5802a6 || _0x3da57d) {
    _0x1dbf9d.sendMessage(_0x1739ca, {
      'text': _0x4e4576,
      'mentions': _0x5d1fc3.map(_0x33fa0d => _0x33fa0d.id)
    }, {
      'quoted': _0x369ce8
    });
  } else {
    _0x67f29a("command reserved for admins");
  }
});
/** ***fin démettre**** **/
/** *****fin retirer */

zokou({ nomCom: "add", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
  if (!verifGroupe) { return repondre("for groups only"); } 

  const participants = await zk.groupMetadata(dest);
  const isImAdmin = participants.participants.some(p => p.id === zk.user.jid && p.isAdmin);
  if (!isImAdmin) return repondre("I'm not an admin.");
  const match = msgRepondu?.participant || arg[0];
  if (!match) return repondre('Example: add 255682937675');
  
  const res = await zk.groupParticipantsUpdate(dest, [match], 'add');
if (res === '403') return repondre('Failed, Invite sent.');
  if (res && res !== '200') return repondre(res, { quoted: msgRepondu });

  const stickerUrl = stickers[Math.floor(Math.random() * stickers.length)];
  const sticker = new Sticker(stickerUrl, {
    pack: 'ZEZE47-MD',
    author: nomAuteurMessage,
    type: StickerTypes.FULL,
    categories: ['🤩', '🎉'],
    id: '12345',
    quality: 50,
    background: '#000000'
  });

  await sticker.toFile("st.webp");
  zk.sendMessage(dest, { sticker: fs.readFileSync("st.webp") }, { quoted: msgRepondu });
});



zokou({ nomCom: "promote", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : [];

  if (!verifGroupe) return repondre("For groups only");

  const verifMember = (user) => membresGroupe.some(m => m.id === user);
  const memberAdmin = (membresGroupe) => membresGroupe.filter(m => m.admin != null).map(m => m.id);
  const admins = verifGroupe ? memberAdmin(membresGroupe) : [];
  const admin = verifGroupe ? admins.includes(auteurMsgRepondu) : false;
  const membre = verifMember(auteurMsgRepondu);
  const autAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
  const zkad = verifGroupe ? admins.includes(idBot) : false;

  try {
    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (!admin) {
              const txt = `🎊🍾 @${auteurMsgRepondu.split("@")[0]} has been promoted as a group Admin.`;
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] });

              const stickerUrl = stickers[Math.floor(Math.random() * stickers.length)];
              const sticker = new Sticker(stickerUrl, {
                pack: 'ZEZE47-MD',
                author: auteurMessage,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 50,
                background: '#000000'
              });

              await sticker.toFile("st.webp");
              zk.sendMessage(dest, { sticker: fs.readFileSync("st.webp") }, { quoted: msgRepondu });
            } else {
              return repondre("This member is already an administrator of the group.");
            }
          } else {
            return repondre("This user is not part of the group.");
          }
        } else {
          return repondre("Sorry, I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        repondre("Please tag the member to be nominated.");
      }
    } else {
      return repondre("Sorry, I cannot perform this action because you are not an administrator of the group.");
    }
  } catch (e) {
    repondre("Oops, something went wrong: " + e);
  }
});

/** Demote a member */
zokou({ nomCom: "demote", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : [];

  if (!verifGroupe) return repondre("For groups only");

  const verifMember = (user) => membresGroupe.some(m => m.id === user);
  const memberAdmin = (membresGroupe) => membresGroupe.filter(m => m.admin != null).map(m => m.id);
  const admins = verifGroupe ? memberAdmin(membresGroupe) : [];
  const admin = verifGroupe ? admins.includes(auteurMsgRepondu) : false;
  const membre = verifMember(auteurMsgRepondu);
  const autAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
  const zkad = verifGroupe ? admins.includes(idBot) : false;

  try {
    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin) {
const txt = `@${auteurMsgRepondu.split("@")[0]} has been removed from their position as a group administrator.`;
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] });

              const stickerUrl = stickers[Math.floor(Math.random() * stickers.length)];
              const sticker = new Sticker(stickerUrl, {
                pack: 'ZEZE47-MD',
                author: auteurMessage,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 50,
                background: '#000000'
              });

              await sticker.toFile("st.webp");
              zk.sendMessage(dest, { sticker: fs.readFileSync("st.webp") }, { quoted: msgRepondu });
            } else {
              return repondre("This member is not a group administrator.");
            }
          } else {
            return repondre("This user is not part of the group.");
          }
        } else {
          return repondre("Sorry, I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        repondre("Please tag the member to be removed.");
      }
    } else {
      return repondre("Sorry, I cannot perform this action because you are not an administrator of the group.");
    }
  } catch (e) {
    repondre("Oops, something went wrong: " + e);
  }
});

zokou({ nomCom: "del", categorie: 'Group',reaction:"🧹" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe,auteurMsgRepondu,idBot, msgRepondu, verifAdmin, superUser} = commandeOptions;
  
  if (!msgRepondu) {
    repondre("Please mention the message to delete.");
    return;
  }
  if(superUser && auteurMsgRepondu==idBot )
  {
    
       if(auteurMsgRepondu==idBot)
       {
         const key={
            remoteJid:dest,
      fromMe: true,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
       } 
  }

          if(verifGroupe)
          {
               if(verifAdmin || superUser)
               {
                    
                         try{
                
      
            const key=   {
               remoteJid : dest,
               id : ms.message.extendedTextMessage.contextInfo.stanzaId ,
               fromMe : false,
               participant : ms.message.extendedTextMessage.contextInfo.participant

            }        
         
         await zk.sendMessage(dest,{delete:key});return;

             }catch(e){repondre( "I need admin rights.")}
                    
                      
               }else{repondre("Sorry, you are not an administrator of the group.")}
          }

});

zokou({ nomCom: "info", categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe } = commandeOptions;
  if (!verifGroupe) { repondre("order reserved for the group only"); return };

 try { ppgroup = await zk.profilePictureUrl(dest ,'image') ; } catch { ppgroup = conf.URL}

    const info = await zk.groupMetadata(dest)

    /*console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc)*/


    let mess = {
      image: { url: ppgroup },
      caption:  `*━━━━『GROUP INFO』━━━━*\n\n*🎐Name:* ${info.subject}\n\n*🔩Group's ID:* ${dest}\n\n*🔍Desc:* \n\n${info.desc}`
    }


    zk.sendMessage(dest, mess, { quoted: ms })
  });

 zokou({ nomCom: "antilink", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*for groups only*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.") ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("the antilink is already activated for this group")
                    } else {
                  await ajouterOuMettreAJourJid(dest,"oui");
                
              repondre("𝐓𝐡𝐞 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 𝐚𝐜𝐭𝐢𝐯𝐚𝐭𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await ajouterOuMettreAJourJid(dest , "non");

                repondre("The antilink has been successfully deactivated");
                
              } else {
                repondre("antilink is not activated for this group");
              }
            } else if (arg.join('').split("/")[0] === 'action') {
                            

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'remove' || action == 'warn' || action == 'delete' ) {

                await mettreAJourAction(dest,action);

                repondre(`The anti-link action has been updated to ${arg.join('').split("/")[1]}`);

              } else {
                  repondre("The only actions available are warn, remove, and delete") ;
              }
            

            } else repondre("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.")

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('𝐓𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐜𝐚𝐧 𝐨𝐧𝐥𝐲 𝐛𝐞 𝐮𝐬𝐞𝐝 𝐛𝐲 𝐀𝐝𝐦𝐢𝐧 🤖') ;
  }
});




 //------------------------------------antibot-------------------------------

 zokou({ nomCom: "antibot", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*for groups only*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await atbverifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre('antibot on to activate the anti-bot feature\nantibot off to deactivate the antibot feature\nantibot action/remove to directly remove the bot without notice\nantibot action/warn to give warnings\nantilink action/delete to remove the bot message without any sanctions\n\nPlease note that by default, the anti-bot feature is set to delete.') ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("the antibot is already activated for this group")
                    } else {
                  await atbajouterOuMettreAJourJid(dest,"oui");
                
              repondre("the antibot is successfully activated") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await atbajouterOuMettreAJourJid(dest , "non");

                repondre("The antibot has been successfully deactivated");
                
              } else {
                repondre("antibot is not activated for this group");
              }
            } else if (arg.join('').split("/")[0] === 'action') {

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'remove' || action == 'warn' || action == 'delete' ) {

                await mettreAJourAction(dest,action);

                repondre(`The anti-bot action has been updated to ${arg.join('').split("/")[1]}`);

              } else {
                  repondre("The only actions available are warn, remove, and delete") ;
              }
            

            } else {  
              repondre('antibot on to activate the anti-bot feature\nantibot off to deactivate the antibot feature\nantibot action/remove to directly remove the bot without notice\nantibot action/warn to give warnings\nantilink action/delete to remove the bot message without any sanctions\n\nPlease note that by default, the anti-bot feature is set to delete.') ;

                            }
    } catch (error) {
       repondre(error)
    }

  } else { repondre('You are not entitled to this order') ;

  }

});

//----------------------------------------------------------------------------

zokou({ nomCom: "group", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) { repondre("order reserved for group only"); return };
  if (superUser || verifAdmin) {

    if (!arg[0]) { repondre('Instructions:\n\nType group open or close'); return; }
    const option = arg.join(' ')
    switch (option) {
      case "open":
        await zk.groupSettingUpdate(dest, 'not_announcement')
        repondre('group open')
        break;
      case "close":
        await zk.groupSettingUpdate(dest, 'announcement');
        repondre('Group close successfully');
        break;
      default: repondre("Please don't invent an option")
    }

    
  } else {
    repondre("order reserved for the administratorr");
    return;
  }
 

});

zokou({ nomCom: "left", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { repondre, verifGroupe, superUser } = commandeOptions;
  if (!verifGroupe) { repondre("order reserved for group only"); return };
  if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }
  await repondre('sayonnara') ;
   
  zk.groupLeave(dest)
});

zokou({ nomCom: "gname", categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("Order reserved for administrators of the group");
    return;
  }
  if (!arg[0]) {
    repondre("Please enter the group name");
    return;
  }
  const nom = arg.join(' ');
  await zk.groupUpdateSubject(dest, nom);
  repondre(`Group name updated to: *${nom}*`);
});

// Update group description
zokou({ nomCom: "gdesc", categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("Order reserved for administrators of the group");
    return;
  }
  if (!arg[0]) {
    repondre("Please enter the group description");
    return;
  }
  const desc = arg.join(' ');
  await zk.groupUpdateDescription(dest, desc);
  repondre(`Group description updated to: *${desc}*`);
});

// Update group profile picture
zokou({ nomCom: "gpp", categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("Order reserved for administrators of the group");
    return;
  }
  if (msgRepondu.imageMessage) {
    const pp = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);

    await zk.updateProfilePicture(dest, { url: pp })
      .then(() => {
        zk.sendMessage(dest, { text: "Group profile picture changed" });
        fs.unlinkSync(pp);
      })
      .catch(err => zk.sendMessage(dest, { text: err.toString() }));
  } else {
    repondre('Please mention an image');
  }
});

zokou({nomCom:"hidetag",categorie:'Group',reaction:"🎤"},async(dest,zk,commandeOptions)=>{

  const {repondre,msgRepondu,verifGroupe,arg ,verifAdmin , superUser}=commandeOptions;

  if(!verifGroupe)  { repondre('This command is only allowed in groups.')} ;
  if (verifAdmin || superUser) { 

  let metadata = await zk.groupMetadata(dest) ;

  //console.log(metadata.participants)
 let tag = [] ;
  for (const participant of metadata.participants ) {

      tag.push(participant.id) ;
  }
  //console.log(tag)

    if(msgRepondu) {
      console.log(msgRepondu)
      let msg ;

      if (msgRepondu.imageMessage) {

        

     let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
     // console.log(msgRepondu) ;
     msg = {

       image : { url : media } ,
       caption : msgRepondu.imageMessage.caption,
       mentions :  tag
       
     }
    

      } else if (msgRepondu.videoMessage) {

        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;

        msg = {

          video : { url : media } ,
          caption : msgRepondu.videoMessage.caption,
          mentions :  tag
          
        }

      } else if (msgRepondu.audioMessage) {
    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
       
        msg = {
   
          audio : { url : media } ,
          mimetype:'audio/mp4',
          mentions :  tag
           }     
        
      } else if (msgRepondu.stickerMessage) {

    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)

        let stickerMess = new Sticker(media, {
          pack: 'ZEZE47-MD-tag',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
       
        msg = { sticker: stickerBuffer2 , mentions : tag}


      }  else {
          msg = {
             text : msgRepondu.conversation,
             mentions : tag
          }
      }

    zk.sendMessage(dest,msg)

    } else {

        if(!arg || !arg[0]) { repondre('Enter the text to announce or mention the message to announce');
        ; return} ;

      zk.sendMessage(
         dest,
         {
          text : arg.join(' ') ,
          mentions : tag
         }     
      )
    }

} else {
  repondre('Command reserved for administrators.')
}

});


zokou({
  nomCom: 'automute',
  categorie: 'Group'
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre('You are not an administrator of the group');
    return;
  }

  const group_cron = await cron.getCronById(dest);

  if (!arg || arg.length === 0) {
    let state;
    if (group_cron == null || group_cron.mute_at == null) {
      state = "No time set for automatic mute";
    } else {
      state = `The group will be muted at ${(group_cron.mute_at).split(':')[0]}:${(group_cron.mute_at).split(':')[1]}`;
    }

    const msg = `*State:* ${state}\n*Instructions:* To activate automatic mute, add the minute and hour after the command separated by ':'. Example: automute 9:30\n*To delete the automatic mute, use the command* automute del`;

    repondre(msg);
    return;
  } else {
    const texte = arg.join(' ');

    if (texte.toLowerCase() === 'del') {
      if (group_cron == null) {
        repondre('No cronometrage is active');
      } else {
        await cron.delCron(dest);
        repondre("The automatic mute has been removed; restart to apply changes")
          .then(() => {
            exec("pm2 restart all");
          });
      }
    } else if (texte.includes(':')) {
      await cron.addCron(dest, "mute_at", texte);
      repondre(`Setting up automatic mute for ${texte}; restart to apply changes`)
        .then(() => {
          exec("pm2 restart all");
        });
    } else {
      repondre('Please enter a valid time with hour and minute separated by ":"');
    }
  }
});

zokou({
  nomCom: 'autounmute',
  categorie: 'Group'
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre('You are not an administrator of the group');
    return;
  }

  const group_cron = await cron.getCronById(dest);

  if (!arg || arg.length === 0) {
    let state;
    if (group_cron == null || group_cron.unmute_at == null) {
      state = "No time set for autounmute";
    } else {
      state = `The group will be un-muted at ${(group_cron.unmute_at).split(':')[0]}:${(group_cron.unmute_at).split(':')[1]}`;
    }

    const msg = `*State:* ${state}\n*Instructions:* To activate autounmute, add the minute and hour after the command separated by ':'. Example: autounmute 7:30\n*To delete autounmute, use the command* autounmute del`;

    repondre(msg);
    return;
  } else {
    const texte = arg.join(' ');

    if (texte.toLowerCase() === 'del') {
      if (group_cron == null) {
        repondre('No cronometrage has been activated');
      } else {
        await cron.delCron(dest);
        repondre("The autounmute has been removed; restart to apply the changes")
          .then(() => {
            exec("pm2 restart all");
          });
      }
    } else if (texte.includes(':')) {
      await cron.addCron(dest, "unmute_at", texte);
      repondre(`Setting up autounmute for ${texte}; restart to apply the changes`)
        .then(() => {
          exec("pm2 restart all");
        });
    } else {
      repondre('Please enter a valid time with hour and minute separated by ":"');
    }
  }
});


zokou({
  nomCom: 'fkick',
  aliases: ['foreigner', 'countrykick'],
  categorie: 'Group'
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, verifAdmin, superUser, verifZokouAdmin } = commandeOptions;

  if (verifAdmin || superUser) {
    if (!verifZokouAdmin) {
      repondre('You need administrative rights to perform this command');
      return;
    }

    if (!arg || arg.length === 0) {
      repondre('Please enter the country code whose members will be removed');
      return;
    }

    const metadata = await zk.groupMetadata(dest);
    const participants = metadata.participants;

    for (let i = 0; i < participants.length; i++) {
      if (participants[i].id.startsWith(arg[0]) && participants[i].admin === null) {
        await zk.groupParticipantsUpdate(dest, [participants[i].id], "remove");
      }
    }
  } else {
    repondre('Sorry, you are not an administrator of the group');
  }
});

zokou({
  nomCom: 'nsfw',
  categorie: 'Group'
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre('Sorry, you cannot enable NSFW content without being an administrator of the group');
    return;
  }

  const hbd = require('../bdd/hentai');
  const isHentaiGroupe = await hbd.checkFromHentaiList(dest);

  if (arg[0] === 'on') {
    if (isHentaiGroupe) {
      repondre('NSFW content is already active for this group');
      return;
    }

    await hbd.addToHentaiList(dest);
    repondre('NSFW content is now active for this group');
  } else if (arg[0] === 'off') {
    if (!isHentaiGroupe) {
      repondre('NSFW content is already disabled for this group');
      return;
    }

    await hbd.removeFromHentaiList(dest);
    repondre('NSFW content is now disabled for this group');
  } else {
    repondre('You must enter "on" or "off"');
  }
});
zokou({
  'nomCom': "antiword",
  'categorie': 'Group',
  'reaction': '🔗'
}, async (_0x22f58b, _0x4939d7, _0x4e7551) => {
  var {
    repondre: _0x2be765,
    arg: _0x95d0ab,
    verifGroupe: _0x4f0817,
    superUser: _0x1f04d1,
    verifAdmin: _0x177ce1
  } = _0x4e7551;
  if (!_0x4f0817) {
    return _0x2be765("*This command is for groups only*");
  }
  if (_0x1f04d1 || _0x177ce1) {
    const _0x547558 = await verifierEtatJid(_0x22f58b);
    try {
      if (!_0x95d0ab || !_0x95d0ab[0x0] || _0x95d0ab === " ") {
        _0x2be765("antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete.");
        return;
      }
      ;
      if (_0x95d0ab[0x0] === 'on') {
        if (_0x547558) {
          _0x2be765("the antiword is already activated for this group");
        } else {
          await ajouterOuMettreAJourJid(_0x22f58b, "oui");
          _0x2be765("the antiword is activated successfully");
        }
      } else {
        if (_0x95d0ab[0x0] === "off") {
          if (_0x547558) {
            await ajouterOuMettreAJourJid(_0x22f58b, "non");
            _0x2be765("The antiword has been successfully deactivated");
          } else {
            _0x2be765("antiword is not activated for this group");
          }
        } else {
          if (_0x95d0ab.join('').split('/')[0x0] === 'action') {
            let _0x77788f = _0x95d0ab.join('').split('/')[0x1].toLowerCase();
            if (_0x77788f == 'remove' || _0x77788f == "warn" || _0x77788f == "delete") {
              await mettreAJourAction(_0x22f58b, _0x77788f);
              _0x2be765("The anti-word action has been updated to " + _0x95d0ab.join('').split('/')[0x1]);
            } else {
              _0x2be765("The only actions available are warn, remove, and delete");
            }
          } else {
            _0x2be765("antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the word sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete.");
          }
        }
      }
    } catch (_0x22a8b1) {
      _0x2be765(_0x22a8b1);
    }
  } else {
    _0x2be765("You are not entitled to this order");
  }
});
zokou({
  'nomCom': "antilink-all",
  'categorie': "Group",
  'reaction': '🔗'
}, async (_0x18daac, _0x290184, _0x4bd034) => {
  const {
    repondre: _0x71952,
    arg: _0x4c86b9,
    verifGroupe: _0x28df8c,
    superUser: _0x47db3b,
    verifAdmin: _0x2b18e5
  } = _0x4bd034;
  if (!_0x28df8c) {
    return _0x71952("*This Command works in Groups Only*");
  }
  if (_0x47db3b || _0x2b18e5) {
    const _0x4ffabd = await verifierEtatJid(_0x18daac);
    try {
      if (!_0x4c86b9 || !_0x4c86b9[0x0].trim()) {
        _0x71952("Type `antilink-all on` to activate the antilink-all feature\nor `antilink-all off` to deactivate the antilink-all feature\nThen `antilink-all action/remove` to directly remove the link without notice\nor `antilink-all action/warn` to give warnings\nor `antilink-all action/delete` to remove the link without any sanctions\n\nPlease note that by default, the antilink-all feature is set to delete.");
        return;
      }
      const [_0x145c89, _0x261fa8] = _0x4c86b9.join(" ").split('/');
      if (_0x145c89 === 'on') {
        if (_0x4ffabd) {
          _0x71952("Antilink-all is already activated for this group.");
        } else {
          await ajouterOuMettreAJourJid(_0x18daac, "oui");
          _0x71952("The antilink-all feature has been activated successfully.");
        }
      } else {
        if (_0x145c89 === "off") {
          if (_0x4ffabd) {
            await ajouterOuMettreAJourJid(_0x18daac, "non");
            _0x71952("The antilink-all feature has been successfully deactivated.");
          } else {
            _0x71952("Antilink-all is not activated for this group.");
          }
        } else {
          if (_0x145c89 === 'action') {
            const _0x38775d = _0x261fa8.toLowerCase();
            if (["remove", "warn", "delete"].includes(_0x38775d)) {
              await mettreAJourAction(_0x18daac, _0x38775d);
              _0x71952("The anti-link action has been updated to " + _0x38775d + '.');
            } else {
              _0x71952("The only actions available are `warn`, `remove`, and `delete`.");
            }
          } else {
            _0x71952("Type `antilink-all on` to activate the antilink-all feature\nor `antilink-all off` to deactivate the antilink-all feature\nor `antilink-all action/remove` to directly remove the link without notice\nor `antilink-all action/warn` to give warnings\nor `antilink-all action/delete` to remove the link without any sanctions\n\nPlease note that by default, the antilink-all feature is set to delete.\n\n*KEEP USING ALPHA-MD*");
          }
        }
      }
    } catch (_0x5483c0) {
      _0x71952("Error: " + _0x5483c0.message);
    }
  } else {
    _0x71952("You are not allowed to use this command.");
  }
});
zokou({
  'nomCom': 'revoke',
  'categorie': 'Group'
}, async (_0x5cf31f, _0x499fc5, _0x27df3d) => {
  const {
    arg: _0x1cbe7c,
    repondre: _0x1e4f60,
    verifGroupe: _0x5201ec,
    verifAdmin: _0x5ad84b
  } = _0x27df3d;
  if (!_0x5ad84b) {
    _0x1e4f60("for admins.");
    return;
  }
  ;
  if (!_0x5201ec) {
    _0x1e4f60("This command is only allowed in groups.");
  }
  ;
  await _0x499fc5.groupRevokeInvite(_0x5cf31f);
  _0x1e4f60("group link revoked.");
});
