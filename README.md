# 데이터라이즈 과제 - 차의현

## 실행 방법

```bash
cd apps
yarn install
yarn start-server
yarn start-client

# 테스트
yarn test-client # 테스트 코드는 `useDebounce.test.ts` 파일만 작성하였습니다.
```

## 구조

### 추가로 사용한 라이브러리

- 스타일
  - tailwindcss
  - mui
- 유틸성
  - axios
  - dayjs
  - zod
  - @tanstack/react-query
- 라우터
  - react-router-dom

### 파일 구조

```
src/
├── apis/ --------- API 폴더
├── components/ --- MUI 외 컴포넌트 폴더
├── contexts/ ----- Context 폴더
├── hooks/ -------- Hooks 폴더
├── routes/ ------- 페이지 컴포넌트 폴더
├── utils/ -------- 유틸성 파일 폴더
└── router.tsx ---- route 정보
```

### 라우트 구조

- `PurchaseFrequency` :: `/`
  - 가격대별 구매 빈도 차트
    - 첫 화면 진입시 24년 7월 1일부터 말일까지로 조회됩니다.
- `Customers` :: `/customers`
  - 고객 목록
    - 상단의 인풋에 이름을 입력시 0.3초 디바운싱 후 검색됩니다.
    - 헤더의 이름을 클릭시 정렬이 변경됩니다.
- `CustomerPurchases` :: `/customers/:id/purchases`
  - 특정 고객의 구매 내역
    -  : 에러 발생시 토스트 메시지를 띄우고 모달을 닫습니다.

# 에러 처리

API 오류 발생시 에러메시지를 3초 동안 토스트 메시지로 띄우도록 구현하였습니다.
그 외 오류 발생시 에러 화면으로 이동됩니다.
