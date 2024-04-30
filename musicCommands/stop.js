const { VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
  name: 'stop',
  description: 'Stop playing music and make the bot leave the voice channel',
  execute: async (message, args) => {
    // Check if the author is in a voice channel
    if (!message.member.voice.channel) {
      return message.reply('⚠️ You need to be in a voice channel to stop the music!');
    }

    // Check if the bot is in a voice channel
    const voiceChannel = message.guild.me.voice.channel;
    if (!voiceChannel) {
      return message.reply('⚠️ The bot is not currently playing anything.');
    }

    // Check if the user is in the same voice channel as the bot
    if (voiceChannel !== message.member.voice.channel) {
      return message.reply('⚠️ You need to be in the same voice channel as the bot to stop the music!');
    }

    // Get the voice connection of the bot
    const connection = message.guild.me.voice.connection;
    if (!connection) {
      return console.error('No voice connection found for the bot.');
    }

    // Check if the bot is already disconnecting or disconnected
    if (connection.state.status === VoiceConnectionStatus.Destroyed) {
      return message.reply('⚠️ The bot is already disconnected.');
    }

    try {
      // Disconnect the bot from the voice channel
      connection.destroy();
      message.channel.send('🛑 Stopped playing music and disconnected from the voice channel.');
    } catch (error) {
      console.error('Error stopping music and disconnecting:', error);
      message.reply('❌ There was an error stopping the music and disconnecting from the voice channel.');
    }
  },
};
