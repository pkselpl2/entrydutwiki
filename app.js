document.getElementById("searchButton").addEventListener("click", () => {
    const name = document.getElementById("usernameInput").value.trim();
    if (name === "") {
        alert("닉네임을 입력하세요!");
        return;
    }
    loadUser(name);
});

document.getElementById("usernameInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") document.getElementById("searchButton").click();
});

// ------------------
// 검색 결과 표시
// ------------------
function loadUser(username) {
    // 🔹 Proxy 서버 준비되기 전까지 테스트용 데이터
    const data = {
        username,
        works: 17,
        followers: 102,
        followings: 5,
        avatar: "https://playentry.org/img/favicon/favicon-32x32.png",
        profileUrl: `https://playentry.org/profile/${username}`
    };

    document.getElementById("result").innerHTML = `
      <div class="user-card">
        <img class="avatar" src="${data.avatar}" alt="프로필">
        <div class="user-info">
          <h2>${data.username}</h2>
          <p>작품 수: ${data.works}</p>
          <p>팔로워: ${data.followers}</p>
          <p>팔로잉: ${data.followings}</p>
          <a href="${data.profileUrl}" class="profile-btn" target="_blank">엔트리 프로필 방문</a>
        </div>
      </div>
    `;
}
