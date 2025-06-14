const { note, prefix } = require('../lib');

module.exports = {
  name: "note",
  alias: ["notes"],
  category: "notes",
  desc: "Add, view, or delete notes using MongoDB",
  usage: "<add|get|all|del|delall> [value]",
  fromMe: true,

  async handler(m, { args }) {
    const sub = args[0]?.toLowerCase();
    const value = args.slice(1).join(" ");

    const menu = `╭─── *『 NOTES HELP 』* ───◆
┃
┃ ✦ *${prefix}note add your text*
┃ ✦ *${prefix}note get <id>*
┃ ✦ *${prefix}note all*
┃ ✦ *${prefix}note del <id>*
┃ ✦ *${prefix}note delall*
┃
╰━━━━━━━━━━━━━━━━━━━━━━◆`;

    if (!sub) return m.reply(menu);

    try {
      let result;

      switch (sub) {
        case "add":
          if (!value) return m.reply("*❌ Please provide text to save as a note.*");
          result = await note.addnote(m, value);
          break;

        case "get":
          if (!value || isNaN(value)) return m.reply("*❌ Provide a valid note ID. Example: note get 1*");
          result = await note.allnotes(m, value.trim());
          break;

        case "all":
          result = await note.allnotes(m, "all");
          break;

        case "del":
          if (!value || isNaN(value)) return m.reply("*❌ Provide a valid note ID to delete.*");
          result = await note.delnote(m, value.trim());
          break;

        case "delall":
          result = await note.delallnote(m);
          break;

        default:
          return m.reply(menu);
      }

      return m.reply(result.msg);

    } catch (error) {
      return m.reply(`*⚠️ Error:*\n${error.message || error}`);
    }
  }
};
