import { select,confirm } from "@clack/prompts";
import store from "store";
import inquirer from "inquirer";
import cliMd from 'cli-markdown';
import main from "./main.js";
import hackSimTitle from "./hackSimTitle.js";
import User from "../models/User.js";


async function md(){
    const user = await User.findOne({ githubID: store.get("user").githubID });
    console.clear();
    const menu = await select({
        message: 'README.md',
        options: [
            { value: 'edit', label: 'Edit' },
            { value: 'view', label: 'Preview' }
        ],
    });
    switch (menu) {
        case "edit":
            const { editedContent } = await inquirer.prompt([
                {
                    type: 'editor',
                    name: 'editedContent',
                    message: 'Edit the content:',
                    default: user.md
                }
            ]);
            user.md = editedContent;
            store.set("user", user);
            await user.save();
            break
            
        case "view":
            console.clear();
            console.log(cliMd(user.md||""));
            if(await confirm({
                message: 'Back to menu?',
                default: true
              })){
                  break
              }
    }
}

async function settings() {
    console.clear();
    hackSimTitle();
    const menu = await select({
        message: 'SETTINGS',
        options: [
            { value: 'md', label: 'README.md' },
            { value: 'back', label: 'Back' }
        ],
    });
    switch (menu) {
        case "md":
            await md();
            settings()
            break
        case "back":
            main();
            break
    }

}

export default settings;
