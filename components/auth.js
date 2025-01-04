import githubAuth from '../api/githubAuth.js';
import { spinner } from '@clack/prompts';
import hackSimTitle from './hackSimTitle.js';


const s = spinner();

async function auth(client_id, client_secret) {
    console.clear();
    hackSimTitle();
    s.start()
    let data = await githubAuth(client_id, client_secret);
    s.stop()
    return data
}

export default auth;