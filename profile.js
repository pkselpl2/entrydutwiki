async function loadProfile(userId) {
    const url = `https://proxy-server.kkammailbox.workers.dev/`;
    const res = await fetch(url);
    const data = await res.json();

    document.querySelector("#username").innerText = data.username;
    document.querySelector("#description").innerText = data.description;
    document.querySelector("#projects").innerText = data.projectCount;
    document.querySelector("#followers").innerText = data.follower;
    document.querySelector("#followings").innerText = data.following;
}
