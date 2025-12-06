const searchInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchButton");
const resultBox = document.getElementById("result");

// (나중에 Worker 주소 넣을 자리)
const ENTRY_PROXY = "https://proxy-server.kkammailbox.workers.dev/";

async function loadUser(username) {
    resultBox.innerHTML = "⏳ 불러오는 중...";

    try {
        const response = await fetch(ENTRY_PROXY + username);

        if (!response.ok) throw new Error("Proxy error");

        const data = await response.json();

        resultBox.innerHTML = `
          <div class="user-card">
            <h2>${data.username}</h2>
            <p>작품 수: ${data.works}</p>
            <p>팔로워: ${data.followers}</p>
            <p>팔로잉: ${data.followings}</p>
            <a href="${data.profileUrl}" class="profileBtn" target="_blank">프로필 방문</a>
          </div>
        `;
    } catch (err) {
        resultBox.innerHTML = "❌ 데이터를 불러올 수 없습니다.";
        console.error(err);
    }
}

searchBtn.addEventListener("click", () => {
    const username = searchInput.value.trim();
    if (!username) return alert("닉네임을 입력하세요!");
    loadUser(username);
});

searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchBtn.click();
});
