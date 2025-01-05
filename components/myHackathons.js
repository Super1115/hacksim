import User from '../models/User.js';
import Hackathon from '../models/Hackathon.js';
import store from 'store';
import { select, confirm } from "@clack/prompts";
import hackathonInfo from './hackathonInfo.js';
import main from './main.js';
import hackSimTitle from './hackSimTitle.js';

async function myHackathons() {
    console.clear();
    hackSimTitle();
    const userData = await User.findOne({ githubID: store.get("user").githubID });
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

    if(selectedHackathon === 'back'){
        main()
    }

    console.clear();
    hackSimTitle();

    let hackathonData = await Hackathon.findOne({ id: selectedHackathon });
    hackathonInfo(hackathonData.id,hackathonData.host,hackathonData.startTime,hackathonData.endTime,hackathonData.website,hackathonData.contact, hackathonData.md)
    await confirm({message: 'Back?',default: true})
    main()
}

export default myHackathons;