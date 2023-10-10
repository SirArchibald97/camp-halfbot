const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({ intents: Object.values(GatewayIntentBits).filter(value => isNaN(value)), partials: [Partials.Message, Partials.Channel, Partials.Reaction] });
client.login(process.env.TOKEN);

const eventFiles = fs.readdirSync("./events");
for (let file of eventFiles) {
    let event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
}

// error handling
process.on("uncaughtException", function(err) {
    console.log("\u001b[31m───── Uncaught Exception Error Start ─────\u001b[0m");
    console.log(err);
    console.log("\u001b[31m───── Uncaught Exception Error End ─────\u001b[0m");
});

process.on("unhandledRejection", function(err) {
    console.log("\u001b[31m───── Uncaught Rejection Error Start ─────\u001b[0m");
    console.log(err);
    console.log("\u001b[31m───── Uncaught Rejection Error End ─────\u001b[0m");
});