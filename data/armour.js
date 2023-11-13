module.exports.Armour = {
    BronzeHelmet: {
        id: "bronze_helmet",
        name: "Celestial Bronze Helmet",
        description: "A helmet forged of Celestial Bronze.\n> Set Bonus: *+10% damage*",
        defence: 7,
    },
    BronzeChestplate: {
        id: "bronze_chestplate",
        name: "Celestial Bronze Chestplate",
        description: "A chestplate forged of Celestial Bronze.\n> Set Bonus: *+10% damage*",
        defence: 10,
    },
    BronzeBoots: {
        id: "bronze_boots",
        name: "Celestial Bronze Boots",
        description: "A pair of boots forged of Celestial Bronze.\n> Set Bonus: *+10% damage*",
        defence: 5,
    },

    GoldHelmet: {
        id: "gold_helmet",
        name: "Imperial Gold Helmet",
        description: "A helmet forged of Imperial Gold.\n> Set Bonus: *+10% energy*",
        defence: 7,
    },
    GoldChestplate: {
        id: "gold_chestplate",
        name: "Imperial Gold Chestplate",
        description: "A chestplate forged of Imperial Gold.\n> Set Bonus: *+10% energy*",
        defence: 10,
    },
    GoldBoots: {
        id: "gold_boots",
        name: "Imperial Gold Boots",
        description: "A pair of boots forged of Imperial Gold.\n> Set Bonus: *+10% energy*",
        defence: 5,
    },

    IronHelmet: {
        id: "iron_helmet",
        name: "Stygian Iron Helmet",
        description: "A helmet forged of Stygian Iron.\n> Set Bonus: *+10% health*",
        defence: 7,
    },
    IronChestplate: {
        id: "iron_chestplate",
        name: "Stygian Iron Chestplate",
        description: "A chestplate forged of Stygian Iron.\n> Set Bonus: *+10% health*",
        defence: 10,
    },
    IronBoots: {
        id: "iron_boots",
        name: "Stygian Iron Boots",
        description: "A pair of boots forged of Stygian Iron.\n> Set Bonus: *+10% health*",
        defence: 5,
    },
}

module.exports.getArmour = function(id) {
    return Object.values(module.exports.Armour).find(armour => armour.id === id);
}