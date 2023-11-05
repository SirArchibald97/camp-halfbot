module.exports.Weapons = {
    Sword: {
        id: "sword",
        name: "Sword",
        description: "",
    },
}

module.exports.getWeapon = function(id) {
    return Object.values(module.exports.Weapons).find(weapon => weapon.id === id);
}