const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getLeaderboard } = require("../api");
const { ErrorEmbeds, formatNumber, convertXpToLevel } = require("../utils");

module.exports = {
    data: new SlashCommandBuilder().setName("leaderboard").setDescription("View the global leaderboards for XP and Drachma!")
        .addSubcommand(xp => xp.setName("xp").setDescription("View the global XP leaderboard!"))
        .addSubcommand(drachma => drachma.setName("drachma").setDescription("View the global Drachma leaderboard!")),

    async execute(client, interaction) {
        const { success, leaderboard } = await getLeaderboard(interaction.options.getSubcommand());
        if (!success) return await interaction.reply({ embeds: [ErrorEmbeds.NoData], ephemeral: true });

        //console.log(leaderboard);
        let description = "";
        for (let i = 0; i < 10; i++) {
            const player = leaderboard[i];
            description += `**#${i + 1}** <@${player.user_id}> - `;

            if (interaction.options.getSubcommand() === "xp") {
                description += `Level ${formatNumber(Math.floor(convertXpToLevel(player.xp).level))} (${formatNumber(player.xp)})\n`;
            } else if (interaction.options.getSubcommand() === "drachma") {
                description += `:coin: ${formatNumber(player.drachma)}\n`;
            }
        }

        const titles = { "xp": "XP", "drachma": "Drachma" };
        const embed = new EmbedBuilder()
            .setTitle(`Global ${titles[interaction.options.getSubcommand()]} Leaderboard`)
            .setColor("Gold")
            .setFooter({ text: "Powered by Camp Halfbot!", iconURL: client.user.avatarURL() })
            .addFields(description)
        await interaction.reply({ embeds: [embed] });
    }
}