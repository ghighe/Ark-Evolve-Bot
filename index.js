const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');


dotenv.config();

// create a new client instance
const client = new Client({ intents:[GatewayIntentBits.Guilds] });

// when the client is ready just run the code (once)
client.once('ready', () => {console.log('Beep Beep, I am ready');});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Ba ce fraier esti');
	}
	else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\n Total members: ${interaction.guild.memberCount}`);
	}
	else if (commandName === 'user') {
		await interaction.reply(`Your tag - ${interaction.user.tag}\n Your id - ${interaction.user.id}`);
	}

});

// Login on discord

client.login(process.env.DISCORD_BOT_TOKEN);
