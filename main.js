async function checkUser() {
    const url = document.getElementById("targetUrl").value;
    const result = document.getElementById("result");

    if (!url.includes("playentry.org")) {
        result.innerHTML = "<b>엔트리 링크를 입력하세요.</b>";
        return;
    }

    // CORS 프록시 사용 (GitHub Pages에서 동작)
    const proxy = "https://corsproxy.io/?";

    try {
        const html = await fetch(proxy + url).then(res => res.text());

        // 닉네임 추출
        const nickname = html.match(/"nickname":"(.*?)"/)?.[1] || "없음";

        // 프로필 이미지
        const profile = html.match(/"profileImage":"(.*?)"/)?.[1] || "없음";

        // 배경 이미지
        const background = html.match(/"coverImage":"(.*?)"/)?.[1] || "없음";

        // 작품 수
        const workCount = html.match(/"projectCount":(\d+)/)?.[1] || "0";

        // 팔로워, 팔로잉
        const follower = html.match(/"followerCount":(\d+)/)?.[1] || "0";
        const following = html.match(/"followingCount":(\d+)/)?.[1] || "0";

        result.innerHTML = `
            <h3>결과</h3>
            닉네임: ${nickname}<br>
            작품 수: ${workCount}<br>
            팔로워: ${follower}<br>
            팔로잉: ${following}<br><br>

            <b>프사:</b><br>
            <img src="https://playentry.org${profile}" width="120"><br><br>

            <b>베사:</b><br>
            <img src="https://playentry.org${background}" width="250">
        `;
    } catch (err) {
        result.innerHTML = "❌ 오류 발생: 엔트리 서버가 차단 중일 수 있음.";
    }
}
