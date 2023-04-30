const { config } = require("dotenv");
const path = require("path");
const parseArgs = require("minimist");

const options = {
  alias: { e: "environment" },
  default: { environment: "development" },
};
const { environment } = parseArgs(process.argv.slice(2), options);

const envFileName = `${environment}.env`;

if (envFileName === "development.env")
  config({
    path: path.resolve(process.cwd(), envFileName),
  });

module.exports = {
  NODE_ENV: environment || "development",
  PORT: process.env.PORT || 8080,
  MONGO_DATA_BASE_URL: process.env.MONGO_DATA_BASE_URL,
  PERSISTENCE: process.env.PERSISTENCE || "file",
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "3600s",
  CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  MAIL_ADDRESS: process.env.MAIL_ADDRESS,
  MAIL_PASS: process.env.MAIL_PASS,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
