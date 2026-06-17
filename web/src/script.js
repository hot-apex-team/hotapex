// ==================== 1. 스톱워치 기능 ====================
let timer;
let seconds = 0; let minutes = 0; let hours = 0; 
const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTimer() {
    seconds++;
    if (seconds >= 60) { seconds = 0; minutes++; if (minutes >= 60) { minutes = 0; hours++; } }
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
startBtn.addEventListener('click', () => { clearInterval(timer); timer = setInterval(updateTimer, 1000); });
stopBtn.addEventListener('click', () => { clearInterval(timer); });
resetBtn.addEventListener('click', () => { clearInterval(timer); seconds = 0; minutes = 0; hours = 0; timerDisplay.textContent = "00:00:00"; });


// ==================== 2. 실시간 대시보드 연동 & 투두 기능 ====================
const todoInput = document.getElementById('todo-input');
const todoAddBtn = document.getElementById('todo-add-btn');
const todoList = document.getElementById('todo-list');
const survivalRateDisplay = document.getElementById('survival-rate');
const assignmentCountDisplay = document.getElementById('assignment-count');
const warningText = document.querySelector('.warning-text');
const ddayList = document.getElementById('dday-list'); // 사이드바 리스트 가져오기

// 📊 대시보드 계산 함수 (D-Day 개수와 투두 성취도를 모두 반영!)
function updateDashboard() {
    // 1. 왼쪽 사이드바에 등록된 총 D-Day(수행평가) 개수 세기 👈 이 부분이 핵심!
    const totalDdays = ddayList.querySelectorAll('li').length;
    assignmentCountDisplay.textContent = `${totalDdays}개`;

    // 2. 오늘의 할 일 진행도 계산
    const allTodos = todoList.querySelectorAll('li');
    const totalTodosCount = allTodos.length;
    
    let remainingTodosCount = 0;
    allTodos.forEach(todo => {
        const checkbox = todo.querySelector('input[type="checkbox"]');
        if (checkbox && !checkbox.checked) remainingTodosCount++;
    });

    // 3. 생존율 계산 공식 (할 일 진척도 기준)
    let rate = 100; 
    if (totalTodosCount > 0) {
        let completedCount = totalTodosCount - remainingTodosCount;
        rate = Math.round((completedCount / totalTodosCount) * 100);
    }

    // 만약 등록된 수행평가(D-Day)는 많은데 오늘의 할 일이 아예 없으면 경고 의미로 생존율을 약간 낮춰서 시작
    if (totalTodosCount === 0 && totalDdays > 0) {
        rate = Math.max(0, 100 - (totalDdays * 10)); // 수행평가 하나당 기본 10% 감점 상태로 시작
    }

    survivalRateDisplay.textContent = `${rate}%`;

    // 생존율 스타일 변경
    if (rate >= 80) {
        survivalRateDisplay.style.color = "#2ed573"; warningText.textContent = "😇 현재 생존 상태 양호 (안전지대)"; warningText.style.color = "#2ed573";
    } else if (rate >= 40) {
        survivalRateDisplay.style.color = "#ffa502"; warningText.textContent = "🏃 조금씩 밀리는 중 (집중 필요)"; warningText.style.color = "#ffa502";
    } else {
        survivalRateDisplay.style.color = "#ff4757"; warningText.textContent = "⚠️ 매우 위험 (밤샘 예정)"; warningText.style.color = "#ff4757";
    }
}

// 투두 추가
todoAddBtn.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") { alert("할 일을 입력해주세요!"); return; }
    const newLi = document.createElement('li');
    newLi.innerHTML = `
        <input type="checkbox"> <span>${todoText}</span>
        <button class="delete-btn" style="margin-left: auto; background: none; border: none; color: #ff4757; cursor: pointer; font-weight: bold;">X</button>
    `;
    todoList.appendChild(newLi);
    todoInput.value = "";
    updateDashboard();
});
todoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { todoAddBtn.click(); } });

todoList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const li = e.target.parentElement;
        if (e.target.checked) { li.style.textDecoration = "line-through"; li.style.opacity = "0.5"; }
        else { li.style.textDecoration = "none"; li.style.opacity = "1"; }
        updateDashboard();
    }
});
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) { e.target.closest('li').remove(); updateDashboard(); }
});


// ==================== 3. 📅 실시간 여러개 D-Day 추가 기능 ====================
const ddayTitleInput = document.getElementById('dday-title');
const ddayDateInput = document.getElementById('dday-date');
const ddayAddBtn = document.getElementById('dday-add-btn');

ddayAddBtn.addEventListener('click', () => {
    const title = ddayTitleInput.value.trim();
    const targetDateStr = ddayDateInput.value;

    if (title === "" || targetDateStr === "") {
        alert("시험 이름과 날짜를 모두 입력해주세요!");
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(targetDateStr);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let ddayText = "";
    if (diffDays === 0) ddayText = "D-Day";
    else if (diffDays > 0) ddayText = `D-${diffDays}`;
    else ddayText = `D+${Math.abs(diffDays)}`;

    const newDdayLi = document.createElement('li');
    newDdayLi.innerHTML = `
        <div>
            <strong>${title}</strong>
            <span style="font-size:0.8rem; color:#a4b0be; margin-left:5px;">(${targetDateStr})</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
            <span class="dday-tag">${ddayText}</span>
            <button class="dday-delete-btn" style="background: none; border: none; color: #ff4757; cursor: pointer; font-weight: bold;">X</button>
        </div>
    `;

    ddayList.appendChild(newDdayLi);

    ddayTitleInput.value = "";
    ddayDateInput.value = "";

    // 🚨 D-Day가 새로 추가되었으니 대시보드 개수 실시간 업데이트!
    updateDashboard();
});

// D-Day 삭제 버튼 작동 기능
ddayList.addEventListener('click', (e) => {
    if (e.target.classList.contains('dday-delete-btn')) {
        e.target.closest('li').remove();
        
        // 🚨 D-Day가 지워졌으니(수행평가가 끝났으니) 대시보드 개수 실시간 감소!
        updateDashboard();
    }
});

// 처음 실행 시 세팅
updateDashboard();