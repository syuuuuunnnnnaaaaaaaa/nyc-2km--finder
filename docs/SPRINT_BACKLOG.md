# 📊 NYC 2km Spot & Route Finder - 스프린트 백로그 (Sprint Backlog)

본 문서는 각 스프린트별 개발 작업 태스크의 진행 상황을 추적하고 관리하기 위한 백로그 문서입니다.

---

## 🚦 진행 상태 요약 (Status Overview)

| 스프린트 | 마일스톤 목표 | 상태 | 진행률 |
|---|---|:---:|:---:|
| **Sprint 1** | UI 레이아웃 및 PRD 화면 명세 일치화 | 🟢 완료 | 100% |
| **Sprint 2** | 유효성 검증 & 5초 타임아웃 & 에러 제어 파이프라인 | 🟡 진행 예정 | 0% |
| **Sprint 3** | 지오코딩, 2km 반경 명소 필터링 & 최적 동선 엔진 | ⚪ 대기 | 0% |
| **Sprint 4** | 지도 시각화 (Map View) 및 인터랙티브 UX 고도화 | ⚪ 대기 | 0% |
| **Sprint 5** | E2E 테스트, 성능 최적화, 접근성 및 배포 | ⚪ 대기 | 0% |

---

## 🏃 Sprint 1: UI 레이아웃 및 PRD 화면 명세 일치화

- **목표**: PRD 화면 명세(UI Spec)에 부합하는 레이아웃 및 컴포넌트 구성
- **담당 컴포넌트**: `spot-finder.tsx`, `nearby-spots.tsx`, `route-timeline.tsx`, `site-header.tsx`

| 태스크 ID | 작업 내용 | 우선순위 | 상태 | 산출물/비고 |
|---|---|:---:|:---:|---|
| S1-01 | 입력창 Placeholder `"가고싶은 여행지를 입력하시오"` 적용 | High | ✅ 완료 | `components/spot-finder.tsx` |
| S1-02 | 글자수 카운터(`현재/50`) 및 2~50자 제한 UI 연동 | High | ✅ 완료 | `components/spot-finder.tsx` |
| S1-03 | 요약 버튼 로딩 상태(`Loader2` + `"검색 중"`) 스피너 구현 | High | ✅ 완료 | `components/spot-finder.tsx` |
| S1-04 | 상단 문구 `"반경 2키로 이내 유명 명소입니다"` 및 명소 3개 카드 그리드 | High | ✅ 완료 | `components/nearby-spots.tsx` |
| S1-05 | 하단 문구 `"추천하는 이동 동선"` 및 타임라인 스텝 뷰 | High | ✅ 완료 | `components/route-timeline.tsx` |
| S1-06 | 데모 칩 (타임스퀘어, 센트럴파크, 브루클린 브리지 등) 및 에러 테스트 칩 구성 | Medium | ✅ 완료 | `components/spot-finder.tsx` |

---

## 🏃 Sprint 2: 유효성 검증, 5초 타임아웃 및 에러 제어 파이프라인

- **목표**: PRD 6항의 엄격한 에러 기준을 모두 빨간 글씨 `"다시 입력해주세요.."`로 일관되게 처리하는 방어 로직 완성
- **담당 모듈**: `lib/validator.ts`, `lib/timeout.ts`, `components/spot-finder.tsx`

| 태스크 ID | 작업 내용 | 우선순위 | 상태 | 산출물/비고 |
|---|---|:---:|:---:|---|
| S2-01 | 입력값 2자 미만 / 50자 초과 시 즉시 차단 및 에러 메시지 표출 | High | ⏳ 대기 | `lib/validator.ts` |
| S2-02 | 5초 타임아웃 AbortController 유틸리티 구현 | High | ⏳ 대기 | `lib/timeout.ts` |
| S2-03 | 5초 초과 시 로딩 해제 + 빨간 글씨 `"다시 입력해주세요.."` 강제 노출 | High | ⏳ 대기 | `components/spot-finder.tsx` |
| S2-04 | 존재하지 않는 장소 및 검증 실패 시 빨간 글씨 `"다시 입력해주세요.."` 통일 | High | ⏳ 대기 | `components/spot-finder.tsx` |
| S2-05 | 잘못된 결과 반환 시 화면 렌더링 차단 및 에러 처리 | High | ⏳ 대기 | `components/spot-finder.tsx` |
| S2-06 | 횟수 제한 없는 재입력 및 재시도 상태 복구 메커니즘 검증 | High | ⏳ 대기 | 상태 초기화 검증 |

---

## 🏃 Sprint 3: 지오코딩, 2km 반경 명소 필터링 & 최적 동선 엔진

- **목표**: 실제 좌표 기반 2km 반경 필터링과 방문 순서 최적화 엔진 구현
- **담당 모듈**: `lib/geo.ts`, `lib/nyc-dataset.ts`, `lib/route-optimizer.ts`, `app/api/spots/search/route.ts`

| 태스크 ID | 작업 내용 | 우선순위 | 상태 | 산출물/비고 |
|---|---|:---:|:---:|---|
| S3-01 | NYC 주요 명소 50선 좌표 및 카테고리 데이터셋 구축 | High | ⏳ 대기 | `lib/nyc-dataset.ts` |
| S3-02 | 하버사인 공식 기반 2km 반경 명소 필터링 함수 작성 | High | ⏳ 대기 | `lib/geo.ts` |
| S3-03 | 기준점으로부터 가까운 순(오름차순) 정확히 3곳 추출 로직 | High | ⏳ 대기 | `lib/geo.ts` |
| S3-04 | 출발지 → 1차 → 2차 → 3차 최적 이동 동선(거리/시간) 산출기 | High | ⏳ 대기 | `lib/route-optimizer.ts` |
| S3-05 | Next.js API Route (`/api/spots/search`) 엔드포인트 구현 | Medium | ⏳ 대기 | `app/api/spots/search/route.ts` |

---

## 🏃 Sprint 4: 지도 시각화 (Map View) 및 인터랙티브 UX 고도화

- **목표**: 검색된 명소 3곳 및 이동 동선을 지도상에 시각화
- **담당 모듈**: `components/map/`, `components/spot-finder.tsx`

| 태스크 ID | 작업 내용 | 우선순위 | 상태 | 산출물/비고 |
|---|---|:---:|:---:|---|
| S4-01 | 경량 인터랙티브 지도 컴포넌트 추가 (2km 반경 Circle 오버레이) | Medium | ⏳ 대기 | `components/map/spot-map.tsx` |
| S4-02 | 출발지(핀) 및 3개 명소(1,2,3 넘버 뱃지) 마커 표시 | Medium | ⏳ 대기 | `components/map/map-marker.tsx` |
| S4-03 | 출발지부터 명소들을 잇는 동선 Polyline 라인 렌더링 | Medium | ⏳ 대기 | `components/map/route-line.tsx` |
| S4-04 | 명소 카드 클릭 시 지도 포커스 연동 인터랙션 | Low | ⏳ 대기 | `components/nearby-spots.tsx` |

---

## 🏃 Sprint 5: E2E 테스트, 성능 최적화, 접근성 및 배포

- **목표**: 안정성 검증, 번들 경량화, 접근성 준수 및 배포 완료
- **담당 모듈**: `tests/`, `app/layout.tsx`, CI/CD

| 태스크 ID | 작업 내용 | 우선순위 | 상태 | 산출물/비고 |
|---|---|:---:|:---:|---|
| S5-01 | 유효성 검사, 타임아웃, 동선 계산 단위 테스트 작성 | High | ⏳ 대기 | `tests/unit/` |
| S5-02 | 스크린 리더(`aria-*`, `role="alert"`) 웹 접근성(a11y) 검증 | Medium | ⏳ 대기 | UI 전반 |
| S5-03 | 프로덕션 빌드 검증 및 린트 검사 (`pnpm build`) | High | ⏳ 대기 | CI/CD |
| S5-04 | Vercel 배포 및 최종 운영 환경 점검 | High | ⏳ 대기 | Vercel |

---

## 📝 스프린트 운영 규칙 (Sprint Guidelines)

1. **에러 문구 무관용 원칙**: PRD에 따라 모든 예외/에러는 무조건 빨간 글씨 `"다시 입력해주세요.."`로 표기해야 함.
2. **타임아웃 5초 엄수**: 외부 API 지연 상황에서도 클라이언트 UX는 5초 내에 반드시 중단되고 피드백을 주어야 함.
3. **완료 정의(DoD)**: 각 태스크는 단위 테스트 또는 명확한 동작 확인 후 완료 처리함.
