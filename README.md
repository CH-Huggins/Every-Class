# Government-Secrets

Monday, September 5th 2022:
Finished the CSS and HTML on the home page featuring the sign up and log in
buttons. Functionality for the buttons has not been completed but the buttons
at least exist now.

Tuesday, September 13th 2022:
Gradually finished the log in and sign up html pages as well as css on both of
them. Added back buttons to both pages that bring the computer to "history(-1)"
in case refreshes were done to avoid the back just keeping them on the same page.

Thursday, September 29th 2022:
Set up registration and login controllers and methods. Still not fully developed
but well on their way.

Thursday, October 6th 2022:
Added users table in database.
Log in validation is working.
Things to fix: The input display on the index
        4:15 PM:
        Users table was modified, now we are implementing uuid as our user's ID
        Index was fixed.

Friday, October 14th 2022:
        Schema.sql was modified -> All the majors are available now

Sunday, October 23rd 2022:
        Session management is working (so far). This last commit was after Jacob's update.

# base-code (Read for install instructions)
The foundation needed for a website to avoid repetition.

1. npm
2. yes to everything, insert name when needed
3. install packages


List of Packages:
npm install argon2
= no clue =

npm install better-sqlite3
= database =

npm install connect-redis
= server security, development v production =

npm install helmet
= express security =

npm install dotenv
= environment file =

npm install ejs
= ejs files =

npm install express
= express =

npm install express-session
= express sessions =

npm install joi
= validators =

npm install json
= json =

npm install node-fetch@2
= api stuff =

npm install nodemon
= on the fly website changes =

npm install redis
= server management =

npm install redis-server
= more server management =

npm install schema
= validators =

npm install superagent
= no clue =

Controllers:
Anything that renders or utilizes the models

Models:
Anything that interacts with databases or functions

public:
All html, media, and fonts

utils:
Error handling

Validators:
Valitor maker and any other validators

views:
All ejs files