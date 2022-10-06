const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const dotenv = require('dotenv');


dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.GUILD_ID;
const appClientId = process.env.APP_CLIENT_ID;

const commands = [
	new SlashCommandBuilder().setName('cat').setDescription('get the cat from API'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(appClientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
