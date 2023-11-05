const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getPlayer, createPlayer } = require("../api");
const { chooseRandomGod, ErrorEmbeds } = require("../utils");
const { Gods } = require("../data/gods");

module.exports = {
    data: new SlashCommandBuilder().setName("claim").setDescription("Get claimed by a random godly parent to begin your demigod journey!"),

    async execute(client, interaction) {
        const { success, player } = await getPlayer(interaction.user.id);
        if (!success) return await interaction.reply({ embeds: [ErrorEmbeds.NoData], ephemeral: true });
        if (player) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`You have already been claimed by ${Gods[player.parent].name}`).setColor(Gods[player.parent].colour)], ephemeral: true });
        
        if (!player) {
            const parent = chooseRandomGod();
            await createPlayer(interaction.user.id, parent.name);
            return await interaction.reply({ embeds: [
                new EmbedBuilder().setTitle(`You have been claimed by ${parent.name}!`).setDescription("Welcome to Camp Halfblood young demigod! Here you will learn to harness your powers and train your skills to survive the world of gods and monsters that lies ahead.").setColor(parent.colour)
            ], ephemeral: true });
        }
    }
}