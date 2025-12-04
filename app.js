document.addEventListener("DOMContentLoaded", () => {
  console.log("app.js 정상 로드됨");

  const searchBtn = document.getElementById("searchButton");
  const input = document.getElementById("usernameInput");

  searchBtn.addEventListener("click", () => {
    const username = input.value.trim();
    if (!username) {
      alert("닉네임을 입력해주세요!");
      return;
    }
    fetchUser(username);
  });
});

/**
 * 엔트리 서버는 CORS 때문에 브라우저에서 직접 정보를 가져올 수 없음.
 * 그래서 현재는 표시용 UI만 만들고,
 * 서버 프록시 쓰면 실제 데이터 연동 가능.
 */
function fetchUser(username) {
  const resultBox = document.getElementById("result");

  // 엔트리 프로필 URL (유저 ID는 없으므로 닉네임만 표시)
  const fakeProfileUrl = `https://playentry.org/profile/${username}`;

  // 출력되는 UI
  resultBox.innerHTML = `
    <div class="card">
      <div class="pfp"></div>
      <h2>${username}</h2>

      <div class="info">
        <p><strong>작품 수:</strong> (서버 필요)</p>
        <p><strong>팔로워:</strong> (서버 필요)</p>
        <p><strong>팔로잉:</strong> (서버 필요)</p>
      </div>

      <a class="goto" href="${fakeProfileUrl}" target="_blank">
        엔트리 프로필 방문하기
      </a>
    </div>
  `;
}
