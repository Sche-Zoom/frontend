# Sche-Zoom

## 디자인 노트

- Next.js 14의 App Router와 RSC를 사용하였습니다.
- RSC의 경우 ServerActions, RCC는 React-Query를 사용하여 데이터를 처리하였습니다.
- TailwindCSS와 Shadcn-Ui를 사용하여 디자인을 구성하였습니다.

## 개발 환경 설정

```bash
npm install -global pnpm
pnpm i
pnpm dev
```

## 폴더 구조

- 파일명: `kebab-case`
- 컴포넌트: export default function `PascalCase`
- 컴포넌트 내 함수: arrow function `camelCase`
- 전역 함수: arrow function `camelCase`
- 상수: `UPPER_SNAKE_CASE`

```bash
├─.husky # Github Hook
│  └─_
├─.next # Next.js
├─.vscode # vscode setting
├─public # static file
│  └─fonts
└─src
    ├─app # page routing
    ├─components
    │  ├─ui # atomic component
    │  ├─page # page component
    │  └─"pageName" # page component
    ├─hooks
    ├─store # global state management
    ├─types # api request, response type
    └─lib # utility
```
