module.exports.Quests = {
    CampWoods: {
        id: "camp_woods",
        name: "Camp Halfblood Woods",
        description: "Hunt down the rogue monsters left over from last week's capture the flag game!",
        level: 1,
    },
    SeaOfMonsters: {
        id: "sea_of_monsters",
        name: "Sea of Monsters",
        description: "Sail through the Sea of Monsters to recover the Golden Fleece!",
        level: 10,
    },
    Labyrinth: {
        id: "labyrinth",
        name: "Labyrinth",
        description: "Explore the evil Labyrinth to find Daedalus and stop the Titan army!",
        level: 25,
    },
    MountOthrys: {
        id: "mount_othrys",
        name: "Mount Othrys",
        description: "Fight your way through the Titan HQ and defeat Kronos, Lord of Time!",
        level: 50,
    },
    CampJupiter: {
        id: "camp_jupiter",
        name: "Camp Jupiter",
        description: "Team up with the Romans and defeat the monsters on the Fields of Mars!",
        level: 75,
    },
    MareNostrum: {
        id: "mare_nostrum",
        name: "Mare Nostrum",
        description: "Sail across the Mare Nostrum to find and close the Doors of Death!",
        level: 100,
    },
    AncientRome: {
        id: "ancient_rome",
        name: "Ancient Rome",
        description: "Explore the Ancient Roman ruins to find the House of Hades and the Athena Parthenos!",
        level: 150,
    },
    Underworld: {
        id: "underworld",
        name: "Underworld",
        description: "Delve into the Underworld and fight the demons and spirits of Erebos!",
        level: 200,
    },
    Tartarus: {
        id: "tartarus",
        name: "Tartarus",
        description: "Fall into the depths of Tartarus and fight the primordial gods and Gaea's giants!",
        level: 250,
    }
}

module.exports.getQuest = function(id) {
    return Object.values(module.exports.Quests).find(quest => quest.id === id);
}