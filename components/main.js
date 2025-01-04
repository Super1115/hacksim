import { select } from "@clack/prompts";
import hackSimTitle from './hackSimTitle.js';
import settings from "./settings.js";


async function main(){
    console.clear();
    hackSimTitle();
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
            console.log("hosting");
            break;
        case "join":
            console.log("joining");
            break;
        case "my":
            console.log("my hackathons");
            break;
        case "settings":
            settings();
            break;
        case "exit":
            process.exit(0);
    }
}

export default main;