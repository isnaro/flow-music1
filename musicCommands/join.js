const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  name: 'join',
  description: 'Make the bot join your voice channel',
  execute: async (message, args) => {
    // Check if the author is in a voice channel
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('⚠️ You need to be in a voice channel to use this command!');
    }

    // Check if the bot is already in a voice channel
    const botVoiceChannel = message.guild.me.voice.channel;
    if (botVoiceChannel) {
      return message.reply('⚠️ The bot is already in a voice channel.');
    }

    try {
      // Join the user's voice channel
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      message.channel.send(`🎵 Joined voice channel ${voiceChannel.name}!`);
    } catch (error) {
      console.error('Error joining voice channel:', error);
      message.reply('❌ There was an error joining your voice channel.');
    }
  },
};
