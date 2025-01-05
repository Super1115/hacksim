import { select } from "@clack/prompts";
import hackSimTitle from './hackSimTitle.js';
import settings from "./settings.js";
import store from 'store';
import hostHackathon from "./hostHackathon.js";
import joinHackathon from "./joinHackathon.js";
import myHackathons from "./myHackathons.js";
import chalk from "chalk";

async function main(){
    console.clear();
    hackSimTitle();
    console.log(chalk.green.bold(`Hello, ${store.get('user')?.name || "Guest"}! 🚀`));
    const menu = await select({
        message: chalk.cyanBright.bold('🎯 MAIN MENU'),
        options: [
            { value: 'host', label: chalk.yellow('🌟 Host Hackathon') },
            { value: 'join', label: chalk.magenta('🤝 Join Hackathon') },
            { value: 'my', label: chalk.blue('📦 My Hackathons') },
            { value: 'settings', label: chalk.gray('⚙️ Settings') },
            { value: 'exit', label: chalk.red('❌ Exit') }
        ],
      });
      switch(menu) {
        case "host":
            console.log(chalk.yellow("🔥 Hosting a new Hackathon..."));
            hostHackathon(store.get('user').name, store.get('user').githubID, store.get('user').email);
            break;
        case "join":
            console.log(chalk.magenta("🤝 Joining a Hackathon..."));
            joinHackathon(store.get('user').name, store.get('user').githubID);
            break;
        case "my":
            console.log(chalk.blue("📦 Fetching your Hackathons..."));
            myHackathons();
            break;
        case "settings":
            console.log(chalk.gray("⚙️ Opening Settings..."));
            settings();
            break;
        case "exit":
            console.log(chalk.red.bold("👋 Exiting... Goodbye!"));
            process.exit(0);
    }
}

export default main;