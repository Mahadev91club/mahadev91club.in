Mahadev91Club (Coins-only) - EJS + Express + MongoDB
Features:
- EJS pages: Home, Login, Register, Game
- JWT cookie auth
- Coins wallet (bonus add), VIP-ready
- Color game endpoint with VIP bonus on wins
- Admin users list + add coins

Quick Start
1) Copy `.env.example` to `.env` and edit your Mongo URI + JWT secret.
2) Install & run:
   npm install
   npm start
Open: http://localhost:3000

Admin
- Make a user admin by setting `isAdmin:true` in MongoDB.
Example:
db.users.updateOne({phone:"123"}, {$set:{isAdmin:true}})

Legal
- Coins-only entertainment. No withdrawal/cash-out.
