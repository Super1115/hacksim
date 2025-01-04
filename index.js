#!/usr/bin/env node
import hackSimTitle from './components/hackSimTitle.js';
import 'dotenv/config'

import githubAuth from './components/githubAuth.js';

hackSimTitle();


const authData = await githubAuth(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET);
console.log(authData);
