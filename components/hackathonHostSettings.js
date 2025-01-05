import { select,confirm } from "@clack/prompts";
import inquirer from "inquirer";
import cliMd from 'cli-markdown';
import hackSimTitle from "./hackSimTitle.js";
import myHackathons from "./myHackathons.js";


async function md(hackathonDataObject){
    console.clear();
    console.log(hackathonDataObject)
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
                    default: hackathonDataObject?.md || ''
                }
            ]);
            hackathonDataObject.md = editedContent;
            await hackathonDataObject.save();
            break
            
        case "view":
            console.clear();
            console.log(cliMd(hackathonDataObject?.md||""));
            if(await confirm({
                message: 'Back to menu?',
                default: true
              })){
                  break
              }
    }
}

async function hackathonHostSettings(hackathonDataObject) {
    console.clear();
    hackSimTitle();
    const menu = await select({
        message: 'HOST SETTINGS',
        options: [
            { value: 'md', label: 'README.md' },
            { value: 'back', label: 'Back' }
        ],
    });
    switch (menu) {
        case "md":
            await md(hackathonDataObject);
            hackathonHostSettings()
            break
        case "back":
            myHackathons();
            break
    }

}

export default hackathonHostSettings;
