import { select,confirm } from '@clack/prompts';
import hackSimTitle from './hackSimTitle.js';
import main from "./main.js"
import User from '../models/User.js';
import store from 'store';
import cliMd from 'cli-markdown';
import Hackathon from '../models/Hackathon.js';
import inquirer from "inquirer"


async function md(md){

        const mdMenu = await select({
            message: 'README.md',
            options: [
                { value: 'edit', label: 'Edit' },
                { value: 'view', label: 'Preview' }
            ],
        });
        if(mdMenu=== "edit") {
                const { editedContent } = await inquirer.prompt([
                    {
                        type: 'editor',
                        name: 'editedContent',
                        message: 'Edit the content:',
                        default: teamData ? md || "" : ""
                    }
                ]);
                md = editedContent;
                await teamData.save();
                
            }
            else if (mdMenu==="view"){

                console.clear();
                console.log(cliMd(teamData ? md || "" : ""));
                await confirm({
                    message: 'Back to menu?',
                    default: true
                  })
                      
            }   
        }

async function teamAndProject(hackathonDataObject){
    console.clear();
    hackSimTitle();
    let menuOptions = [
        { value: 'md', label: 'README.md' },
        { value: 'main', label: 'Back to Main' },
    ]

    const teamData = hackathonDataObject.team.find(team => team.members.includes(store.get("user").githubID));
    console.log(teamData)
    if(teamData && teamData.isSubmit){
        menuOptions.unshift({ value: 'unsubmit', label: 'unSubmit' })
    }
    else{
        menuOptions.unshift({ value: 'submit', label: 'Submit' })
        
    }

    const menu = await select({
            message: 'Team MENU',
            options: menuOptions 
        });
    if(menu === "main"){
        main();
    } else if(menu === "submit"){
        
            console.log("Submit");
            teamData.isSubmit = true;
            await Hackathon.updateOne(
                { "team.members": store.get("user").githubID },
                { $set: { "team.$.isSubmit": true } }
            );
            main();

        }
     else if(menu === "unsubmit"){
       
            teamData.isSubmit = false;
            await Hackathon.updateOne(
                { "team.members": store.get("user").githubID },
                { $set: { "team.$.isSubmit": false } }
            );
            main();
        }
     else if(menu === "md"){
        md(teamData.md);
    }
}
      
    
    


export default teamAndProject