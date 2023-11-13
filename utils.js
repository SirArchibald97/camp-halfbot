const { EmbedBuilder } = require("discord.js");
const { MonsterType } = require("./data/monsters");

module.exports = {
    chooseRandomGod: function() {
        const { Gods } = require("./data/gods");
        const godNames = Object.keys(Gods);
        const randomIndex = Math.floor(Math.random() * godNames.length);
        return Gods[godNames[randomIndex]];
    },

    ErrorEmbeds: {
        General: new EmbedBuilder().setDescription("### Whoops, that didn't work!\nPlease try again later. If the issue persists, please contact <@398890149607637013>!").setColor("Red"),
        NoData: new EmbedBuilder().setDescription("### Have you played before?\nIf you are new here, try /claim to begin your journey! If the issue persists, please contact <@398890149607637013>!").setColor("Red"),
    },

    convertXpToLevel: function(xp) {
        let level = 1;
        let total = 0;
        while (total < xp) {
            total += level === 1 ? 100 : Math.floor(100 * Math.pow(1.05, level - 1));
            level++;
        }

        let xpForNextLevel = Math.floor(100 * Math.pow(1.05, level - 1));
        let progressToNextLevel = total - xp;
        level += progressToNextLevel / xpForNextLevel;
        return { level: level.toFixed(1), xpForNextLevel: xpForNextLevel, progressToNextLevel: progressToNextLevel };
    },

    convertLevelToStat: function(level) {
        let base = 50;
        while (level > 1) {
            base += 2;
            level--;
        }
        return base;
    },

    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    calculateTotalDamage(player, enemy) {
        const activeWeapon = player.weapons.find(w => w.active === true);
        const activeArtefact = player.artefacts.find(a => a.active === true);

        let damage = activeWeapon.damage;
        
        // big three artefacts
        if (activeArtefact.id === "poseidons_trident" && enemy.type === MonsterType.Water) damage *= 1.5;
        if (activeArtefact.id === "master_bolt" && enemy.type === MonsterType.Flying) damage *= 1.5;
        if (activeArtefact.id === "helm_of_darkness" && enemy.type === MonsterType.Underworld) damage *= 1.5;
        
        // backbiter
        if (activeArtefact.id === "backbiter") {
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            if (randomNumber <= 95) damage *= 1.5;
        }

        return damage;
    },

    calculateInventorySlots(player) {
        let slots = 5;
        return slots;
    },
}