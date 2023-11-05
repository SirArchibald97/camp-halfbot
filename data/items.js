module.exports.Items = {
    Ambrosia: {
        id: "ambrosia",
        name: "Ambrosia",
        desc: "A food of the gods. Restores 30% of your max energy.",
    },
    Nectar: {
        id: "nectar",
        name: "Nectar",
        desc: "A drink of the gods. Restores 30% of your max health.",
    },
}

module.exports.getItem = function(id) {
    return Object.values(module.exports.Items).find(item => item.id === id);
}