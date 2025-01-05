import hackSimTitle from "./hackSimTitle.js";
import * as p from '@clack/prompts';
import inquirer from 'inquirer';
import mongoose from 'mongoose';
import Hackathon from '../models/Hackathon.js';
import main from "./main.js";
import checkIfHackathonExists from '../api/checkIfHackathonExists.js';
import User from "../models/User.js";

async function hostHackathon(hostName, hostUID, hostEmail) {
    console.clear();
    hackSimTitle();

    const hackathonDetails = {};

    while (true) {
        hackathonDetails.id = await p.text({ 
            message: 'What will be the hackathon\'s name(ID)?', 
        });
        if (await checkIfHackathonExists(hackathonDetails.id)) {
            console.log('Hackathon with the same ID already exists.');
        } else {
            break;
        }
}


    hackathonDetails.host = hostUID;

    const startTimeInput = await p.text({ 
        message: 'Enter the start time (YYYY-MM-DD HH:MM):', 
        validate(value) {
            const timeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
            if (!timeRegex.test(value)) {
                return 'Invalid time format. Please use YYYY-MM-DD HH:MM.';
            }
            const startTime = new Date(value).getTime() / 1000;
            if (isNaN(startTime) || startTime <= 0) {
                return 'Invalid Unix time. Please enter a valid date and time.';
            }
            if (value.length === 0) return 'Value is required!';
        }
    });
    hackathonDetails.startTime = new Date(startTimeInput).getTime() / 1000;

    const endTimeInput = await p.text({ 
        message: 'Enter the end time (YYYY-MM-DD HH:MM):', 
        validate(value) {
            const timeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
            if (!timeRegex.test(value)) {
                return 'Invalid time format. Please use YYYY-MM-DD HH:MM.';
            }
            const endTime = new Date(value).getTime() / 1000;
            if (isNaN(endTime) || endTime <= 0) {
                return 'Invalid Unix time. Please enter a valid date and time.';
            }
            if (value.length === 0) return 'Value is required!';
        }
    });
    hackathonDetails.endTime = new Date(endTimeInput).getTime() / 1000;

    hackathonDetails.website = await p.text({ 
        message: 'Enter the website:', 
        hint: 'Optional' 
    });

    hackathonDetails.contact = await p.text({ 
        message: 'Enter the contact email (default: user email):',
        initialValue: hostEmail,
        validate(value) {
            if (value.length === 0) return 'Value is required!';
        }
    });

    const addReadme = await p.confirm({ 
        message: 'Do you want to add README.md?', 
        default: true 
    });
    if (addReadme) {
        const readmeContent = await inquirer.prompt([
            {
                type: 'editor',
                name: 'editedContent',
                message: 'Edit the content:'
            }
        ]);
        hackathonDetails.md = readmeContent.editedContent;
    } else {
        hackathonDetails.md = '';
    }

    hackathonDetails.participants = [{ 
        githubID: hostUID, 
        name: hostName, 
        team: null, 
        role: 'host' 
    }];
    hackathonDetails.team=
      [{
        id: `*${hostUID}`,
        members : [hostUID],
        leader: hostUID
      }]


    const newHackathon = await Hackathon.create(hackathonDetails);

    const userDb = await User.findOne({ githubID: hostUID });
    userDb.hackathons.push({hackathonId: hackathonDetails.id, role: 'host'});
    userDb.save();
    
    console.log('Hackathon created successfully!',hackathonDetails);

      main();
          
      
}


export default hostHackathon;