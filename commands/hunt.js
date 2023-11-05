const { SlashCommandBuilder, EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { getCooldowns, getPlayer, setCooldown, updatePlayer } = require("../api");
const { getRandomMonster } = require("../data/monsters");
const { getRarity } = require("../data/rarities");
const { ErrorEmbeds, calculateTotalDamage } = require("../utils");

module.exports = {
    data: new SlashCommandBuilder().setName("hunt").setDescription("Hunt for monsters in the Camp Halfblood woods!"),

    async execute(client, interaction) {
        const { success: cds, cooldowns } = await getCooldowns(interaction.user.id);
        if (!cds) return await interaction.reply({ embeds: [ErrorEmbeds.NoData], ephemeral: true });
        const { success: ps, player } = await getPlayer(interaction.user.id);
        if (!ps) return await interaction.reply({ embeds: [ErrorEmbeds.NoData], ephemeral: true });

        const huntCooldown = cooldowns.hunt;
        if (player.energy < 10) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription("### You don't have enough energy to hunt!\nTry using Ambrosia or Nectar to regain some energy.").setColor("Red")], ephemeral: true });
        if (player.health === 0) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`### You don't have enough health to hunt!\nTry using Ambrosia or Nectar to regain some health.`).setColor("Red")], ephemeral: true });
        if (huntCooldown > Date.now()) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`### You can't hunt again yet!\nTry again <t:${Math.floor(huntCooldown / 1000)}:R>`).setColor("Red")], ephemeral: true });
        
        const monster = getRandomMonster();
        const rarity = getRarity();

        const fightButton = await interaction.reply({ 
            embeds: [
                new EmbedBuilder().setDescription(`### You encountered a [${rarity.name}] ${monster.name}!\nChoose an option below to proceed.`).setColor(rarity.colour)
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId(`${interaction.user.id}-confirmhunt`).setLabel("Fight!").setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId(`${interaction.user.id}-cancelhunt`).setLabel("Run away!").setStyle(ButtonStyle.Danger)
                )
            ] 
        });
        const filter = i => i.user.id === interaction.user.id && i.customId.startsWith(interaction.user.id);
        const collector = fightButton.createMessageComponentCollector({ filter: filter, time: 30_000, max: 1 });
        collector.on("end", async collected => {
            if (collected.size === 0) {
                return await interaction.editReply({ embeds: [new EmbedBuilder().setDescription("### You missed the monster and it got away!").setColor("Red")], components: [] });
            } else {
                if (collected.first().customId.endsWith("cancelhunt")) {
                    await collected.first().update({ embeds: [new EmbedBuilder().setDescription("### You ran away from the monster!").setColor("Red")], components: [] });

                } else {
                    let blows = 0;
                    let playerDamage = 0;
                    let monsterDamage = 0;
                    while (player.health - monsterDamage > 0 && rarity.health - playerDamage > 0) {
                        monsterDamage += rarity.damage;
                        playerDamage += calculateTotalDamage(player);
                        blows++;
                    }

                    if (player.health - monsterDamage <= 0) {
                        await collected.first().update({ embeds: [new EmbedBuilder()
                            .setDescription(`### You were killed by a [${rarity.name}] ${monster.name}!\n\nYou exchanged ${blows} hits and...\n- dealt \`${playerDamage}\` damage\n- took \`${monsterDamage}\` damage`)
                            .setColor(rarity.colour)], 
                            components: []
                        });

                    } else {
                        await collected.first().update({ embeds: [new EmbedBuilder()
                            .setDescription(`### You killed a [${rarity.name}] ${monster.name}!\n\nYou exchanged ${blows} hits and...\n- dealt \`${playerDamage}\` damage\n- took \`${monsterDamage}\` damage`)
                            .setColor(rarity.colour)], 
                            components: []
                        });
                    }

                    //await setCooldown(interaction.user.id, "hunt");

                    let newPlayer = player;
                    newPlayer.energy = player.energy - 10 < 0 ? 0 : player.energy - 10;
                    newPlayer.health = player.health - monsterDamage < 0 ? 0 : player.health - monsterDamage;
                    newPlayer.xp += rarity.xp;
                    await updatePlayer(interaction.user.id, newPlayer);
                }
            }
        });
    }
}