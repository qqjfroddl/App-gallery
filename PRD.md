
# Gallery.IO 제품 요구 사양서 (PRD)

## 1. 프로젝트 개요
**Gallery.IO**는 개발자가 빌드한 다양한 웹 서비스를 한곳에서 시각적으로 관리하고 전시하는 **프리미엄 프로젝트 대시보드**입니다. Glassmorphism UI와 자동 썸네일 생성 기술을 결합하여 최소한의 입력으로 고퀄리티 포트폴리오를 유지할 수 있도록 돕습니다.

- **현재 버전**: v2.0.0 (Data Full Sync & Asset Expansion)
- **최종 업데이트**: 2026-03-24
- **상태**: 최신 29개 프로젝트 데이터셋 동기화 완료
- **제작/권리**: © 2026 Deeptactlearning. All Rights Reserved.

---

## 2. 핵심 기능 (Key Features)

### 2.1 관리 시스템 (Admin System)
- **보안 로그인**: 프론트엔드 레벨에서 보안 코드(`2026`)를 통한 관리자 권한 제어.
- **프로젝트 순서 변경 (Drag & Drop)**: 관리자 모드에서 직관적으로 전시 순서 변경.
- **실시간 프로젝트 CRUD**: 모달 UI를 통한 추가/수정/삭제.

### 2.2 사용자 인터페이스 (User Interface)
- **최적화된 헤더 및 필터**:
  - 제목과 설명글을 분리하여 전문적인 레이아웃 구축.
  - **카테고리 자동 줄바꿈**: 9개 이상의 카테고리가 한눈에 보이도록 격자형 배치 적용.
- **콘텐츠 강화 (v2.0)**: "노트북LM 슬라이드 프롬프트"를 포함한 총 29개의 프로젝트 기본 탑재.
- **완벽한 한글화**: 모든 인터페이스 한국어 대응.

### 2.3 데이터 영속성 (Data Persistence)
- **LocalStorage**: v2.0 키를 통해 최신 초기 데이터를 사용자 브라우저에 즉시 동기화.

---

## 3. 디자인 가이드라인

### 3.1 컬러 시스템
- **Main Background**: Deep Black (`#050505`)
- **Point Colors**: Electric Blue (`#3b82f6`), Neon Purple (`#a855f7`)
- **UI 스타일**: Glassmorphism (글래스모피즘), Semi-transparent cards

---

## 4. 기술 사양 (Tech Stack)
- **Core**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **API**: WordPress mshots (Screenshot API)

---

## 5. 업데이트 기록
- **v1.9**: "노트북LM 슬라이드 편집기" 추가 및 총 28개 프로젝트 동기화
- **v2.0**: "노트북LM 슬라이드 프롬프트" 추가 및 총 29개 프로젝트 데이터셋 완결
