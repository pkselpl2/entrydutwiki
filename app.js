// app.js
const inputEl = document.getElementById('usernameInput');
const btnEl = document.getElementById('searchButton');
const resultEl = document.getElementById('result');

btnEl.addEventListener('click', onSearch);
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') onSearch();
});

async function onSearch() {
  const username = inputEl.value.trim();
  if (!username) {
    alert('닉네임을 입력하세요!');
    return;
  }

  setLoading(true);
  resultEl.innerHTML = '<p>⏳ 불러오는 중...</p>';

  try {
    // 1) 먼저 공식 API 직접 호출 시도
    const directUrl = `https://playentry.org/api/user?username=${encodeURIComponent(username)}`;
    let res = await safeFetch(directUrl);

    // 2) 응답 체크
    if (!res.ok) {
      // 일부 경우 4xx/5xx이지만 body가 텍스트일 수 있음
      const text = await res.text().catch(()=>null);
      throw new Error(`서버 응답 오류: ${res.status} ${res.statusText} ${text ? '- '+text : ''}`);
    }

    const user = await res.json().catch(() => { throw new Error('응답을 JSON으로 파싱하지 못했습니다.'); });

    // 3) 사용자 객체 유효성 검사
    if (!user || !user.username) {
      throw new Error('유효한 사용자 데이터가 아닙니다.');
    }

    // 4) 화면 출력
    resultEl.innerHTML = buildCard(user);
  } catch (err) {
    console.error(err);
    resultEl.innerHTML = `<div class="card">
      <p style="color:#b33;"><b>오류:</b> ${escapeHtml(err.message)}</p>
      <p>※ 브라우저 콘솔(F12)에서 자세한 에러를 확인하세요.</p>
   
