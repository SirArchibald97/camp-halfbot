const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getPlayer, createPlayer } = require("../api");
const { ErrorEmbeds } = require("../utils");
const { Gods } = require("../data/gods");

module.exports = {
    data: new SlashCommandBuilder().setName("claim").setDescription("Get claimed by a godly parent to begin your demigod journey!")
        .addStringOption(god => god.setName("god").setDescription("Select a god").setRequired(true).addChoices(
            { name: "Zeus", value: "Zeus" },
            { name: "Poseidon", value: "Poseidon" },
            { name: "Hades", value: "Hades" },
            { name: "Ares", value: "Ares" },
            { name: "Athena", value: "Athena" },
            { name: "Aphrodite", value: "Aphrodite" },
            { name: "Apollo", value: "Apollo" },
            { name: "Hermes", value: "Hermes" },
            { name: "Dionysus", value: "Dionysus" },
            { name: "Demeter", value: "Demeter" },
            { name: "Hephaestus", value: "Hephaestus" },
        )),

    async execute(client, interaction) {
        const { success, player } = await getPlayer(interaction.user.id);
        if (!success) return await interaction.reply({ embeds: [ErrorEmbeds.NoData], ephemeral: true });
        if (player) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`You have already been claimed by ${Gods[player.parent].name}`).setColor(Gods[player.parent].colour)], ephemeral: true });
        
        if (!player) {
            const parent = Gods[interaction.options.getString("god")];
            await createPlayer(interaction.user.id, parent.name);
            return await interaction.reply({ embeds: [
                new EmbedBuilder().setTitle(`You have been claimed by ${parent.name}!`).setDescription("Welcome to Camp Halfblood young demigod! Here you will learn to harness your powers and train your skills to survive the world of gods and monsters that lies ahead.").setColor(parent.colour)
            ], ephemeral: true });
        }
    }
}