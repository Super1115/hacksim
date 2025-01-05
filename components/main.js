import { select } from "@clack/prompts";
import hackSimTitle from './hackSimTitle.js';
import settings from "./settings.js";
import store from 'store';
import hostHackathon from "./hostHackathon.js";
import joinHackathon from "./joinHackathon.js";
import myHaclathons from "./myHackathons.js";

async function main(){
    console.clear();
    hackSimTitle();
    console.log(`Hello! ${store.get('user')?.name}`);
    const menu = await select({
        message: 'MENU',
        options: [
          { value: 'host', label: 'Host Hackathon' },
          { value: 'join', label: 'Join'},
          { value: 'my', label: 'My Hackathons'},
          { value: "settings", label: "Settings"},
        { value: 'exit', label: 'Exit'},
        ],
      });
    switch(menu){
        case "host":
            hostHackathon(store.get('user').name,store.get('user').githubID,store.get('user').email);
            break;
        case "join":
            joinHackathon(store.get('user').name,store.get('user').githubID);
            break;
        case "my":
            myHaclathons();
            break;
        case "settings":
            settings();
            break;
        case "exit":
            process.exit(0);
    }
}

export default main;