🚀 InstaCLI

A fully functional Instagram-style Social Media CLI Application built with Node.js, Express, MongoDB, and published as an npm package.

Interact with a social platform directly from your terminal — no browser, no distractions.

📦 Installation

Make sure Node.js (v18+) is installed.

Install globally via npm:

npm install -g insta-cli-prince47


After installation:

insta --help


You’re ready to go 🚀

🌐 Backend API

Hosted on Render
Built with Express + MongoDB
Handles authentication, posts, likes, comments, follow system, and pagination.

⚙️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Cloudinary (Image Uploads)

Commander.js (CLI framework)

Axios (API communication)

Cursor-based Pagination

npm (Global CLI Distribution)

🔐 Authentication Flow

JWT-based authentication

Token stored locally in CLI

Automatically attached to protected requests

Secure middleware verification

💻 Available Commands
👤 Authentication
insta register -u <username> -e <email> -p <password>
insta login -e <email> -p <password>
insta logout

📰 Feed
insta feed


Displays latest posts

Shows:

Username

Author ID

Post ID

Image URL

Caption

Likes count

Comments count

Uses cursor-based pagination for efficient loading

📸 Upload Post
insta post upload -i <imagePath> -c "caption"


Example:

insta post upload -i C:\Users\User\Desktop\photo.jpg -c "Hello from CLI"


Uploads image to Cloudinary via backend.

❤️ Like / Unlike Post
insta like <postId>


Toggles like status.

💬 Comment on Post
insta comment <postId> "Nice post 🔥"

👥 Follow / Unfollow Users
insta follow <userId>
insta unfollow <userId>

🔍 Search Users
insta search <username>


Returns top 7 matching users

Displays user IDs for quick follow

👤 View Profile
insta profile <userId>


Shows:

Username

Followers count

Following count

User’s posts

🧠 Advanced Features
✅ Cursor-Based Pagination

Efficient feed loading using MongoDB _id cursor instead of skip/limit.

✅ Token Auto Injection

CLI automatically attaches JWT token to every protected API call.

✅ Cloudinary Integration

Secure backend-based image uploads.

✅ Clean Terminal Output

Structured, readable formatting for better UX.
