# 🕹️ Study Survival (수행평가 폭탄 속에서 살아남기)

## 💡 프로젝트 소개 (Project Introduction)
Study Survival은 쏟아지는 수행평가와 학업 스트레스 속에서 살아남아야 하는 학생들을 위한 수행평가 기반 학업 생존 대시보드 서비스 입니다. 

단순히 할 일을 나열하는 기존 To-do 리스트에서 벗어나, 수행평가 마감일과 실제 공부 시간을 결합하여 **현재 나의 '학업 생존 가능성'을 실시간 점수와 상태 메시지로 시각화**해 주는 게임화 요소가 반영된 웹 애플리케이션입니다.

Docker 가상화 기술을 도입하여 Nginx 기반의 웹 서버와 MySQL 인프라를 분리 구축하였으며, 환경 세팅의 복잡함 없이 단 한 줄의 명령어로 어디서나 동일하게 구동 가능하도록 설계되었습니다.

---

## 🛠️ 프로젝트 폴더 구조 (Directory Structure)

```text
my-team-project/
│
├── web/                    # 프론트엔드 작업 공간 (대시보드 메인 및 핵심 기능 UI)
│   ├── src/                # index.html, style.css, script.js 등 소스 코드
│   └── Dockerfile          # Nginx 웹 서버 환경 구축용 도커 파일
│
├── mysql/                  # 백엔드 및 데이터베이스 관리 공간
│   ├── data/               # 수행평가 일정 및 생존 데이터 저장 테이블
│   ├── conf/               # MySQL 환경 설정 파일
│   └── Dockerfile          # DB 인프라 구축용 도커 파일
│
├── .gitignore              # GitHub 버전 관리 제외 파일 목록
├── README.md               # 본 프로젝트 설명서 (현재 파일)
└── docker-compose.yml      # 멀티 컨테이너 통합 실행 및 가상 네트워크 설정 파일
