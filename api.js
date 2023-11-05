const API_HEADERS = { "Content-Type": "application/json", auth: process.env.API_KEY }

const get = async (url) => {
    const res = await fetch(`${process.env.BASE_URL}${url}`, { method: "GET", headers: API_HEADERS });
    return await res.json();
}
const post = async (url, data) => {
    const res = await fetch(`${process.env.BASE_URL}${url}`, { method: "POST", headers: API_HEADERS, body: JSON.stringify(data) });
    return await res.json();
}

module.exports = {
    // PLAYERS
    getPlayer: async function(userId) { return await get(`/players/${userId}`); },
    createPlayer: async function(userId, godlyParent) { return await post(`/players/new`, { user_id: userId, parent: godlyParent }); },
    updatePlayer: async function(userId, player) { return await post(`/players/${userId}/update`, { player: player }); },
    
    getCooldowns: async function(userId) { return await get(`/cooldowns/${userId}`); },
    setCooldown: async function(userId, cooldown) { return await get(`/cooldowns/${userId}/${cooldown}`); },

    // LEADERBOARDS
    getLeaderboard: async function(leaderboard) { return await get(`/leaderboards/${leaderboard}`); },
}