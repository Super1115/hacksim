#!/usr/bin/env node
import hackSimTitle from './components/hackSimTitle.js';
import 'dotenv/config'

import auth from './components/auth.js';
import main from './components/main.js';
import { storeUser } from './api/storeLocal.js';


let githubUser = await auth(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET)

storeUser({ "githubID": githubUser.login, "name": githubUser.name, "email": githubUser.email, "githubUrl": githubUser.html_url });

console.clear();



main();


