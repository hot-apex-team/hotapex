## 💡 프로젝트 소개 💡

Study Survival은 수행평가와 과제가 많은 고등학생을 위한 수행평가 마감 관리 웹 서비스입니다.

단순한 To-Do 리스트가 아니라, 수행평가 D-Day를 기준으로 학업 생존율(HP)과 멘탈 상태를 게임처럼 시각화하여 일정을 쉽고 재미있게 관리할 수 있습니다.

🎮 주요 기능
📅 수행평가 D-Day 자동 계산
❤️ 학업 생존율(HP) 표시
💬 상황에 따라 달라지는 멘탈 상태 메시지
🎯 마감일에 따른 직관적인 진행 상태 표시

## 🛠️ 프로젝트 폴더 구조 🛠️ 
```text
my-team-project/
│
├── web/                    # 웹 화면(HTML, CSS, JavaScript)
│   ├── src/                # 프로젝트 소스 코드
│   └── Dockerfile          # 웹 서버(Nginx) 설정
│
├── mysql/                  # MySQL 데이터베이스
│   ├── data/               # 데이터 저장 공간
│   ├── conf/               # MySQL 설정 파일
│   └── Dockerfile          # MySQL 컨테이너 설정
│
├── .gitignore              # Git에서 제외할 파일 목록
├── README.md               # 프로젝트 설명 문서
└── docker-compose.yml      # 웹 서버와 MySQL을 함께 실행하는 설정 파일
