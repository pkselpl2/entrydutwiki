document.getElementById("searchButton").addEventListener("click", () => {
  const raw = document.getElementById("usernameInput").value.trim();
  if (raw === "") {
    alert("닉네임 또는 프로필 URL을 입력하세요!");
    return;
  }
  searchUser(raw);
});

document.getElementById("usernameInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchButton").click();
  }
});

// 프로필 URL에서 ID 추출
function extractProfileId(text) {
  const match = text.match(/profile\/([0-9a-f]{24})/);
  return match ? match[1] : null;
}

async function searchUser(inputText) {
  const result = document.getElementById("result");
  result.innerHTML = "<p>⏳ 불러오는 중...</p>";

  let userId = extractProfileId(inputText);
  let apiUrl;

  if (userId) {
    // 프로필 URL을 입력한 경우
    apiUrl = `https://playentry.org/api/user/${userId}`;
  } else {
    // 닉네임을 입력한 경우
    apiUrl = `https://playentry.org/api/user?url=${encodeURIComponent(inputText)}`;
  }

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      result.innerHTML = "<p>❌ 유저를 찾을 수 없습니다.</p>";
      return;
    }

    const user = await res.json();

    result.innerHTML = `
      <div class="card">
        <img src="${user.profileImage}" class="avatar" alt="프로필 이미지">
        <h2>${user.nickname}</h2>
        <p style="color:#777">@${user.username}</p>

        <div class="stats">
          <div><b>${user.projectsLength}</b><br>작품</div>
          <div><b>${user.studiesLength}</b><br>스터디</div>
          <div><b>${user.communitiesLength}</b><br>커뮤니티</div>
        </div>

        <div class="stats" style="margin-top: 15px;">
          <div><b>${user.followers}</b><br>팔로워</div>
          <div><b>${user.followings}</b><br>팔로잉</div>
          <div><b>${user.bookmarksLength ?? 0}</b><br>북마크</div>
        </div>

        <a class="open-profile" href="https://playentry.org/profile/${user._id}" target="_blank">
          프로필 열기
        </a>
      </div>
    `;
  } catch (e) {
    console.error(e);
    result.innerHTML = `<p>⚠ 오류 발생: ${e.message}</p>`;
  }
}
