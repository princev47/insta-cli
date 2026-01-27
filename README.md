🚀 InstaCLI

Instagram from your Terminal

InstaCLI is a CLI-based Instagram-like application built using the MERN stack, where users can authenticate, upload images, view their feed, like posts, and comment — all from the terminal.

This project demonstrates real-world backend engineering combined with a Node.js CLI client, making it a unique and standout portfolio project.

✨ Features
🔐 Authentication

JWT-based login & logout

Secure token storage for CLI

Protected routes using middleware

👥 Social Graph

Follow / unfollow users

Bi-directional follower–following consistency

🖼️ Posts

Upload images via CLI

Backend handles uploads to Cloudinary

Stores only optimized image URLs in MongoDB

Optional captions

📰 Feed (Timeline)

Shows posts from followed users + self

Sorted by newest first

Optimized MongoDB queries

❤️ Engagement

Like / unlike posts

Comment on posts

Fetch comments per post

🖥️ CLI Experience

Fully functional terminal commands

Global CLI command (insta)

No browser or UI required

🛠️ Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Cloudinary (image storage)

express-fileupload

CLI

Node.js

Commander.js

Axios

form-data

fs-extra
