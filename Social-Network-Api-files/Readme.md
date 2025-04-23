# Social Network API

## Description
The Social Network API is a backend application that simulates the core features of a social media platform. Built with TypeScript, Express, and MongoDB, it allows users to:
- Create and manage accounts
- Share thoughts (posts)
- React to posts with comments
- Add or remove friends

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- TypeScript
- Dotenv
- Insomnia (for API testing)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/social-network-api.git
```
2. Navigate to the project directory:
```bash
cd social-network-api
```
3. Install dependencies:
```bash
npm install
```
4. Create a `.env` file with the following:
```env
MONGODB_URI=mongodb://localhost:27017/socialNetworkDB
```
5. Start MongoDB:
```bash
mongod
```
6. Build and start the server:
```bash
npm run start
```

## Usage
Use Insomnia or Postman to test the following routes:

### Accounts
- `POST /api/accounts`
- `GET /api/accounts`
- `GET /api/accounts/:accountId`
- `PUT /api/accounts/:accountId`
- `DELETE /api/accounts/:accountId`

### Friends
- `POST /api/accounts/:accountId/friends/:friendId`
- `DELETE /api/accounts/:accountId/friends/:friendId`

### Posts
- `POST /api/posts`
- `GET /api/posts`
- `GET /api/posts/:postId`
- `PUT /api/posts/:postId`
- `DELETE /api/posts/:postId`

### Comments
- `POST /api/posts/:postId/comments`
- `DELETE /api/posts/:postId/comments/:commentId`

## Contributing
Feel free to fork the repository and submit pull requests.

## Testing
Use Insomnia to interact with all routes. Ensure MongoDB is running before testing.

## Credits
Created by Caleb Feliciano as part of the Rutgers Full-Stack Bootcamp. Utilized Copilot and Chatgpt for debugging.

## License
MIT

## Questions
- GitHub: [@Calebfeliciano](https://github.com/Calebfeliciano)
- Email: [caleb.feliciano11@gmail.com](mailto:caleb.feliciano11@gmail.com)

