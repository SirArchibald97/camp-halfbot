const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { getPlayer } = require("../api");
const { convertXpToLevel, convertLevelToStat, formatNumber, ErrorEmbeds } = require("../utils");
const { Gods } = require("../data/gods");
const { getArtefact } = require("../data/artefacts");
const { getItem } = require("../data/items");
const { getWeapon } = require("../data/weapons");
const { getArmour } = require("../data/armour");

module.exports = {
    data: new SlashCommandBuilder().setName("profile").setDescription("View your demigod profile!"),

    async execute(client, interaction) {
        // fetch player data
        const { success, player } = await getPlayer(interaction.user.id);
        if (!success) return await interaction.reply({ embeds: [ErrorEmbeds.NoData], ephemeral: true });
        
        // create embeds
        const ProfileEmbeds = {
            statsEmbed: function(interaction, player) {
                const { level, xpForNextLevel, progressToNextLevel } = convertXpToLevel(player.xp);
                let progressBar = "";
                const percentageProgress = Math.round((progressToNextLevel / xpForNextLevel) * 10);
                progressBar += "🟪".repeat(percentageProgress);
                progressBar += "⬜".repeat(10 - percentageProgress);
        
                return new EmbedBuilder()
                    .setTitle(interaction.user.globalName)
                    .setThumbnail(interaction.user.avatarURL())
                    .setColor(Gods[player.parent].colour)
                    .setDescription(
                        `### Child of ${Gods[player.parent].name}\n` + 
                        `\`\`\`ansi\n` +
                        `[0mHealth [0;30m> [1;37m${formatNumber(player.health)} / ${formatNumber(convertLevelToStat(level))}\n` +
                        `[0mEnergy [0;30m> [1;37m${formatNumber(player.energy)} / ${formatNumber(convertLevelToStat(level))}\n` +
                        `[0mDrachma [0;30m> [1;37m${formatNumber(player.drachma)}\n\n` +
                        `[0mLevel [0;30m> [1;37m${formatNumber(Math.floor(level))} [0;30m(${formatNumber(player.xp)} XP)\n` +
                        `[0mProgress [0;30m> [1;37m${formatNumber(progressToNextLevel)} / ${formatNumber(xpForNextLevel)}\n\n` +
                        `${Math.floor(level)} ${progressBar} ${Math.floor(level) + 1}\n` +
                        `\`\`\`\n`
                    )
            },
            equipmentEmbed: function(interaction, player) {
                const weapon = getWeapon(player.equipment.active.weapon)
                const artefact = getArtefact(player.equipment.active.artefact);
                const helmet = getArmour(player.equipment.active.helmet);
                const chestplate = getArmour(player.equipment.active.chestplate);
                const boots = getArmour(player.equipment.active.boots);

                return new EmbedBuilder()
                    .setTitle(`${interaction.user.globalName}'s Active Equipment`)
                    .setDescription(
                        `Weapon: ${weapon ? `**${weapon.name}**\n> ${weapon.description}\n> \`${weapon.damage}\` Damage`: "**None**\n> You have no weapon equipped!"}\n\n` +
                        `Helmet: ${helmet ? `**${helmet.name}**\n> ${helmet.description}\n> - \`${helmet.defence}\` Defence\n` : "**None**\n> You have no helmet equipped!"}` +
                        `Chestplate: ${chestplate ? `**${chestplate.name}**\n> ${chestplate.description}\n> - \`${chestplate.defence}\` Defence` : "**None**\n> You have no chestplate equipped!"}\n` +
                        `Boots: ${boots ? `**${boots.name}**\n> ${boots.description}\n> - \`${boots.defence}\` Defence)` : "**None**\n> You have no boots equipped!"}\n\n` +
                        `Artefact: ${artefact ? `**${artefact.name}**\n> ${artefact.description}` : "**None**\n> You have no artefact equipped!"}`
                    )
                    .setThumbnail(interaction.user.avatarURL())
                    .setColor(Gods[player.parent].colour)
                    .setTimestamp()
            },
            inventoryEmbed: function(interaction, player) {
                return new EmbedBuilder()
                    .setTitle(`${interaction.user.globalName}'s Items`)
                    .setDescription(player.items.map(i => `**${getItem(i.item_id).name}** *(x${i.amount})*\n> ${getItem(i.item_id).desc}`).join("\n"))
                    .setColor(Gods[player.parent].colour)
                    .setTimestamp()
            },
            storageEmbed: function(interaction, player) {
                return new EmbedBuilder()
                    .setTitle(`${interaction.user.globalName}'s Storage`)
                    .setDescription("```ansi\n" + player.equipment.storage.map(e => `[1;37m${e.type} [0m> ${e.value} ${e.type === "Helmet" || e.type === "Chestplate" || e.type === "Greaves" ? "Defence" : "Damage"}\n`).join("\n\n") + "\n```")
                    .setColor(Gods[player.parent].colour)
                    .setTimestamp()
            },
            artefactsEmbed: function(interaction, player) {
                return new EmbedBuilder()
                    .setTitle(`${interaction.user.globalName}'s Artefacts`)
                    .setDescription("```ansi\n" + player.artefacts.map((a) => `[1;37m${getArtefact(a).name}\n[0m${getArtefact(a).description}`).join("\n\n") + "\n```")
                    .setColor(Gods[player.parent].colour)
                    .setTimestamp()
            }
        }

        
        // embeds
        const embeds = [
            ProfileEmbeds.statsEmbed(interaction, player),
            ProfileEmbeds.equipmentEmbed(interaction, player),
            ProfileEmbeds.inventoryEmbed(interaction, player),
            ProfileEmbeds.storageEmbed(interaction, player),
            ProfileEmbeds.artefactsEmbed(interaction, player),
        ];
        // buttons
        const buttons = [
            new ButtonBuilder().setCustomId(`${interaction.user.id}-profile-0`).setLabel("📊").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`${interaction.user.id}-profile-1`).setLabel("🗡️").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`${interaction.user.id}-profile-2`).setLabel("🧱").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`${interaction.user.id}-profile-3`).setLabel("📦").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`${interaction.user.id}-profile-4`).setLabel("🔱").setStyle(ButtonStyle.Secondary),
        ];

        // send message and create collector
        const message = await interaction.reply({ embeds: [embeds[0]], components: [new ActionRowBuilder().addComponents(buttons)] });
        const filter = i => i.user.id === interaction.user.id && i.customId.startsWith(`${interaction.user.id}-profile`);
        const collector = message.createMessageComponentCollector({ filter: filter, time: 60_000 * 5 });

        collector.on("collect", async (button) => {
            // get embeds index based on clicked button
            const clickedPage = Number(button.customId.split("-")[2]);
            // reformat button styles
            for (let i = 0; i < buttons.length; i++) { buttons[i].setStyle(i === clickedPage ? ButtonStyle.Primary : ButtonStyle.Secondary); }
            // send new embed and buttons
            await button.update({ embeds: [embeds[clickedPage]], components: [new ActionRowBuilder().addComponents(buttons)] });
        });

        // remove buttons when the collector times out
        collector.on("end", async (collected) => {
            for (let button of buttons) { button.setDisabled(true); }
            await message.edit({ components: [new ActionRowBuilder().addComponents(buttons)] });
        });
    }
}