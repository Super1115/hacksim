import User from '../models/User.js';
import Hackathon from '../models/Hackathon.js';
import store from 'store';
import { select, confirm } from "@clack/prompts";
import hackathonInfo from './hackathonInfo.js';
import main from './main.js';
import hackSimTitle from './hackSimTitle.js';
import hackathonHostSettings from './hackathonHostSettings.js';
import manageHackathonParticipants from "./manageHackathonParticipants.js"
import searchParticipants from "./searchParticipants.js"
import teams from "./teams.js"

async function myHackathons() {
    console.clear();
    hackSimTitle();
    const userData = await User.findOne({ githubID: store.get("user").githubID });
    if (!userData.hackathons || userData.hackathons.length === 0) {
        await confirm({ message: 'You do not have any hackathons. Returning to main page.' });
        return main();
    }
    const hackathonChoices = userData.hackathons.map(hackathon => {
        let label = `${hackathon.hackathonId} (${hackathon.role})`;
        if (hackathon.role === 'host') {
            label = `\x1b[32m${hackathon.hackathonId} (host)\x1b[0m`; // Green for host
        } else if (hackathon.role === 'judge') {
            label = `\x1b[33m${hackathon.hackathonId} (judge)\x1b[0m`; // Yellow for judge
        }
        return {
            value: hackathon.hackathonId,
            label: label
        };
    });

    const selectedHackathon = await select({
        message: 'My Hackathons:',
        options: hackathonChoices
    });

    console.clear();
    hackSimTitle();

    let hackathonData = await Hackathon.findOne({ id: selectedHackathon });
    hackathonInfo(hackathonData.id,hackathonData.host,hackathonData.startTime,hackathonData.endTime,hackathonData.website,hackathonData.contact, hackathonData.md)
    let menuOptions = [
        { value: 'teamProject', label: 'My Team/Project' }, 
        { value: 'searchParticipants', label: 'Participants' }, //
        { value: 'other', label: 'Teams' },
        { value: 'main', label: 'Back to main page' } //
    ];
    if (hackathonData.participants.find(user => user.githubID === store.get("user").githubID).role === 'judge' || hackathonData.participants.find(user => user.githubID === store.get("user").githubID).role === 'host') {
        menuOptions.unshift({ value: 'judge', label: 'Judge' });
    }
    if (hackathonData.participants.find(user => user.githubID === store.get("user").githubID).role === 'host') {
        menuOptions.unshift({ value: 'manage', label: 'Manage Participants' }); //
        menuOptions.unshift({ value: 'hostSettings', label: 'Host Settings' }); //
    }

    const menu = await select({
        message: 'Hackathon MENU',
        options: menuOptions
    });

    switch(menu){
        case "teamProject":

            break;
        case "searchParticipants":
            searchParticipants(hackathonData)
            break;
        case "other":
            teams(hackathonData)
            break;
        case "judge":
    
            break;
        case "main":
            main();
            break;
        case "manage":
            manageHackathonParticipants(hackathonData)
            break
        case "hostSettings":
            hackathonHostSettings(hackathonData)
            break
    }
}

export default myHackathons;