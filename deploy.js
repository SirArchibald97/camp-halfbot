const { Routes } = require("discord.js");
const { REST } = require('@discordjs/rest');
const fs = require('fs');

module.exports = async (client) => {
    client.commands = new Map();

    let commands = [];
    let files = fs.readdirSync(`./commands/`);
    for (let file of files) {
        const command = require(`./commands/${file}`);
        if (command.func) {
            let commandData = await command.data(client);
            client.commands.set(commandData.name, command);
            commands.push(commandData.toJSON());
        } else {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }
    }

    // commands
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    try {
        // make sure to replace GUILD ID HERE with the ID of your server
        // you can find this by turning on developer mode in your settings, right clicking the server icon, and clicking "Copy ID"
        await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID), { body: commands });
        console.log(`Successfully registered ${commands.length} commands!`);
    } catch (error) {
        console.error(error);
    }
}
