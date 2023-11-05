module.exports.Artefacts = {
    PoseidonsTrident: {
        id: "poseidons_trident",
        name: "Poseidon's Trident",
        description: "Poseidon's prized weapon! Deals 50% more damage to water monsters.",
    },
    MasterBolt: {
        id: "master_bolt",
        name: "Master Bolt",
        description: "Zeus' prized weapon! Deals 50% more damage to air monsters.",
    },
}

module.exports.getArtefact = function(id) {
    return Object.values(module.exports.Artefacts).find(artefact => artefact.id === id);
}