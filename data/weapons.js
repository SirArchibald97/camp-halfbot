module.exports.Weapons = {
    BronzeSword: {
        id: "bronze_sword",
        name: "Celestial Bronze Sword",
        description: "A sword forged of Celestial Bronze.",
        damage: 10,
    },
}

module.exports.getWeapon = function(id) {
    return Object.values(module.exports.Weapons).find(weapon => weapon.id === id);
}