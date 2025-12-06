// ─────────────────────────────────────
// DOM 요소 가져오기
// ─────────────────────────────────────

const searchInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchButton");
const resultBox = document.getElementById("result");

// Proxy 서버 URL
const ENTRY_PROXY = "https://proxy-server.kkammailbox.workers.dev/"; 


// ─────────────────────────────────────
// 유저 정보 가져오기
// ─────────────────────────────────────
async function loadUser(username) {
    resultBox.innerHTML = "⏳ 불러오는 중...";

    try {
        const url = ENTRY_PROXY + username;
        const response = await fetch(url);

        if (!response.ok) throw new Error("서버 오류");

        const data = await response.json();

        // 화면 출력
        resultBox.innerHTML = `
            <div class="user-card">
                <h2>${data.username}</h2>
                <p>작품 수: ${data.works}</p>
                <p>팔로워: ${data.followers}</p>
                <p>팔로잉: ${data.followings}</p>
                <a href="${data.profileUrl}" target="_blank" class="profileBtn">프로필 방문</a>
            </div>
        `;
    } catch (err) {
        resultBox.innerHTML = "❌ 데이터를 불러올 수 없습니다.";
        console.error(err);
    }
}


// ─────────────────────────────────────
// 검색 버튼 클릭 이벤트
// ─────────────────────────────────────
searchBtn.addEventListener("click", () => {
    const username = searchInput.value.trim();

    if (username === "") {
        alert("닉네임을 입력하세요!");
        return;
    }

    loadUser(username);
});


// ─────────────────────────────────────
// 엔터키 검색
// ─────────────────────────────────────
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
