const { ErrorEmbeds } = require("../utils");

module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        
        try {
            await command.execute(client, interaction);
        } catch (err) {
            await interaction.reply({ embeds: [ErrorEmbeds.General], ephemeral: true });
            console.error(err);
        }
    }
}