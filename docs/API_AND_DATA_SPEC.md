# 📑 NYC 2km Spot & Route Finder - API & 데이터 모델 명세서 (API & Data Spec)

본 문서는 데이터 구조, 인터페이스 타입, API 엔드포인트 및 에러 스펙을 정의합니다.

---

## 1. 데이터 모델 (TypeScript Data Models)

```typescript
/**
 * 반경 2km 이내 개별 명소 정보
 */
export interface Spot {
  name: string;              // 명소명 (한글)
  nameEn: string;            // 명소명 (영어)
  lat: number;               // 위도
  lng: number;               // 경도
  distanceKm: number;        // 기준 위치(출발지)로부터의 거리 (단위: km)
  minutes: number;           // 도보 이동 예상 시간 (단위: 분)
  tag: string;               // 카테고리 태그 (예: '도심 공원', '전망대', '미술관')
}

/**
 * 최종 추천 일정 및 최적 동선 결과
 */
export interface Itinerary {
  origin: string;            // 입력/선택한 출발지명 (한글)
  originEn: string;          // 출발지명 (영어)
  originLat: number;         // 출발지 위도
  originLng: number;         // 출발지 경도
  line: string;              // 대중교통/지하철 라인 힌트 (예: 'N Q R W')
  lineColor: string;         // 라인 테마 색상
  spots: Spot[];             // 반경 2km 이내 명소 3개 (거리 오름차순 정렬)
  totalKm: number;           // 총 이동 거리 (단위: km)
  totalMinutes: number;      // 총 소요 시간 (단위: 분)
}
```

---

## 2. 검색 및 유효성 검증 규칙 (Validation Rules)

| 검증 항목 | 조건 | 에러 처리 결과 |
|---|---|---|
| 입력값 길이 | `2자 <= length <= 50자` | 위반 시 즉시 차단, 빨간 글씨 `"다시 입력해주세요.."` 표시 |
| 타임아웃 | 응답 대기 시간 `>= 5000ms` | 즉시 Abort, 로딩 해제, 빨간 글씨 `"다시 입력해주세요.."` 표시 |
| 지역 검증 | 뉴욕(NYC 5개구) 영역 내 좌표 여부 | 불일치 시 빨간 글씨 `"다시 입력해주세요.."` 표시 |
| 명소 수 | 반경 2.0km 내 명소 수 `< 3개` | 유효 결과 미충족으로 판단, 빨간 글씨 `"다시 입력해주세요.."` 표시 |

---

## 3. 내부 API 라우트 명세 (Internal API Route)

### `POST /api/spots/search`

- **요청 본문 (Request Body)**:
```json
{
  "query": "타임스퀘어"
}
```

- **성공 응답 (Success Response: 200 OK)**:
```json
{
  "success": true,
  "data": {
    "origin": "타임스퀘어",
    "originEn": "Times Square",
    "originLat": 40.758,
    "originLng": -73.9855,
    "line": "N Q R W",
    "lineColor": "var(--color-chart-2)",
    "spots": [
      {
        "name": "브라이언트 파크",
        "nameEn": "Bryant Park",
        "distanceKm": 0.4,
        "minutes": 6,
        "tag": "도심 공원",
        "lat": 40.7536,
        "lng": -73.9832
      },
      {
        "name": "뉴욕 공립도서관",
        "nameEn": "NY Public Library",
        "distanceKm": 0.9,
        "minutes": 12,
        "tag": "건축 · 실내",
        "lat": 40.7532,
        "lng": -73.9822
      },
      {
        "name": "엠파이어 스테이트 빌딩",
        "nameEn": "Empire State Building",
        "distanceKm": 1.6,
        "minutes": 21,
        "tag": "전망대",
        "lat": 40.7484,
        "lng": -73.9857
      }
    ],
    "totalKm": 1.9,
    "totalMinutes": 25
  }
}
```

- **실패 응답 (Error Response: 400 / 404 / 504)**:
```json
{
  "success": false,
  "message": "다시 입력해주세요.."
}
```
