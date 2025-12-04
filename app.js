// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/user/:name", async (req, res) => {
    const { name } = req.params;
    const html = await fetch(`https://playentry.org/profile/${name}`).then(r => r.text());
    
    res.json({
        username: name,
        works: 0,
        followers: 0,
        followings: 0,
        profileUrl: `https://playentry.org/profile/${name}`
    });
});

app.listen(3000, () => console.log("Proxy server running"));
