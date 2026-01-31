
# Gallery.IO 제품 요구 사양서 (PRD)

## 1. 프로젝트 개요
**Gallery.IO**는 개발자가 빌드한 다양한 웹 서비스를 한곳에서 시각적으로 관리하고 전시하는 **프리미엄 프로젝트 대시보드**입니다. Glassmorphism UI와 자동 썸네일 생성 기술을 결합하여 최소한의 입력으로 고퀄리티 포트폴리오를 유지할 수 있도록 돕습니다.

- **현재 버전**: v1.4.0 (UX & Reordering Update)
- **최종 업데이트**: 2026-03-24
- **상태**: Vercel 배포 완료 및 사용자 맞춤형 브랜딩 적용
- **제작/권리**: © 2026 Deeptactlearning. All Rights Reserved.

---

## 2. 핵심 기능 (Key Features)

### 2.1 관리 시스템 (Admin System)
- **보안 로그인**: 프론트엔드 레벨에서 보안 코드(`2026`)를 통한 관리자 권한 제어.
- **프로젝트 순서 변경 (Drag & Drop)**: 
  - 관리자 모드에서 프로젝트 카드를 드래그하여 직관적으로 전시 순서 변경 가능.
  - HTML5 표준 드래그 API를 사용하여 별도의 라이브러리 없이 가볍고 빠른 동작 구현.
- **실시간 프로젝트 CRUD**:
  - **추가**: URL 입력 시 WordPress mshots API를 통한 실시간 사이트 스크린샷 자동 핫링크.
  - **수정**: 프로젝트 이름, URL, 다중 카테고리를 직관적인 모달 UI에서 변경 가능.
  - **삭제**: 실수 방지를 위한 2중 확인 경고 모달 시스템.
- **동적 카테고리 관리**:
  - 사용자 정의 카테고리 생성/삭제 및 고유 색상(6종 테마) 자동 할당.
- **데이터 관리**:
  - **JSON 내보내기**: 현재 설정된 프로젝트 및 카테고리 데이터를 JSON 형태로 추출하여 영구적인 코드 반영 요청 가능.
  - **데이터 초기화**: 로컬 저장소 데이터를 초기 상태로 리셋하는 기능.

### 2.2 사용자 인터페이스 (User Interface)
- **완벽한 한글화 (Localization)**: 모든 버튼, 안내 문구, 모달 메시지를 한국어로 최적화하여 직관적인 사용자 경험 제공.
- **브랜드 아이덴티티**:
  - **커스텀 파비콘(Favicon)**: 브라우저 탭에 앱 고유 로고(블루-퍼플 그라데이션 + 번개 심볼) 적용.
- **반응형 갤러리**: 데스크탑(5열)부터 모바일(1열)까지 최적화된 Grid Layout.
- **지능형 탐색**: 카테고리별 필터링 및 실시간 검색 기능을 제공합니다.

### 2.3 데이터 영속성 (Data Persistence)
- **LocalStorage**: 모든 입력 데이터 및 변경된 순서는 브라우저의 로컬 저장소에 보관되어 새로고침 후에도 유지됩니다.

---

## 3. 디자인 가이드라인

### 3.1 컬러 시스템
- **Main Background**: Deep Black (`#050505`)
- **Point Colors**: Electric Blue (`#3b82f6`), Neon Purple (`#a855f7`)
- **Glassmorphism**: White 3%~6% 투명도 + 12px Backdrop Blur 적용.

### 3.2 푸터 (Footer)
- **문구**: `© 2026 Deeptactlearning. All Rights Reserved.` (하단 정중앙 배치)

---

## 4. 기술 사양 (Tech Stack)
- **Core**: React 19, TypeScript
- **Build**: Vite 6, Vercel Deployment
- **Styling**: Tailwind CSS
- **Assets**: Inline Data URI SVG (Favicon & Icons)
- **API**: WordPress mshots (Screenshot API)

---

## 5. 업데이트 기록
- **v1.0**: 초기 Glassmorphism UI 설계
- **v1.2**: 관리자 모드 및 데이터 추출 기능 추가
- **v1.3**: 전면 한글화 작업 및 브랜드 파비콘 적용
- **v1.4**: 관리자 모드 프로젝트 순서 변경(드래그 앤 드롭) 기능 추가 및 데이터 최적화
