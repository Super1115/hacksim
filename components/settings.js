import { select,confirm } from "@clack/prompts";
import store from "store";
import inquirer from "inquirer";
import cliMd from 'cli-markdown';
import main from "./main.js";

async function md(){
    const user = store.get("user");
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
            md();
            break
            
        case "view":
            console.log(cliMd(user.md));
            if(await confirm({
                message: 'Back to menu?',
                default: true
              })){
                  md();
                  break
              }
    }
}

async function settings() {
    console.clear();
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
