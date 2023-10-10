module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}!`);

    const deploy = require("../deploy.js");
    await deploy(client);
}