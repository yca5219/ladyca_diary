// Created: 2026-01-02 14:00:00
// TO DO TODAY - 대시보드 앱

// ============================================
// Constants
// ============================================

const STORAGE_KEY = 'todos';
const MAX_TITLE_LENGTH = 100;

// 카테고리별 키워드 매핑 (자동 분류용)
const CATEGORY_KEYWORDS = {
    work: [
        // 업무 관련
        '회의', '미팅', '보고서', '보고', '발표', '프레젠테이션', 'PPT',
        '이메일', '메일', '전화', '콜', '출장', '야근', '회사', '사무실',
        '프로젝트', '기획', '제안', '계약', '거래처', '클라이언트', '고객',
        '마감', '데드라인', '업무', '작업', '태스크', '일정', '스케줄',
        '결재', '승인', '검토', '리뷰', '피드백', '수정', '보완',
        '기획서', '제안서', '견적', '인보이스', '청구', '정산',
        '팀', '부서', '상사', '동료', '협업', '회식', '워크샵',
        '코딩', '개발', '배포', '테스트', 'QA', '버그', '디버깅',
        'meeting', 'report', 'work', 'office', 'project', 'deadline'
    ],
    personal: [
        // 개인 관련
        '장보기', '마트', '쇼핑', '구매', '주문', '배송', '택배',
        '청소', '빨래', '세탁', '설거지', '정리', '집안일',
        '병원', '진료', '검진', '약', '처방', '치과', '안과',
        '은행', '송금', '이체', '입금', '출금', 'ATM', '카드',
        '예약', '예매', '티켓', '항공', '호텔', '숙소', '여행',
        '생일', '기념일', '선물', '파티', '모임', '약속', '데이트',
        '미용실', '헤어', '네일', '피부과', '마사지',
        '가족', '부모님', '아이', '아들', '딸', '형', '누나', '동생',
        '반려동물', '강아지', '고양이', '산책',
        '요리', '식사', '저녁', '점심', '아침', '식단',
        'shopping', 'hospital', 'bank', 'family', 'home'
    ],
    study: [
        // 공부 관련
        '공부', '학습', '스터디', '독서', '책', '도서', '도서관',
        '강의', '수업', '강좌', '인강', '온라인강의', '클래스',
        '시험', '테스트', '퀴즈', '모의고사', '평가', '성적',
        '과제', '숙제', '레포트', '리포트', '논문', '에세이',
        '자격증', '시험준비', '토익', 'TOEIC', '토플', 'TOEFL',
        '영어', '일본어', '중국어', '언어', '외국어', '회화',
        '수학', '과학', '역사', '문학', '프로그래밍', '코딩공부',
        '암기', '복습', '예습', '정리', '노트', '필기',
        '학교', '대학', '학원', '과외', '튜터', '멘토',
        'study', 'learn', 'book', 'lecture', 'exam', 'course'
    ],
    exercise: [
        // 운동 관련
        '운동', '헬스', '헬스장', '피트니스', '체육관', '짐',
        '러닝', '달리기', '조깅', '마라톤', '산책', '걷기', '워킹',
        '수영', '수영장', '풀장', '아쿠아',
        '요가', '필라테스', '스트레칭', '명상', '호흡',
        '등산', '하이킹', '트레킹', '클라이밍', '암벽',
        '자전거', '사이클', '라이딩', 'MTB',
        '축구', '농구', '야구', '배구', '테니스', '배드민턴', '탁구',
        '골프', '볼링', '당구', '스쿼시',
        '크로스핏', '웨이트', '근력', '유산소', '무산소', 'PT',
        '다이어트', '체중', '몸무게', '감량', '벌크업', '식단관리',
        'gym', 'workout', 'exercise', 'fitness', 'running', 'yoga'
    ]
};

// 명언 목록 (100개)
const QUOTES = [
    // 동기부여 (1-20)
    { text: "오늘 할 수 있는 일을 내일로 미루지 마라.", author: "벤자민 프랭클린" },
    { text: "시작이 반이다.", author: "아리스토텔레스" },
    { text: "천 리 길도 한 걸음부터.", author: "노자" },
    { text: "행동은 모든 성공의 기초적인 열쇠이다.", author: "파블로 피카소" },
    { text: "할 수 있다고 믿으면 반은 이룬 것이다.", author: "시어도어 루즈벨트" },
    { text: "가장 좋은 시기는 지금이다.", author: "공자" },
    { text: "당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 둘 다 맞다.", author: "헨리 포드" },
    { text: "성공의 비결은 시작하는 것이다.", author: "마크 트웨인" },
    { text: "매일 조금씩 나아지면 놀라운 결과가 온다.", author: "존 우든" },
    { text: "불가능은 의견일 뿐, 사실이 아니다.", author: "무하마드 알리" },
    { text: "지금 시작하라. 완벽해질 때까지 기다리지 마라.", author: "나폴레온 힐" },
    { text: "오늘 하루를 최선을 다해 살아라.", author: "오프라 윈프리" },
    { text: "작은 진전도 진전이다.", author: "작자 미상" },
    { text: "성공은 우연이 아니다. 노력과 인내의 결과다.", author: "펠레" },
    { text: "꿈은 크게, 시작은 작게.", author: "작자 미상" },
    { text: "당신의 한계는 당신이 정한다.", author: "작자 미상" },
    { text: "지금 이 순간이 당신의 인생을 바꿀 순간이다.", author: "토니 로빈스" },
    { text: "행동 없는 비전은 꿈일 뿐이다.", author: "조엘 바커" },
    { text: "매일 아침 일어나서 감사하라.", author: "작자 미상" },
    { text: "어제보다 나은 오늘을 만들어라.", author: "작자 미상" },

    // 목표 달성 (21-40)
    { text: "목표를 설정하면 보이지 않던 기회가 보인다.", author: "지그 지글러" },
    { text: "꿈을 이루고자 하는 용기만 있다면, 모든 꿈을 이룰 수 있다.", author: "월트 디즈니" },
    { text: "목표 없는 삶은 방향 없는 배와 같다.", author: "피터 드러커" },
    { text: "큰 목표를 세우고, 작은 목표로 나눠라.", author: "헨리 데이비드 소로" },
    { text: "목표를 향해 나아가는 과정이 곧 성장이다.", author: "작자 미상" },
    { text: "성공하려면 먼저 자신에게 성공을 약속하라.", author: "앤드류 카네기" },
    { text: "목표는 구체적일수록 달성 가능하다.", author: "브라이언 트레이시" },
    { text: "오늘의 작은 목표가 내일의 큰 성과가 된다.", author: "작자 미상" },
    { text: "목표를 적어두면 반은 이룬 것이다.", author: "작자 미상" },
    { text: "실패해도 괜찮다. 다시 목표를 세우면 된다.", author: "작자 미상" },
    { text: "목표 달성은 믿음에서 시작된다.", author: "노먼 빈센트 필" },
    { text: "성공은 목표를 향한 진전이다.", author: "얼 나이팅게일" },
    { text: "목표가 클수록 도전도 크다.", author: "작자 미상" },
    { text: "매일 목표를 확인하고 실천하라.", author: "브라이언 트레이시" },
    { text: "목표를 이루는 유일한 방법은 행동이다.", author: "피터 드러커" },
    { text: "원하는 것을 명확히 하면 길이 보인다.", author: "오프라 윈프리" },
    { text: "목표 달성의 첫 걸음은 계획이다.", author: "작자 미상" },
    { text: "성공은 방향을 아는 것에서 시작된다.", author: "작자 미상" },
    { text: "목표가 없다면 어디로 가는지 알 수 없다.", author: "요기 베라" },
    { text: "작은 목표들이 모여 큰 꿈을 이룬다.", author: "작자 미상" },

    // 습관 (41-55)
    { text: "우리는 반복적으로 하는 행동으로 만들어진다. 탁월함은 행동이 아니라 습관이다.", author: "아리스토텔레스" },
    { text: "좋은 습관은 좋은 삶을 만든다.", author: "작자 미상" },
    { text: "습관이 바뀌면 인생이 바뀐다.", author: "작자 미상" },
    { text: "성공은 매일 반복한 작은 노력들의 합이다.", author: "로버트 콜리어" },
    { text: "하루를 어떻게 보내느냐가 인생을 결정한다.", author: "애니 딜러드" },
    { text: "작은 습관이 큰 변화를 만든다.", author: "제임스 클리어" },
    { text: "매일 1%씩 나아지면 1년 후 37배 성장한다.", author: "제임스 클리어" },
    { text: "습관은 처음에는 거미줄, 나중에는 밧줄이 된다.", author: "스페인 속담" },
    { text: "꾸준함이 재능을 이긴다.", author: "작자 미상" },
    { text: "하루의 루틴이 인생의 방향을 결정한다.", author: "작자 미상" },
    { text: "작은 일에도 최선을 다하면 정성스럽게 된다.", author: "노자" },
    { text: "오늘의 선택이 내일의 습관이 된다.", author: "작자 미상" },
    { text: "성공한 사람들은 성공 습관을 가지고 있다.", author: "스티븐 코비" },
    { text: "습관을 만드는 데 21일이면 충분하다.", author: "맥스웰 몰츠" },
    { text: "좋은 습관을 시작하는 가장 좋은 시간은 지금이다.", author: "작자 미상" },

    // 성공과 실패 (56-70)
    { text: "실패는 성공의 어머니다.", author: "토마스 에디슨" },
    { text: "완벽을 목표로 하면 실패한다. 완료를 목표로 하면 성공한다.", author: "셰릴 샌드버그" },
    { text: "성공한 사람들은 실패해도 포기하지 않는다.", author: "콘래드 힐튼" },
    { text: "실패를 두려워하지 마라. 실패하지 않는 것을 두려워하라.", author: "세스 고딘" },
    { text: "넘어지는 것은 실패가 아니다. 일어나지 않는 것이 실패다.", author: "메리 피커포드" },
    { text: "성공은 열정을 잃지 않고 실패를 거듭하는 것이다.", author: "윈스턴 처칠" },
    { text: "모든 성공 뒤에는 수많은 실패가 있다.", author: "작자 미상" },
    { text: "실패에서 배우는 자가 성공한다.", author: "작자 미상" },
    { text: "성공은 준비가 기회를 만났을 때 일어난다.", author: "세네카" },
    { text: "포기하지 않으면 실패하지 않는다.", author: "작자 미상" },
    { text: "성공의 반대는 실패가 아니라 아무것도 시도하지 않는 것이다.", author: "작자 미상" },
    { text: "성공은 결과가 아니라 과정이다.", author: "아서 애쉬" },
    { text: "실패는 더 나은 방법을 찾으라는 신호다.", author: "토마스 에디슨" },
    { text: "성공은 꿈꾸는 자에게 온다.", author: "작자 미상" },
    { text: "성공하려면 두 배로 실패하라.", author: "토머스 왓슨" },

    // 인내와 끈기 (71-85)
    { text: "고통 없이는 성장도 없다.", author: "벤자민 프랭클린" },
    { text: "끝까지 포기하지 않으면 반드시 길이 열린다.", author: "이순신" },
    { text: "인내는 쓰다. 그러나 그 열매는 달다.", author: "장 자크 루소" },
    { text: "노력은 배신하지 않는다.", author: "작자 미상" },
    { text: "포기하지 않는 한 절대 실패가 아니다.", author: "작자 미상" },
    { text: "어려움은 성장의 기회다.", author: "작자 미상" },
    { text: "멈추지 않는 한 얼마나 천천히 가는지는 문제가 되지 않는다.", author: "공자" },
    { text: "비가 온 후에 무지개가 뜬다.", author: "한국 속담" },
    { text: "끈기가 천재를 이긴다.", author: "작자 미상" },
    { text: "어둠이 깊을수록 새벽은 가깝다.", author: "작자 미상" },
    { text: "힘든 시간이 강한 사람을 만든다.", author: "작자 미상" },
    { text: "참고 견디면 반드시 좋은 날이 온다.", author: "작자 미상" },
    { text: "고난은 위대함의 학교다.", author: "세네카" },
    { text: "지금의 어려움이 내일의 힘이 된다.", author: "작자 미상" },
    { text: "끝까지 달리는 자가 승리한다.", author: "작자 미상" },

    // 시간 관리 (86-95)
    { text: "시간은 가장 공평한 자원이다. 모두에게 하루 24시간.", author: "작자 미상" },
    { text: "오늘 하루는 내일 두 날의 가치가 있다.", author: "벤자민 프랭클린" },
    { text: "시간 낭비는 생명 낭비다.", author: "벤자민 프랭클린" },
    { text: "지금 이 순간에 집중하라.", author: "스티브 잡스" },
    { text: "시간을 관리하는 자가 인생을 관리한다.", author: "브라이언 트레이시" },
    { text: "하루를 어떻게 보내느냐가 인생을 결정한다.", author: "애니 딜러드" },
    { text: "바쁜 것이 생산적인 것은 아니다.", author: "팀 페리스" },
    { text: "중요한 일에 먼저 집중하라.", author: "스티븐 코비" },
    { text: "미루는 습관은 시간을 훔치는 도둑이다.", author: "에드워드 영" },
    { text: "오늘을 살아라. 내일을 위해 준비하되, 오늘을 놓치지 마라.", author: "작자 미상" },

    // 자기계발 (96-100)
    { text: "스스로를 믿어라. 당신은 생각보다 강하다.", author: "작자 미상" },
    { text: "배움에는 끝이 없다.", author: "공자" },
    { text: "성장은 편안한 영역 밖에서 일어난다.", author: "작자 미상" },
    { text: "자신을 발전시키는 데 투자하는 것이 최고의 투자다.", author: "워런 버핏" },
    { text: "매일 조금씩 더 나은 사람이 되어라.", author: "작자 미상" }
];

// ============================================
// State
// ============================================

let todos = [];
let currentFilter = 'all';

// ============================================
// DOM Elements
// ============================================

let todoForm, todoInput, categorySelect, todoList;
let currentDate, currentTime, quoteText, quoteAuthor;
let themeToggle;
let progressValue, progressFill, completedCount, totalCount;
let weeklyRate, weeklyProgressFill, weeklyCompleted, weeklyTotal;
let monthlyRate, monthlyProgressFill, monthlyCompleted, monthlyTotal;
let filterBtns;

// 카테고리별 진행률 요소
let workCount, workProgress;
let personalCount, personalProgress;
let studyCount, studyProgress;
let exerciseCount, exerciseProgress;

// ============================================
// Initialization
// ============================================

/**
 * init - 앱 초기화
 * - DOM 요소 참조
 * - 데이터 로드
 * - 이벤트 리스너 등록
 * - 초기 렌더링
 */
function init() {
    console.log('[init] TO DO TODAY 대시보드 초기화');

    // DOM 요소 참조
    initElements();

    // 데이터 로드
    loadTodos();

    // 테마 로드
    loadTheme();

    // 날짜/시간 업데이트 (1초마다)
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // 명언 표시
    displayQuote();

    // 이벤트 리스너 등록
    bindEvents();

    // 초기 렌더링
    renderTodos();

    // 통계 업데이트
    updateStats();

    console.log('[init] 초기화 완료!');
}

/**
 * initElements - DOM 요소 참조 초기화
 */
function initElements() {
    // 폼 요소
    todoForm = document.getElementById('todoForm');
    todoInput = document.getElementById('todoInput');
    categorySelect = document.getElementById('categorySelect');
    todoList = document.getElementById('todoList');

    // 날짜/시간
    currentDate = document.getElementById('currentDate');
    currentTime = document.getElementById('currentTime');

    // 명언
    quoteText = document.getElementById('quoteText');
    quoteAuthor = document.getElementById('quoteAuthor');

    // 테마 토글
    themeToggle = document.getElementById('themeToggle');

    // 진행률
    progressValue = document.getElementById('progressValue');
    progressFill = document.getElementById('progressFill');
    completedCount = document.getElementById('completedCount');
    totalCount = document.getElementById('totalCount');

    // 통계
    weeklyRate = document.getElementById('weeklyRate');
    weeklyProgressFill = document.getElementById('weeklyProgressFill');
    weeklyCompleted = document.getElementById('weeklyCompleted');
    weeklyTotal = document.getElementById('weeklyTotal');
    monthlyRate = document.getElementById('monthlyRate');
    monthlyProgressFill = document.getElementById('monthlyProgressFill');
    monthlyCompleted = document.getElementById('monthlyCompleted');
    monthlyTotal = document.getElementById('monthlyTotal');

    // 필터 버튼
    filterBtns = document.querySelectorAll('.filter-btn');

    // 카테고리별 진행률
    workCount = document.getElementById('workCount');
    workProgress = document.getElementById('workProgress');
    personalCount = document.getElementById('personalCount');
    personalProgress = document.getElementById('personalProgress');
    studyCount = document.getElementById('studyCount');
    studyProgress = document.getElementById('studyProgress');
    exerciseCount = document.getElementById('exerciseCount');
    exerciseProgress = document.getElementById('exerciseProgress');
}

/**
 * bindEvents - 이벤트 리스너 등록
 */
function bindEvents() {
    // 폼 제출
    todoForm.addEventListener('submit', handleFormSubmit);

    // 할 일 리스트 클릭 (이벤트 위임)
    todoList.addEventListener('click', handleListClick);

    // 필터 버튼
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => filterTodos(btn.dataset.filter));
    });

    // 테마 토글
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // 자동 카테고리 분류 (입력 시)
    if (todoInput) {
        // debounce를 사용하여 성능 최적화 (300ms)
        let debounceTimer;
        todoInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(handleAutoCategory, 300);
        });
    }
}

// ============================================
// LocalStorage
// ============================================

/**
 * saveTodos - todos 배열을 localStorage에 저장
 */
function saveTodos() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        console.log('[saveTodos] 저장 완료:', todos.length);
    } catch (error) {
        console.error('[saveTodos] 저장 실패:', error);
    }
}

/**
 * loadTodos - localStorage에서 todos 데이터 로드
 */
function loadTodos() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        todos = data ? JSON.parse(data) : [];
        console.log('[loadTodos] 로드 완료:', todos.length);
    } catch (error) {
        console.error('[loadTodos] 로드 실패:', error);
        todos = [];
    }
}

// ============================================
// Theme (다크 모드)
// ============================================

/**
 * loadTheme - 저장된 테마 불러오기
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    console.log('[loadTheme] 테마:', savedTheme || 'light');
}

/**
 * saveTheme - 테마 설정 저장
 */
function saveTheme(isDark) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * toggleTheme - 다크/라이트 모드 전환
 */
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    saveTheme(isDark);
    console.log('[toggleTheme] 테마 변경:', isDark ? 'dark' : 'light');
}

// ============================================
// DateTime & Quote
// ============================================

/**
 * updateDateTime - 현재 날짜/시간 업데이트
 */
function updateDateTime() {
    const now = new Date();

    // 날짜 포맷: 2026년 1월 2일 목요일
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${days[now.getDay()]}`;

    // 시간 포맷: 14:30:00
    const timeStr = now.toTimeString().split(' ')[0];

    if (currentDate) currentDate.textContent = dateStr;
    if (currentTime) currentTime.textContent = timeStr;
}

/**
 * getQuote - 오늘 날짜 기준으로 명언 선택
 * @returns {Object} 선택된 명언 객체 { text, author }
 */
function getQuote() {
    const today = new Date();
    // YYYY-MM-DD 형식으로 날짜 가져오기
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}${month}${day}`; // 예: 20260104

    // 날짜 문자열을 숫자로 변환
    const dateNumber = parseInt(dateString, 10);

    // 배열 길이로 나눈 나머지를 인덱스로 사용
    const index = dateNumber % QUOTES.length;

    console.log('[getQuote] 날짜:', dateString, '인덱스:', index);
    return QUOTES[index];
}

/**
 * displayQuote - 오늘의 명언 표시 (페이드인 애니메이션)
 */
function displayQuote() {
    const quote = getQuote();

    if (quoteText && quoteAuthor) {
        // 페이드인 애니메이션을 위해 먼저 투명하게 설정
        const quoteCard = document.querySelector('.quote-card');
        if (quoteCard) {
            quoteCard.classList.remove('fade-in');
            quoteCard.classList.add('fade-out-quote');

            setTimeout(() => {
                quoteText.textContent = quote.text;
                quoteAuthor.textContent = `- ${quote.author}`;

                quoteCard.classList.remove('fade-out-quote');
                quoteCard.classList.add('fade-in');
            }, 150);
        } else {
            quoteText.textContent = quote.text;
            quoteAuthor.textContent = `- ${quote.author}`;
        }
    }

    console.log('[displayQuote] 오늘의 명언:', quote.text);
}

// ============================================
// CRUD Functions
// ============================================

/**
 * addTodo - 새 할 일 추가
 */
function addTodo(title, category) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
        alert('할 일을 입력해주세요!');
        todoInput.focus();
        return;
    }

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
        alert(`할 일은 ${MAX_TITLE_LENGTH}자를 초과할 수 없습니다.`);
        return;
    }

    const todo = {
        id: Date.now(),
        title: trimmedTitle,
        category: category || 'personal',
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    };

    todos.unshift(todo);
    saveTodos();
    renderTodos();
    updateProgress();
    updateStats();

    // 입력폼 초기화
    todoInput.value = '';
    todoInput.focus();
}

/**
 * toggleComplete - 완료 상태 토글
 */
function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date().toISOString() : null;

    saveTodos();
    renderTodos();
    updateProgress();
    updateStats();
}

/**
 * deleteTodo - 할 일 삭제
 */
function deleteTodo(id) {
    const element = document.querySelector(`.todo-item[data-id="${id}"]`);

    if (element) {
        element.classList.add('fade-out');
        setTimeout(() => {
            todos = todos.filter(t => t.id !== id);
            saveTodos();
            renderTodos();
            updateProgress();
            updateStats();
        }, 300);
    } else {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
        updateProgress();
        updateStats();
    }
}

// ============================================
// Filtering
// ============================================

/**
 * filterTodos - 카테고리 필터 적용
 * @param {string} category - 필터할 카테고리 ('all', 'work', 'personal', 'study', 'exercise')
 */
function filterTodos(category) {
    currentFilter = category;
    console.log('[filterTodos] 필터 변경:', category);

    // 필터 버튼 하이라이트 업데이트
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });

    // 할 일 목록 렌더링
    renderTodos();
}

/**
 * setFilter - filterTodos 별칭 (호환성)
 */
function setFilter(filter) {
    filterTodos(filter);
}

/**
 * getFilteredTodos - 필터링된 할 일 목록 반환
 * @returns {Array} 필터링된 todos 배열
 */
function getFilteredTodos() {
    if (currentFilter === 'all') return todos;
    return todos.filter(t => t.category === currentFilter);
}

// ============================================
// Progress Calculation
// ============================================

/**
 * getCompletionRate - 완료율 계산
 * @param {Array} todoList - 계산할 할 일 배열
 * @returns {number} 완료율 (소수점 1자리)
 */
function getCompletionRate(todoList) {
    if (!todoList || todoList.length === 0) return 0;

    const completed = todoList.filter(t => t.completed).length;
    const rate = (completed / todoList.length) * 100;

    return Math.round(rate * 10) / 10; // 소수점 1자리
}

/**
 * getCategoryStats - 카테고리별 통계 반환
 * @returns {Object} 카테고리별 전체/완료 개수 객체
 */
function getCategoryStats() {
    const categories = ['work', 'personal', 'study', 'exercise'];
    const stats = {};

    categories.forEach(category => {
        const categoryTodos = todos.filter(t => t.category === category);
        const completed = categoryTodos.filter(t => t.completed).length;

        stats[category] = {
            total: categoryTodos.length,
            completed: completed,
            rate: getCompletionRate(categoryTodos)
        };
    });

    return stats;
}

/**
 * getProgressColorClass - 완료율에 따른 색상 클래스 반환
 * @param {number} rate - 완료율
 * @returns {string} CSS 클래스명
 */
function getProgressColorClass(rate) {
    if (rate <= 30) return 'low';      // 빨강
    if (rate <= 70) return 'medium';   // 주황
    return 'high';                      // 초록
}

// ============================================
// Rendering
// ============================================

/**
 * renderTodos - 할 일 목록 렌더링
 */
function renderTodos() {
    const filtered = getFilteredTodos();

    if (filtered.length === 0) {
        const msg = currentFilter === 'all'
            ? '할 일이 없습니다. 위에서 추가해보세요!'
            : `${getCategoryLabel(currentFilter)} 카테고리에 할 일이 없습니다.`;

        todoList.innerHTML = `
            <li class="empty-state">
                <div class="empty-icon">📋</div>
                <p class="empty-text">${msg}</p>
            </li>
        `;
        return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item${todo.completed ? ' completed' : ''}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${escapeHtml(todo.title)}</span>
            <span class="category-badge ${todo.category}">${getCategoryLabel(todo.category)}</span>
            <button class="delete-btn" aria-label="삭제">&times;</button>
        `;

        fragment.appendChild(li);
    });

    todoList.innerHTML = '';
    todoList.appendChild(fragment);
    updateProgress();
}

/**
 * updateProgress - 진행률 업데이트 (전체 + 카테고리별)
 */
function updateProgress() {
    // ===== 전체 진행률 =====
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const percent = getCompletionRate(todos);

    if (progressValue) progressValue.textContent = `${percent}%`;
    if (progressFill) {
        progressFill.style.width = `${percent}%`;
        // 완료율에 따른 색상 변경
        progressFill.className = 'progress-fill ' + getProgressColorClass(percent);
    }
    if (completedCount) completedCount.textContent = completed;
    if (totalCount) totalCount.textContent = total;

    // ===== 카테고리별 진행률 =====
    const stats = getCategoryStats();

    // 업무
    if (workCount) workCount.textContent = `${stats.work.completed}/${stats.work.total}`;
    if (workProgress) workProgress.style.width = `${stats.work.rate}%`;

    // 개인
    if (personalCount) personalCount.textContent = `${stats.personal.completed}/${stats.personal.total}`;
    if (personalProgress) personalProgress.style.width = `${stats.personal.rate}%`;

    // 공부
    if (studyCount) studyCount.textContent = `${stats.study.completed}/${stats.study.total}`;
    if (studyProgress) studyProgress.style.width = `${stats.study.rate}%`;

    // 운동
    if (exerciseCount) exerciseCount.textContent = `${stats.exercise.completed}/${stats.exercise.total}`;
    if (exerciseProgress) exerciseProgress.style.width = `${stats.exercise.rate}%`;

    console.log('[updateProgress] 진행률 업데이트 완료:', percent + '%');
}

/**
 * filterByDateRange - 기간 내의 할 일 필터링
 * @param {Array} todoList - 필터링할 할 일 배열
 * @param {number} days - 필터링 기간 (일 단위, 7=주간, 30=월간)
 * @returns {Array} 필터링된 할 일 배열
 */
function filterByDateRange(todoList, days) {
    const now = new Date();
    const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return todoList.filter(todo => {
        const createdAt = new Date(todo.createdAt);
        return createdAt >= pastDate;
    });
}

/**
 * getWeeklyStats - 주간(7일) 통계 계산
 * @returns {Object} { total, completed, rate }
 */
function getWeeklyStats() {
    const weeklyTodos = filterByDateRange(todos, 7);
    const completed = weeklyTodos.filter(t => t.completed).length;
    const total = weeklyTodos.length;
    const rate = getCompletionRate(weeklyTodos);

    return {
        total: total,
        completed: completed,
        rate: rate
    };
}

/**
 * getMonthlyStats - 월간(30일) 통계 계산
 * @returns {Object} { total, completed, rate }
 */
function getMonthlyStats() {
    const monthlyTodos = filterByDateRange(todos, 30);
    const completed = monthlyTodos.filter(t => t.completed).length;
    const total = monthlyTodos.length;
    const rate = getCompletionRate(monthlyTodos);

    return {
        total: total,
        completed: completed,
        rate: rate
    };
}

/**
 * renderStats - 주간/월간 통계 렌더링
 */
function renderStats() {
    // 주간 통계
    const weekly = getWeeklyStats();
    if (weeklyRate) weeklyRate.textContent = `${weekly.rate}%`;
    if (weeklyProgressFill) {
        weeklyProgressFill.style.width = `${weekly.rate}%`;
        weeklyProgressFill.className = 'stats-progress-fill ' + getProgressColorClass(weekly.rate);
    }
    if (weeklyCompleted) weeklyCompleted.textContent = weekly.completed;
    if (weeklyTotal) weeklyTotal.textContent = weekly.total;

    // 월간 통계
    const monthly = getMonthlyStats();
    if (monthlyRate) monthlyRate.textContent = `${monthly.rate}%`;
    if (monthlyProgressFill) {
        monthlyProgressFill.style.width = `${monthly.rate}%`;
        monthlyProgressFill.className = 'stats-progress-fill ' + getProgressColorClass(monthly.rate);
    }
    if (monthlyCompleted) monthlyCompleted.textContent = monthly.completed;
    if (monthlyTotal) monthlyTotal.textContent = monthly.total;

    console.log('[renderStats] 주간:', weekly.rate + '%', '월간:', monthly.rate + '%');
}

/**
 * updateStats - renderStats 별칭 (호환성)
 */
function updateStats() {
    renderStats();
}

// ============================================
// Event Handlers
// ============================================

/**
 * handleFormSubmit - 폼 제출 처리
 */
function handleFormSubmit(e) {
    e.preventDefault();
    addTodo(todoInput.value, categorySelect.value);
}

/**
 * handleListClick - 리스트 클릭 처리 (이벤트 위임)
 */
function handleListClick(e) {
    const item = e.target.closest('.todo-item');
    if (!item) return;

    const id = parseInt(item.dataset.id, 10);

    if (e.target.classList.contains('todo-checkbox')) {
        toggleComplete(id);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id);
    }
}

// ============================================
// Utility Functions
// ============================================

/**
 * escapeHtml - XSS 방지
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * getCategoryLabel - 카테고리 라벨
 */
function getCategoryLabel(category) {
    const labels = {
        work: '업무',
        personal: '개인',
        study: '공부',
        exercise: '운동'
    };
    return labels[category] || category;
}

// 우선순위 키워드 (이 키워드가 포함되면 해당 카테고리로 강제 분류)
const PRIORITY_KEYWORDS = {
    study: ['공부', '학습', '스터디', '시험', '과제', '숙제', '강의', '수업'],
    exercise: ['운동', '헬스', '요가', '필라테스', '러닝', '수영', '등산']
};

/**
 * autoCategorize - 텍스트 기반 자동 카테고리 분류
 * @param {string} text - 분석할 텍스트
 * @returns {Object} { category, matchedKeyword, confidence }
 */
function autoCategorize(text) {
    if (!text || text.trim() === '') {
        return { category: null, matchedKeyword: null, confidence: 0 };
    }

    const lowerText = text.toLowerCase();

    // 1. 우선순위 키워드 먼저 체크
    for (const [category, keywords] of Object.entries(PRIORITY_KEYWORDS)) {
        for (const keyword of keywords) {
            if (lowerText.includes(keyword.toLowerCase())) {
                console.log('[autoCategorize] 우선순위 키워드 매칭:', keyword, '→', category);
                return {
                    category: category,
                    matchedKeyword: keyword,
                    confidence: 100
                };
            }
        }
    }

    // 2. 일반 키워드 매칭
    const results = {};

    // 각 카테고리별 매칭 키워드 수 계산
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        results[category] = {
            count: 0,
            matchedKeywords: []
        };

        for (const keyword of keywords) {
            const lowerKeyword = keyword.toLowerCase();
            if (lowerText.includes(lowerKeyword)) {
                results[category].count++;
                results[category].matchedKeywords.push(keyword);
            }
        }
    }

    // 가장 많이 매칭된 카테고리 찾기
    let bestCategory = null;
    let maxCount = 0;
    let matchedKeyword = null;

    for (const [category, data] of Object.entries(results)) {
        if (data.count > maxCount) {
            maxCount = data.count;
            bestCategory = category;
            matchedKeyword = data.matchedKeywords[0]; // 첫 번째 매칭 키워드
        }
    }

    // confidence: 매칭된 키워드 수에 따른 신뢰도 (1개=50%, 2개=75%, 3개 이상=100%)
    let confidence = 0;
    if (maxCount === 1) confidence = 50;
    else if (maxCount === 2) confidence = 75;
    else if (maxCount >= 3) confidence = 100;

    console.log('[autoCategorize] 텍스트:', text, '→ 카테고리:', bestCategory, '키워드:', matchedKeyword);

    return {
        category: bestCategory,
        matchedKeyword: matchedKeyword,
        confidence: confidence
    };
}

/**
 * handleAutoCategory - 입력 필드 자동 카테고리 처리
 */
function handleAutoCategory() {
    const text = todoInput.value;
    const result = autoCategorize(text);

    if (result.category && result.confidence >= 50) {
        // 카테고리 자동 선택
        categorySelect.value = result.category;

        // 시각적 피드백
        showAutoCategoryFeedback(result.category, result.matchedKeyword);
    }
}

/**
 * showAutoCategoryFeedback - 자동 분류 시각적 피드백 표시
 */
function showAutoCategoryFeedback(category, keyword) {
    // 기존 피드백 제거
    const existingFeedback = document.querySelector('.auto-category-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // 새 피드백 생성
    const feedback = document.createElement('div');
    feedback.className = 'auto-category-feedback';
    feedback.innerHTML = `
        <span class="feedback-icon">✨</span>
        <span class="feedback-text">"${keyword}" → <strong>${getCategoryLabel(category)}</strong></span>
    `;

    // 카테고리 선택 옆에 추가
    const inputCard = document.querySelector('.input-card');
    if (inputCard) {
        inputCard.appendChild(feedback);

        // 3초 후 자동 제거
        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => feedback.remove(), 300);
        }, 2500);
    }
}

// ============================================
// App Start
// ============================================

document.addEventListener('DOMContentLoaded', init);
