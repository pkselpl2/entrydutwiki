// ─────────────────────────────────────
// 1. 프로필 정보 불러오기
// ─────────────────────────────────────

// 실제 엔트리 API는 없으므로, 나중에 Proxy 서버를 넣을 수 있게 URL만 분리
const ENTRY_PROXY = "https://your-proxy-server.com/user/"; 
// ↑ 나중에 너가 만들 Proxy 서버 주소 들어갈 자리

async function loadUser(username) {
    try {
        // --- 실제 요청 URL 만들기 ---
        const url = ENTRY_PROXY + username;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("서버 응답 오류");
        }

        const data = await response.json();

        // data 구조 예시(Proxy에서 이렇게 보내주면 됨)
        // {
        //   "username": "TEAMKRIS_offcial",
        //   "works": 12,
        //   "followers": 20,
        //   "followings": 3,
        //   "profileUrl": "https://playentry.org/profile/xxx"
        // }

        // HTML 요소 채우기
        document.getElementById("username").innerText = data.username;
        document.getElementById("workCount").innerText = data.works;
        document.getElementById("followerCount").innerText = data.followers;
        document.getElementById("followingCount").innerText = data.followings;

        const linkBtn = document.getElementById("profileLink");
        linkBtn.href = data.profileUrl;
        linkBtn.style.display = "inline-block";

    } catch (err) {
        console.error(err);
        alert("⚠ 서버와 통신할 수 없습니다. Proxy 서버가 필요합니다.");
    }
}


// ─────────────────────────────────────
// 2. 검색 기능 (검색창에 ID 입력 → 자동 로드)
// ─────────────────────────────────────
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const username = searchInput.value.trim();
    if (username === "") {
        alert("엔트리 닉네임을 입력하세요!");
        return;
    }

    loadUser(username);
});


// 엔터키로 검색
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});


// ─────────────────────────────────────
// 3. 첫 기본 유저 자동 로딩 (선택)
// ─────────────────────────────────────

// loadUser("TEAMKRIS_offcial");

