#!/usr/bin/env node
import hackSimTitle from './components/hackSimTitle.js';
import 'dotenv/config'

import auth from './components/auth.js';

hackSimTitle();


auth(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET);
