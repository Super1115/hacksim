import { select } from "@clack/prompts";
import hackSimTitle from './hackSimTitle.js';
import settings from "./settings.js";
import store from 'store';
import hostHackathon from "./hostHackathon.js";
import discussion from "./discussion.js"; // New File
import searchFilter from "./searchFilter.js"; // New File
import findTeams from "./findTeams.js"; // New File
import judgingSection from "./judging.js"; // New File

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
          { value: "judge", label: "Judging Section" }, // New option
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
        case "judge":
            console.log("judge"); // Call judging section
            break;
        case "settings":
            settings();
            break;
        case "exit":
            process.exit(0);
    }
}

// Sub Menu of My Hackathon
async function join() {
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
      console.log("discussion");
      break;
    case "search":
      console.log("search");
      break;
    case "teams":
      console.log("teams");
      break;
    case "back":
      return main(); // Return to the main menu
  }
}

export default main;
