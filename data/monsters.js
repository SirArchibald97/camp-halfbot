module.exports.MonsterType = {
    Normal: "Normal",
    Water: "Water",
    Flying: "Flying",
    Underworld: "Underworld"
}

module.exports.Monsters = {
    Basilisk: {
        id: "basilisk",
        name: "Basilisk",
        type: module.exports.MonsterType.Normal,
    },
    Blemmyae: {
        id: "blemmyae",
        name: "Blemmyae",
        type: module.exports.MonsterType.Normal,
    },
    Centaur: {
        id: "centaur",
        name: "Centaur",
        type: module.exports.MonsterType.Normal,
    },
    Cyclops: {
        id: "cyclops",
        name: "Cyclops",
        type: module.exports.MonsterType.Water,
    },
    Dracaenae: {
        id: "dracaenae",
        name: "Dracaenae",
        type: module.exports.MonsterType.Normal,
    },
    Drakon: {
        id: "drakon",
        name: "Drakon",
        type: module.exports.MonsterType.Normal,
    },
    Empousa: {
        id: "empousa",
        name: "Empousa",
        type: module.exports.MonsterType.Normal,
    },
    Eidolon: {
        id: "eidolon",
        name: "Eidolon",
        type: module.exports.MonsterType.Normal,
    },
    Hellhound: {
        id: "hellhound",
        name: "Hellhound",
        type: module.exports.MonsterType.Underworld,
    },
    Hydra: {
        id: "hydra",
        name: "Hydra",
        type: module.exports.MonsterType.Water,
    },
    Karpoi: {
        id: "karpoi",
        name: "Karpoi",
        type: module.exports.MonsterType.Normal,
    },
    Laistrygonian: {
        id: "laistrygonian",
        name: "Laistrygonian",
        type: module.exports.MonsterType.Normal,
    },
    Myrmeke: {
        id: "myrmeke",
        name: "Myrmeke",
        type: module.exports.MonsterType.Normal,
    },
    Skeleton: {
        id: "skeleton",
        name: "Skeleton",
        type: module.exports.MonsterType.Underworld,
    },
    Ventus: {
        id: "ventus",
        name: "Ventus",
        type: module.exports.MonsterType.Flying,
    }
}

module.exports.getMonster = function(id) {
    return Object.values(module.exports.Monsters).find(monster => monster.id === id);
}

module.exports.getRandomMonster = function() {
    const monsters = Object.values(module.exports.Monsters);
    return monsters[Math.floor(Math.random() * monsters.length)];
}