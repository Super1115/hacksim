import githubAuth from '../api/githubAuth.js';
import * as p from "@clack/prompts";

const s = p.spinner();

async function auth(client_id, client_secret) {
    s.start()
    await githubAuth(client_id, client_secret);
    s.stop()
}

export default auth;