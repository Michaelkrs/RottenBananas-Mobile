const USER_SERVER_URL = process.env.USER_SERVER_URL || "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis(16391, process.env.REDIS_URL);

const typeDefs = `#graphql
  # === DEFINE TYPES ===
  type User {
    _id: ID!,
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String
  }

  input inputData {
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String
  }

   type addUserResponse {
    id: String,
    email: String,
    username: String
  }

  type deleteUserResponse {
    message: String
  }

  # === QUERIES AND MUTATIONS ===
  type Query {
    users: [User],
    userDetail(userId: ID!): User
  }

  type Mutation {
    addUser(newInput: inputData): addUserResponse,
    deleteUser(userId: ID!): deleteUserResponse
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        let usersCache = await redis.get("users");

        if (usersCache) {
          let usersResult = JSON.parse(usersCache);
          console.log(usersResult);
          return usersResult;
        }

        const { data } = await axios.get(`${USER_SERVER_URL}/users`);
        redis.set("users", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    userDetail: async (_, { userId }) => {
      try {
        const { data } = await axios.get(`${USER_SERVER_URL}/users/${userId}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      try {
        const { newInput } = args;

        const { data } = await axios.post(`${USER_SERVER_URL}/users`, newInput);

        redis.del("users");

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteUser: async (_, { userId }) => {
      try {
        const { data } = await axios.delete(
          `${USER_SERVER_URL}/users/${userId}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
