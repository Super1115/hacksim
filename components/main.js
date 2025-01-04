import { select } from "@clack/prompts";
import hackSimTitle from './hackSimTitle.js';
import settings from "./settings.js";
import store from 'store';
import hostHackathon from "./hostHackathon.js";
import discussion from "./discussion.js";
import searchFilter from "./searchFilter.js";
import findTeams from "./findTeams.js";

async function main(){
    console.clear();
    hackSimTitle();
    console.log(`Hello! ${store.get('user').name}`);
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

async function myHackathonsMenu() {
  const subMenu = await select({
    message: "My Hackathons - Choose an option",
    options: [
      { value: "discuss", label: "Discussion" },
      { value: "search", label: "Search and Filter Projects" },
      { value: "teams", label: "Find Teams" },
      { value: "back", label: "Back to Main Menu" },
    ],
  });

  switch (subMenu) {
    case "discuss":
      await discussion();
      break;
    case "search":
      await searchFilter();
      break;
    case "teams":
      await findTeams();
      break;
    case "back":
      return main();
  }
}

export default main;
