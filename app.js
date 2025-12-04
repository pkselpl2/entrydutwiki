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
