const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { token } = require('./config.json');
const fetch = require('node-fetch')


function getQuote() {
    return fetch("https://zenquotes.io/api/random")
      .then(res => {
        return res.json()
      })
      .then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
      })
  }

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
    else if (commandName === 'inspire') {
        await getQuote().then(quote => interaction.reply(quote))
    }
});

client.login(token)