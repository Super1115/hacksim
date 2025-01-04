import hackSimTitle from "./hackSimTitle.js";
import * as p from '@clack/prompts';
import inquirer from 'inquirer';


async function hostHackathon(hostName, hostUID, hostEmail) {
    console.clear();
    hackSimTitle();

    const hackathonDetails = {};

    hackathonDetails.id = await p.text({ 
        message: 'What will be the hackathon\'s name(ID)?', 
        validate(value) {
            if (value.length === 0) return 'Value is required!';
        }
    });

    hackathonDetails.host = hostUID;

    const startTimeInput = await p.text({ 
        message: 'Enter the start time (YYYY-MM-DD HH:MM):', 
        validate(value) {
            const timeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
            if (!timeRegex.test(value)) {
                return 'Invalid time format. Please use YYYY-MM-DD HH:MM.';
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
        hackathonDetails.readme = readmeContent.editedContent;
    } else {
        hackathonDetails.readme = '';
    }

    hackathonDetails.participants = { 
        githubID: hostUID, 
        name: hostName, 
        team: null, 
        role: 'host' 
    };

    return hackathonDetails;
}


export default hostHackathon;