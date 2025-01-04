#!/usr/bin/env node
import hackSimTitle from "./components/hackSimTitle.js";
import "dotenv/config";

import auth from "./components/auth.js";
import main from "./components/main.js";
import { storeUser } from "./api/storeLocal.js";
import connectDB from "./utils/db.js";
import User from "./models/User.js";


await connectDB();



let githubUser = await auth(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET
);


try {
    let newUser = await User.findOne({ githubID: githubUser.login });
    if (!newUser) {
        newUser = await User.create({
            githubID: githubUser.login,
            name: githubUser.name,
            email: githubUser.email,
            githubUrl: githubUser.html_url,
        });
        newUser.save();
    }

    storeUser(newUser);

} catch (error) {
    console.error("Error storing user in database: ", error.message);
}


main();
