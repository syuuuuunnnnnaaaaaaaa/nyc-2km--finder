# 🎨 NY Route (Urban Velocity) 디자인 시스템 개편 계획서

## 1. 개요 및 목적
- **디자인 시스템 명**: **Urban Velocity (도시적 속도감)**
- **브랜드 정체성**: Urban & Professional, Efficient & Fast, Reliable & Trustworthy, Dynamic & Energetic
- **목적**: 루트에 정의된 `design.md` 및 `code.html` 명세에 맞추어 전체 웹 애플리케이션의 컬러 팔레트, 폰트(Montserrat), 라운드 반경(8px), 섀도우, 랜딩 페이지 및 결과 컴포넌트의 톤앤매너를 뉴욕 특유의 세련되고 역동적인 비주얼로 전면 개편 완료.

---

## 2. 디자인 토큰 및 가이드라인 정의 (`design.md` 기준)

### 2.1 컬러 시스템 (Color Palette)
| 역할 | 토큰명 | HEX 코드 | 설명 |
|---|---|---|---|
| **Primary** | `primary` | `#305cd4` | New York Blue (신뢰감 있고 딥한 블루) |
| **Secondary / Highlight** | `secondary` | `#ffcc00` | Taxi Yellow (뉴욕 옐로우 캡 포인트) |
| **Surface (배경)** | `surface` | `#fbf8ff` | 쿨톤의 밝고 깨끗한 서피스 배경 |
| **On-Surface (텍스트)** | `on-surface` | `#1a1b21` | 깊이감 있는 딥 다크 텍스트 |
| **Surface Container Low** | `surface-container-low` | `#f4f2fe` | 연한 퍼플/블루 틴트의 연보라/그레이 톤 |
| **Surface Container High** | `surface-container-high` | `#eceaf4` | 카드 테두리 및 구분선용 |
| **Error** | `error` | `#ba1a1a` | PRD 표준 에러 ("다시 입력해주세요..") |

### 2.2 타이포그래피 (Typography)
- **Primary Font**: `Montserrat, sans-serif` (Google Fonts 연동)
- **한글 보조 Font**: `Pretendard / IBM Plex Sans KR`
- **Headings**:
  - H1: `font-bold text-3xl md:text-5xl leading-tight tracking-tight`
  - H2: `font-bold text-2xl md:text-3xl leading-snug`
  - H3: `font-semibold text-lg md:text-xl`
- **Body**:
  - Large: `text-lg leading-relaxed`
  - Medium: `text-base leading-normal`
  - Small: `text-sm font-medium`

### 2.3 레이아웃 및 쉐이프 (Layout & Shapes)
- **Border Radius**: `8px` (`ROUND_EIGHT`, `rounded-lg`)로 전면 통일
- **Shadows**:
  - `sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
  - `md`: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- **Container Max Width**: 최대 `1200px` (시원하고 모던한 그리드)

---

## 3. 단계별 개편 완료 현황 (100% Complete)

| 단계 | 주요 작업 내용 | 상태 |
|---|---|:---:|
| **Step 1** | **전역 스타일 & 토큰**: `globals.css`, `layout.tsx` (Montserrat 폰트 주입, 컬러 토큰) | ✅ 완료 |
| **Step 2** | **공통 UI 컴포넌트**: `Button`, `Card`, `Badge`, `Input` (8px 라운드 & 그림자) | ✅ 완료 |
| **Step 3** | **상단 헤더 & 검색창**: `SiteHeader` (TopAppBar), `SpotFinder` (CTA 버튼 & 퀵 칩) | ✅ 완료 |
| **Landing**| **마케팅 랜딩 페이지**: `LandingHero`, `HowItWorks` (3단계 가이드 & CTA 스무스 인입) | ✅ 완료 |
| **Step 4** | **AI 테마 카드 & 결과 UI**: `AiThemeCard`, `NearbySpots`, `RouteTimeline`, `ShareButton` | ✅ 완료 |
| **Step 5** | **지도 반응형 디테일**: `SpotMap` 2km 원형 영역 `#305cd4` & 라인 최적화 | ✅ 완료 |
| **Step 6** | **품질 검증 & Vercel 배포**: Vitest 20개 Pass, Next.js 빌드, 프로덕션 배포 완료 | ✅ 완료 |

---

## 4. 검증 결과
1. ✅ `design.md`에 명시된 7개 컬러 코드와 Montserrat 폰트 완벽 적용
2. ✅ 모든 카드의 모서리 반경이 `8px` (`rounded-lg`)로 통일
3. ✅ PRD 2~50자 유효성, 5초 타임아웃, 빨간색 에러(`다시 입력해주세요..`) 완벽 보존
4. ✅ Vercel 배포 URL에서 모든 UI 및 지도 정상 렌더링 검증 완료
