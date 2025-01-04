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
    const hackathonChoices = userData.hackathons.map(hackathon => ({
        value: hackathon.hackathonId,
        label: hackathon.hackathonId
    }));

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