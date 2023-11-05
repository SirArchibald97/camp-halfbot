module.exports.Rarity = {
    Common: {
        name: "Common",
        colour: "#AAAAAA",
        health: 10,
        damage: 2,
        xp: 10,
        drops: [
            { item: "ambrosia", chance: 5 },
            { item: "nectar", chance: 5 }
        ]
    },
    Uncommon: {
        name: "Uncommon",
        colour: "#55FF55",
        health: 15,
        damage: 3,
        xp: 15,
    },
    Rare: {
        name: "Rare",
        colour: "#5555FF",
        health: 20,
        damage: 5,
        xp: 20,
    },
    Epic: {
        name: "Epic",
        colour: "#AA00AA",
        health: 30,
        damage: 8,
        xp: 30,
    },
    Legendary: {
        name: "Legendary",
        colour: "#FFAA00",
        health: 45,
        damage: 12,
        xp: 45,
    },
}

module.exports.getRarity = function() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    // chances
    // common: 50%
    // uncommon: 25%
    // rare: 15%
    // epic: 7%
    // legendary: 3%
    if (randomNumber <= 50) return module.exports.Rarity.Common;
    else if (randomNumber <= 75) return module.exports.Rarity.Uncommon;
    else if (randomNumber <= 90) return module.exports.Rarity.Rare;
    else if (randomNumber <= 97) return module.exports.Rarity.Epic;
    else return module.exports.Rarity.Legendary;
}