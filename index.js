const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');
const { request } = require('undici');


dotenv.config();

// create a new client instance
const client = new Client({ intents:[GatewayIntentBits.Guilds] });

async function getJSONResponse(body) {
	let fullBody = '';

	for await (const data of body)	{
		fullBody += data.toString();
	}
	return JSON.parse(fullBody);
}

// when the client is ready just run the code (once)
client.once('ready', () => {console.log('Beep Beep, I am ready');});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;
	/* here Ark bot will "think" making the request to the API and waiting for the response
		deferReply() it's a must function in API calls
	*/
	await interaction.deferReply();
	if (commandName === 'cat') {
		const catResult = await request('https://aws.random.cat/meow');
		const { file } = await getJSONResponse(catResult.body);
		interaction.editReply({ files: [file] });
	}

});

// Login on discord

client.login(process.env.DISCORD_BOT_TOKEN);
