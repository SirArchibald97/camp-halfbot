module.exports.MonsterType = {
    Normal: "Normal",
    Water: "Water",
    Flying: "Flying",
    Underworld: "Underworld"
}

module.exports.Monsters = {
    // NORMAL (4)
    Basilisk: {
        id: "basilisk",
        name: "Basilisk",
        type: module.exports.MonsterType.Normal,
    },
    Centaur: {
        id: "centaur",
        name: "Centaur",
        type: module.exports.MonsterType.Normal,
    },
    Blemmyae: {
        id: "blemmyae",
        name: "Blemmyae",
        type: module.exports.MonsterType.Normal,
    },
    Empousa: {
        id: "empousa",
        name: "Empousa",
        type: module.exports.MonsterType.Normal,
    },

    // WATER (4)
    Hydra: {
        id: "hydra",
        name: "Hydra",
        type: module.exports.MonsterType.Water,
    },
    Siren: {
        id: "siren",
        name: "Siren",
        type: module.exports.MonsterType.Water,
    },
    Telekhines: {
        id: "telekhines",
        name: "Telekhines",
        type: module.exports.MonsterType.Water,
    },
    Cyclops: {
        id: "cyclops",
        name: "Cyclops",
        type: module.exports.MonsterType.Normal,
    },

    // FLYING (5)
    Harpy: {
        id: "harpy",
        name: "Harpy",
        type: module.exports.MonsterType.Flying,
    },
    StymphalianBird: {
        id: "stymphalian_bird",
        name: "Stymphalian Bird",
        type: module.exports.MonsterType.Flying,
    },
    Griffon: {
        id: "griffon",
        name: "Griffon",
        type: module.exports.MonsterType.Flying,
    },
    Eagle: {
        id: "eagles",
        name: "Eagle",
        type: module.exports.MonsterType.Flying,
    },
    Dragon: {
        id: "dragon",
        name: "Dragon",
        type: module.exports.MonsterType.Flying,
    },
    
    // UNDERWORLD (4)
    SkeletonSoldier: {
        id: "skeleton_soldier",
        name: "Skeleton Soldier",
        type: module.exports.MonsterType.Underworld,
    },
    Hellhound: {
        id: "hellhound",
        name: "Hellhound",
        type: module.exports.MonsterType.Underworld,
    },
    Fury: {
        id: "fury",
        name: "Fury",
        type: module.exports.MonsterType.Underworld,
    },
    Eidolon: {
        id: "eidolon",
        name: "Eidolon",
        type: module.exports.MonsterType.Underworld,
    },

}

module.exports.getMonster = function(id) {
    return Object.values(module.exports.Monsters).find(monster => monster.id === id);
}

module.exports.getRandomMonster = function() {
    const monsters = Object.values(module.exports.Monsters);
    return monsters[Math.floor(Math.random() * monsters.length)];
}