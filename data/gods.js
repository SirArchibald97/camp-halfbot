module.exports.Gods = {
    Zeus: {
        name: 'Zeus',
        move: 'Lightning Fist',
        colour: '#ffed47',
        emoji: '<:Zeus:1161423833455140936>',
    },
    Poseidon: {
        name: 'Poseidon',
        move: 'Tidal Storm',
        colour: '#47a3ff',
    },
    Hades: {
        name: 'Hades',
        move: 'Undead Summons',
        colour: '#271145',
    },
    Ares: {
        name: 'Ares',
        move: 'Battle Frenzy',
        colour: '#c44337',
    },
    Athena: {
        name: 'Athena',
        move: 'Foresight',
        colour: '#c2c2c2',
    },
    Aphrodite: {
        name: 'Aphrodite',
        move: 'Charmspeak',
        colour: '#fa9be8',
    },
    Apollo: {
        name: 'Apollo',
        move: 'True Aim',
        colour: '#f7f283',
    },
    Hermes: {
        name: 'Hermes',
        move: 'Swift Strike',
        colour: '#7bcadb',
    },
    Dionysus: {
        name: 'Dionysus',
        move: 'Vine Swarm',
        colour: '#9e36ba',
    },
    Demeter: {
        name: 'Demeter',
        move: 'Winter\'s Wrath',
        colour: '#56bf41',
    },
    Hephaestus: {
        name: 'Hephaestus',
        move: 'Flamethower',
        colour: '#d17213',
    },
}

module.exports.getGod = function(id) {
    return module.exports[id];
}