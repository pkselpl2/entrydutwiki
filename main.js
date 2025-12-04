document.getElementById("searchButton").addEventListener("click", () => {
  const username = document.getElementById("usernameInput").value.trim();
  if (username === "") {
    alert("닉네임을 입력하세요!");
    return;
  }
  fetchUser(username);
});

async function fetchUser(username) {
  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "<p>⏳ 불러오는 중...</p>";

  try {
    const res = await fetch(`https://playentry.org/api/user?username=${username}`);

    if (!res.ok) {
      resultBox.innerHTML = "<p>❌ 유저를 찾을 수 없습니다.</p>";
      return;
    }

    const user = await res.json();

    resultBox.innerHTML = `
      <div class="card">
        <img src="${user.profileImage || ''}" class="avatar" alt="프로필 이미지">
        <h2>${user.nickname}</h2>
        <p style="color:#666">@${user.username}</p>

        <div class="stats">
          <div><b>${user.projectsLength}</b><br>작품</div>
          <div><b>${user.communitiesLength}</b><br>커뮤니티</div>
          <div><b>${user.studiesLength}</b><br>스터디</div>
        </div>

        <div class="stats" style="margin-top:20px;">
          <div><b>${user.followers}</b><br>팔로워</div>
          <div><b>${user.followings}</b><br>팔로잉</div>
          <div><b>${user.bookmarksLength ?? 0}</b><br>북마크</div>
        </div>
      </div>
    `;
  } catch (e) {
    resultBox.innerHTML = "<p>⚠ 오류가 발생했습니다.</p>";
  }
}
