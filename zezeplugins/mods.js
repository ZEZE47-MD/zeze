const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");
let {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("../bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("../bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require('../bdd/onlyAdmin');
const {
  removeSudoNumber,
  addSudoNumber,
  issudo
} = require("../bdd/sudo");
const sleep = _0x130ac0 => {
  return new Promise(_0x4946e1 => {
    setTimeout(_0x4946e1, _0x130ac0);
  });
};
zokou({
  'nomCom': "tgs",
  'categorie': 'Mods'
}, async (_0xd6f813, _0x4b2cb8, _0x3453b4) => {
  const {
    ms: _0x424ef8,
    repondre: _0x2c2687,
    arg: _0x1a7a19,
    nomAuteurMessage: _0x5c69e2,
    superUser: _0x50634e
  } = _0x3453b4;
  if (!_0x50634e) {
    _0x2c2687("Only Mods can use this command");
    return;
  }
  if (!_0x1a7a19[0x0]) {
    _0x2c2687("put a telegramme stickers link ");
    return;
  }
  let _0x42f84c = _0x1a7a19.join(" ");
  let _0x36aaea = _0x42f84c.split("/addstickers/")[0x1];
  let _0x444f56 = "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" + encodeURIComponent(_0x36aaea);
  try {
    let _0x5a4be2 = await axios.get(_0x444f56);
    let _0x5ba64f = null;
    if (_0x5a4be2.data.result.is_animated === true || _0x5a4be2.data.result.is_video === true) {
      _0x5ba64f = "animated sticker";
    } else {
      _0x5ba64f = "not animated sticker";
    }
    let _0x5cc389 = "   Zk-stickers-dl\n      \n  *Name :* " + _0x5a4be2.data.result.name + "\n  *Type :* " + _0x5ba64f + " \n  *Length :* " + _0x5a4be2.data.result.stickers.length + "\n  \n      Downloading...";
    await _0x2c2687(_0x5cc389);
    for (let _0x333c8c = 0x0; _0x333c8c < _0x5a4be2.data.result.stickers.length; _0x333c8c++) {
      let _0x4b76e1 = await axios.get("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x5a4be2.data.result.stickers[_0x333c8c].file_id);
      let _0xc10a99 = await axios({
        'method': 'get',
        'url': "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x4b76e1.data.result.file_path,
        'responseType': 'arraybuffer'
      });
      const _0x53a972 = new Sticker(_0xc10a99.data, {
        'pack': _0x5c69e2,
        'author': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
        'type': StickerTypes.FULL,
        'categories': ['🤩', '🎉'],
        'id': '12345',
        'quality': 0x32,
        'background': '#000000'
      });
      const _0x3c29dc = await _0x53a972.toBuffer();
      await _0x4b2cb8.sendMessage(_0xd6f813, {
        'sticker': _0x3c29dc
      }, {
        'quoted': _0x424ef8
      });
    }
  } catch (_0x512d25) {
    _0x2c2687("we got an error \n", _0x512d25);
  }
});
zokou({
  'nomCom': "crew",
  'categorie': "Mods"
}, async (_0x367b42, _0x5d4f4e, _0x48b6ac) => {
  const {
    ms: _0x546fc3,
    repondre: _0x4ffad,
    arg: _0x25d905,
    auteurMessage: _0x4627d2,
    superUser: _0x4bf6d8,
    auteurMsgRepondu: _0x347aa6,
    msgRepondu: _0x46d24c
  } = _0x48b6ac;
  if (!_0x4bf6d8) {
    _0x4ffad("only modds can use this command");
    return;
  }
  ;
  if (!_0x25d905[0x0]) {
    _0x4ffad("Please enter the name of the group to create");
    return;
  }
  ;
  if (!_0x46d24c) {
    _0x4ffad("Please mention a member added ");
    return;
  }
  const _0x2bf151 = _0x25d905.join(" ");
  const _0x42253d = await _0x5d4f4e.groupCreate(_0x2bf151, [_0x4627d2, _0x347aa6]);
  console.log("created group with id: " + _0x42253d.gid);
  _0x5d4f4e.sendMessage(_0x42253d.id, {
    'text': "Bienvenue dans " + _0x2bf151
  });
});
zokou({
  'nomCom': "left",
  'categorie': "Mods"
}, async (_0x54c101, _0x23d59a, _0x4e058d) => {
  const {
    ms: _0x1804e4,
    repondre: _0xf5cfb9,
    verifGroupe: _0x42f6aa,
    msgRepondu: _0x26027a,
    verifAdmin: _0x30af23,
    superUser: _0x177e4f,
    auteurMessage: _0x329c81
  } = _0x4e058d;
  if (!_0x42f6aa) {
    _0xf5cfb9("group only");
    return;
  }
  ;
  if (!_0x177e4f) {
    _0xf5cfb9("order reserved for the owner");
    return;
  }
  await _0x23d59a.groupLeave(_0x54c101);
});
zokou({
  'nomCom': "join",
  'categorie': "Mods"
}, async (_0x5e2aa7, _0x368354, _0x320731) => {
  const {
    arg: _0x328762,
    ms: _0x4d6e89,
    repondre: _0x4f34eb,
    verifGroupe: _0x370d52,
    msgRepondu: _0x27b4a3,
    verifAdmin: _0x6acaf0,
    superUser: _0x49533b,
    auteurMessage: _0x1004fe
  } = _0x320731;
  if (!_0x49533b) {
    _0x4f34eb("command reserved for the bot owner");
    return;
  }
  let _0x1260e9 = _0x328762[0x0].split("https://chat.whatsapp.com/")[0x1];
  await _0x368354.groupAcceptInvite(_0x1260e9);
  _0x4f34eb('Succes')["catch"](_0x4352c3 => {
    _0x4f34eb("Unknown error");
  });
});
zokou({
  'nomCom': "jid",
  'categorie': 'Mods'
}, async (_0x4deb9c, _0x24dfb8, _0x49e848) => {
  const {
    arg: _0x5d94a9,
    ms: _0x56fc0d,
    repondre: _0x31088b,
    verifGroupe: _0x37ab3e,
    msgRepondu: _0x5bea00,
    verifAdmin: _0xe4c576,
    superUser: _0x2a32a1,
    auteurMessage: _0x17e855,
    auteurMsgRepondu: _0x2775c9
  } = _0x49e848;
  if (!_0x2a32a1) {
    _0x31088b("command reserved for the bot owner");
    return;
  }
  if (!_0x5bea00) {
    jid = _0x4deb9c;
  } else {
    jid = _0x2775c9;
  }
  ;
  _0x24dfb8.sendMessage(_0x4deb9c, {
    'text': jid
  }, {
    'quoted': _0x56fc0d
  });
});
zokou({
  'nomCom': "block",
  'categorie': 'Mods'
}, async (_0xb8a4ae, _0x14ba05, _0x42330a) => {
  const {
    arg: _0x3510df,
    ms: _0x51f9fd,
    repondre: _0x22c33e,
    verifGroupe: _0x5b8ccf,
    msgRepondu: _0x5b1c8e,
    verifAdmin: _0x33f5a0,
    superUser: _0x4abf4e,
    auteurMessage: _0x2b9290,
    auteurMsgRepondu: _0x50f29b
  } = _0x42330a;
  if (!_0x4abf4e) {
    _0x22c33e("command reserved for the bot owner");
    return;
  }
  if (!_0x5b1c8e) {
    if (_0x5b8ccf) {
      _0x22c33e("Be sure to mention the person to block");
      return;
    }
    ;
    jid = _0xb8a4ae;
    await _0x14ba05.updateBlockStatus(jid, "block").then(_0x22c33e("succes"));
  } else {
    jid = _0x50f29b;
    await _0x14ba05.updateBlockStatus(jid, "block").then(_0x22c33e('succes'));
  }
  ;
});
zokou({
  'nomCom': "unblock",
  'categorie': "Mods"
}, async (_0x2fdbc8, _0x46c6af, _0x490319) => {
  const {
    arg: _0x6cc154,
    ms: _0x5b0266,
    repondre: _0x5ee2d7,
    verifGroupe: _0x56c26a,
    msgRepondu: _0x3a064a,
    verifAdmin: _0x2ec3ac,
    superUser: _0x39c902,
    auteurMessage: _0x413209,
    auteurMsgRepondu: _0x53fd28
  } = _0x490319;
  if (!_0x39c902) {
    _0x5ee2d7("command reserved for the bot owner");
    return;
  }
  if (!_0x3a064a) {
    if (_0x56c26a) {
      _0x5ee2d7("Please mention the person to be unlocked");
      return;
    }
    ;
    jid = _0x2fdbc8;
    await _0x46c6af.updateBlockStatus(jid, "unblock").then(_0x5ee2d7("succes"));
  } else {
    jid = _0x53fd28;
    await _0x46c6af.updateBlockStatus(jid, "unblock").then(_0x5ee2d7("succes"));
  }
  ;
});
zokou({
  'nomCom': 'kickall',
  'categorie': "Group",
  'reaction': '📣'
}, async (_0x2b377e, _0x1c9157, _0x4982f8) => {
  const {
    auteurMessage: _0x35fea2,
    ms: _0x4b1173,
    repondre: _0xe995a7,
    arg: _0x627d13,
    verifGroupe: _0x5f4f35,
    nomGroupe: _0x5a7d90,
    infosGroupe: _0x35935e,
    nomAuteurMessage: _0x5c7e65,
    verifAdmin: _0x2d62fd,
    superUser: _0x4793ee,
    prefixe: _0x922895
  } = _0x4982f8;
  const _0x339db3 = await _0x1c9157.groupMetadata(_0x2b377e);
  if (!_0x5f4f35) {
    _0xe995a7("✋🏿 ✋🏿this command is reserved for groups ❌");
    return;
  }
  if (_0x4793ee || _0x35fea2 == _0x339db3.owner) {
    _0xe995a7("No_admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.");
    await sleep(0x1388);
    let _0x52e87d = _0x5f4f35 ? await _0x35935e.participants : '';
    try {
      let _0x2f32ce = _0x52e87d.filter(_0x27f11d => !_0x27f11d.admin);
      for (const _0x550988 of _0x2f32ce) {
        await _0x1c9157.groupParticipantsUpdate(_0x2b377e, [_0x550988.id], 'remove');
        await sleep(0x1f4);
      }
    } catch (_0x1f4f8d) {
      _0xe995a7("I need administration rights");
    }
  } else {
    _0xe995a7("Order reserved for the group owner for security reasons");
    return;
  }
});
zokou({
  'nomCom': "ban",
  'categorie': "Mods"
}, async (_0x5c2571, _0x4e553c, _0x6b347a) => {
  const {
    ms: _0x4cafef,
    arg: _0x5dce16,
    auteurMsgRepondu: _0x144605,
    msgRepondu: _0x5a6574,
    repondre: _0x3ba278,
    prefixe: _0x2f5d05,
    superUser: _0x4cb217
  } = _0x6b347a;
  if (!_0x4cb217) {
    _0x3ba278("This command is only allowed to the bot owner");
    return;
  }
  if (!_0x5dce16[0x0]) {
    _0x3ba278("mention the victim by typing " + _0x2f5d05 + "ban add/del to ban/unban the victim");
    return;
  }
  ;
  if (_0x5a6574) {
    switch (_0x5dce16.join(" ")) {
      case "add":
        let _0x298551 = await isUserBanned(_0x144605);
        if (_0x298551) {
          _0x3ba278("This user is already banned");
          return;
        }
        addUserToBanList(_0x144605);
        break;
      case 'del':
        let _0xac9e87 = await isUserBanned(_0x144605);
        if (_0xac9e87) {
          removeUserFromBanList(_0x144605);
          _0x3ba278("This user is now free.");
        } else {
          _0x3ba278("This user is not banned.");
        }
        break;
      default:
        _0x3ba278("bad option");
        break;
    }
  } else {
    _0x3ba278("mention the victim");
    return;
  }
});
zokou({
  'nomCom': 'bangroup',
  'categorie': "Mods"
}, async (_0x2f7ec4, _0x247533, _0x236001) => {
  const {
    ms: _0x1118a6,
    arg: _0x1b8d68,
    auteurMsgRepondu: _0x2c4bcf,
    msgRepondu: _0x38f1c0,
    repondre: _0x5881d9,
    prefixe: _0xbc7da4,
    superUser: _0xa36382,
    verifGroupe: _0x29303e
  } = _0x236001;
  if (!_0xa36382) {
    _0x5881d9("This command is only allowed to the bot owner");
    return;
  }
  ;
  if (!_0x29303e) {
    _0x5881d9("order reservation for groups");
    return;
  }
  ;
  if (!_0x1b8d68[0x0]) {
    _0x5881d9("type " + prefix + "bangroup add/del to ban/unban the group");
    return;
  }
  ;
  const _0x1dc64a = await isGroupBanned(_0x2f7ec4);
  switch (_0x1b8d68.join(" ")) {
    case "add":
      if (_0x1dc64a) {
        _0x5881d9("This group is already banned");
        return;
      }
      addGroupToBanList(_0x2f7ec4);
      break;
    case "del":
      if (_0x1dc64a) {
        removeGroupFromBanList(_0x2f7ec4);
        _0x5881d9("This group is now free.");
      } else {
        _0x5881d9("This group is not banned.");
      }
      break;
    default:
      _0x5881d9("bad option");
      break;
  }
});
zokou({
  'nomCom': "onlyadmin",
  'categorie': 'Group'
}, async (_0x286cf0, _0x3e05c7, _0x53bb00) => {
  const {
    ms: _0x2dca92,
    arg: _0x59dc6d,
    auteurMsgRepondu: _0x343a48,
    msgRepondu: _0x5aa0d6,
    repondre: _0x424d65,
    prefixe: _0x39cb8,
    superUser: _0x3952e7,
    verifGroupe: _0x199dff,
    verifAdmin: _0x59e2d1
  } = _0x53bb00;
  if (_0x3952e7 || _0x59e2d1) {
    if (!_0x199dff) {
      _0x424d65("order reservation for groups");
      return;
    }
    ;
    if (!_0x59dc6d[0x0]) {
      _0x424d65("type " + prefix + "onlyadmin add/del to ban/unban the group");
      return;
    }
    ;
    const _0x5595be = await isGroupOnlyAdmin(_0x286cf0);
    switch (_0x59dc6d.join(" ")) {
      case "add":
        if (_0x5595be) {
          _0x424d65("This group is already in onlyadmin mode");
          return;
        }
        addGroupToOnlyAdminList(_0x286cf0);
        break;
      case "del":
        if (_0x5595be) {
          removeGroupFromOnlyAdminList(_0x286cf0);
          _0x424d65("This group is now free.");
        } else {
          _0x424d65("This group is not in onlyadmin mode.");
        }
        break;
      default:
        _0x424d65("bad option");
        break;
    }
  } else {
    _0x424d65("You are not entitled to this order");
  }
});
zokou({
  'nomCom': "sudo",
  'categorie': "Mods"
}, async (_0x59f2e1, _0x51785a, _0x10699c) => {
  const {
    ms: _0x2a623d,
    arg: _0x5e0b28,
    auteurMsgRepondu: _0x41fd49,
    msgRepondu: _0x58ab9f,
    repondre: _0x38f7b5,
    prefixe: _0x4c117b,
    superUser: _0x1ed562
  } = _0x10699c;
  if (!_0x1ed562) {
    _0x38f7b5("This command is only allowed to the bot owner");
    return;
  }
  if (!_0x5e0b28[0x0]) {
    _0x38f7b5("mention the person by typing " + prefix + "sudo add/del");
    return;
  }
  ;
  if (_0x58ab9f) {
    switch (_0x5e0b28.join(" ")) {
      case "add":
        let _0x3f9b60 = await issudo(_0x41fd49);
        if (_0x3f9b60) {
          _0x38f7b5("This user is already sudo");
          return;
        }
        addSudoNumber(_0x41fd49);
        _0x38f7b5("succes");
        break;
      case "del":
        let _0xb3cb37 = await issudo(_0x41fd49);
        if (_0xb3cb37) {
          removeSudoNumber(_0x41fd49);
          _0x38f7b5("This user is now non-sudo.");
        } else {
          _0x38f7b5("This user is not sudo.");
        }
        break;
      default:
        _0x38f7b5("bad option");
        break;
    }
  } else {
    _0x38f7b5("mention the victim");
    return;
  }
});
zokou({
  'nomCom': 'save',
  'categorie': "Mods"
}, async (_0x7481b7, _0x58583e, _0xd0b312) => {
  const {
    repondre: _0x1cc088,
    msgRepondu: _0x18c43f,
    superUser: _0x430539,
    auteurMessage: _0x25eeb8
  } = _0xd0b312;
  if (_0x430539) {
    if (_0x18c43f) {
      console.log(_0x18c43f);
      let _0x286009;
      if (_0x18c43f.imageMessage) {
        let _0xbfdfde = await _0x58583e.downloadAndSaveMediaMessage(_0x18c43f.imageMessage);
        _0x286009 = {
          'image': {
            'url': _0xbfdfde
          },
          'caption': _0x18c43f.imageMessage.caption
        };
      } else {
        if (_0x18c43f.videoMessage) {
          let _0xedd847 = await _0x58583e.downloadAndSaveMediaMessage(_0x18c43f.videoMessage);
          _0x286009 = {
            'video': {
              'url': _0xedd847
            },
            'caption': _0x18c43f.videoMessage.caption
          };
        } else {
          if (_0x18c43f.audioMessage) {
            let _0x52d6a4 = await _0x58583e.downloadAndSaveMediaMessage(_0x18c43f.audioMessage);
            _0x286009 = {
              'audio': {
                'url': _0x52d6a4
              },
              'mimetype': "audio/mp4"
            };
          } else {
            if (_0x18c43f.stickerMessage) {
              let _0x39ce0d = await _0x58583e.downloadAndSaveMediaMessage(_0x18c43f.stickerMessage);
              let _0x374711 = new Sticker(_0x39ce0d, {
                'pack': "joel md-tag",
                'type': StickerTypes.CROPPED,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x46,
                'background': "transparent"
              });
              const _0x41324b = await _0x374711.toBuffer();
              _0x286009 = {
                'sticker': _0x41324b
              };
            } else {
              _0x286009 = {
                'text': _0x18c43f.conversation
              };
            }
          }
        }
      }
      _0x58583e.sendMessage(_0x25eeb8, _0x286009);
    } else {
      _0x1cc088("Mention the message that you want to save");
    }
  } else {
    _0x1cc088("only mods can use this command");
  }
});
zokou({
  'nomCom': "mention",
  'categorie': 'Mods'
}, async (_0x5309ca, _0x10c2d2, _0x32d7f0) => {
  const {
    ms: _0x4e2d33,
    repondre: _0x3c8142,
    superUser: _0x1017d2,
    arg: _0xbfa408
  } = _0x32d7f0;
  if (!_0x1017d2) {
    _0x3c8142("you do not have the rights for this command");
    return;
  }
  const _0x4e73d7 = require("../bdd/mention");
  let _0x463313 = await _0x4e73d7.recupererToutesLesValeurs();
  data = _0x463313[0x0];
  if (!_0xbfa408 || _0xbfa408.length < 0x1) {
    let _0x34b1eb;
    if (_0x463313.length === 0x0) {
      _0x3c8142("To activate or modify the mention; follow this syntax: mention link type message\n  The different types are audio, video, image, and sticker.\n  Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is Luffy");
      return;
    }
    if (data.status == 'non') {
      _0x34b1eb = "Desactived";
    } else {
      _0x34b1eb = 'Actived';
    }
    mtype = data.type || "no data";
    url = data.url || "no data";
    let _0x3913f3 = "Status: " + _0x34b1eb + "\nType: " + mtype + "\nLink: " + url + "\n\n*Instructions:*\n\nTo activate or modify the mention, follow this syntax: mention link type message\nThe different types are audio, video, image, and sticker.\nExample: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is Luffy\n\nTo stop the mention, use mention stop";
    _0x3c8142(_0x3913f3);
    return;
  }
  if (_0xbfa408.length >= 0x2) {
    if (_0xbfa408[0x0].startsWith("http") && (_0xbfa408[0x1] == "image" || _0xbfa408[0x1] == "audio" || _0xbfa408[0x1] == 'video' || _0xbfa408[0x1] == 'sticker')) {
      let _0x31ac14 = [];
      for (i = 0x2; i < _0xbfa408.length; i++) {
        _0x31ac14.push(_0xbfa408[i]);
      }
      let _0x212174 = _0x31ac14.join(" ") || '';
      await _0x4e73d7.addOrUpdateDataInMention(_0xbfa408[0x0], _0xbfa408[0x1], _0x212174);
      await _0x4e73d7.modifierStatusId1('oui').then(() => {
        _0x3c8142("mention updated");
      });
    } else {
      _0x3c8142("*Instructions:*\n          To activate or modify the mention, follow this syntax: mention link type message. The different types are audio, video, image, and sticker.");
    }
  } else if (_0xbfa408.length === 0x1 && _0xbfa408[0x0] == "stop") {
    await _0x4e73d7.modifierStatusId1("non").then(() => {
      _0x3c8142(" mention stopped ");
    });
  } else {
    _0x3c8142("Please make sure to follow the instructions");
  }
});
