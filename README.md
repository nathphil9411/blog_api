# BLOG API(version: 1.0.0)

This blog API would help in managing articles and user accounts of the blog. It could be able to create, read, update and delete articles.

## Project Overview

The blog API will allow users to perform the following operations:
-Create a new account
-Login to an existing account
-Create a new article by authorized users
-Retrieve all the by all users
-Retrieve a single article by ID by all users
-Retrieve a collection of articles filtered by owner, state, etc.
-Update an existing article in the draft state
-Delete a article

## Setup Instructions

Follow these steps to setup and run the project:

1. **Clone the repository if you have not done it already**
   `git clone `

2. **Install Dependencies**:
   `npm install `

3. **Set up the database**:
   -Mongodb have been choosen for this project. Make sure you have MongoDB installed and running on your local machine or use a cloud-based MongoDB service like MongoDB Atlas. I am using Atlas for this blog API
   -Update the database connection string in the '.env' file with your MongoDB URI.

   > [!WARNING]
   > Always add '.env' files in the .gitIgnore file before commiting your code

4. **Start the Server**:
   `npm Start`

   > [!NOTE]
   > Ensure that the package.json file has a start script in the the scripts.

5. _Explore the API_:

- Once the server is running, you can interact with the API using tools like cURL, Postman (preferably), or your browser.
- Refer to the API documentation for a list of available endpoints and how to use them.

## Implementation Details

The Blog API is implemented using Node.js and Express.js framework. It utilizes MongoDB as the database for storing users and articles, bycryt for hashing and JWT for authorization. Mongoose as the ODM (Object-Document Mapper) for interacting with MongoDB.

The API includes the following endpoints:

- POST /api/v1/users/signup: Signup a new user
- POST /api/v1/user/signin: User login
- POST /api/v1/articles: Create a new article
- GET /api/v1/articles: Retrieve a list of all articles
- GET /api/v1/articles/:id: Retrieve a single article by its ID
- PATCH /api/v1/articles/:id: Update an existing article
- DELETE /api/v1/articles/:id: Delete an article

## Additional Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/): Learn more about MongoDB and how to set it up.
- [Mongoose Official Documentation](https://mongoosejs.com/docs/): Explore the features and functionalities of Mongoose for MongoDB.
- [Express.js Official Documentation](https://expressjs.com/): Refer to the Express.js documentation for information on building web applications with Node.js.

## Share Your Progress

Quite an Insigthful second semester exam for altSchool Africa.

Happy coding!
