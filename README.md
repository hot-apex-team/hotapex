💡 프로젝트 소개 (Project Introduction)

Study Survival은 수행평가와 과제가 많은 고등학생을 위한 수행평가 마감 관리 웹 서비스입니다.

단순한 To-Do 리스트가 아니라, 수행평가 D-Day를 기준으로 학업 생존율(%)과 멘탈 상태를 게임의 HP처럼 보여주어 재미있게 일정을 관리할 수 있습니다.

🛠 Docker 활용

Docker를 사용하여 웹 서버와 MySQL을 각각 컨테이너로 구성했습니다.

명령어 한 번으로 프로젝트 실행
모든 PC에서 동일한 개발 환경 제공
환경 설정 문제를 줄여 편리한 협업 가능

---

🛠️ 프로젝트 폴더 구조 (Directory Structure)

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
