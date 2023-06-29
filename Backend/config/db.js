const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.URL);

const { createClient } = require("redis");

const client = createClient({
    password: 'hkOV8wBPrUIEqy6CJIsqhgC6DYfglQ7a',
    socket: {
        host: 'redis-11307.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 11307
    }
});

module.exports={
    connection,
    client
}