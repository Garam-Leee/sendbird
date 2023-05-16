# frontend-standard

## 🗂️ Project Structure

- components
  - atoms: input, button, 
  - molecules: search, list
  - organisms: domain을 가지는 components
  - pages: atomic design pattern에서 template과 pages가 병합된 directory
- const: 상수를 정의한 파일들 [domain].ts
- enum class 등 상수를 정의하는 방법
- hooks: 재사용가능한 react logic, data fetcher, cookie handler 등을 react custom hook 코드들
- lib: 재사용 가능한 javascript/typescript logic 코드들
- pages
- public
  - images
  - lotties: 애니메이션 파일들
  - robots.txt
  - favicon.ico
  - sitemap.xml
- styles
  - fonts.css
  - globals.css
  - reset.css
  - theme.ts
- types
  - global.d.ts: window 객체 등의 type 정의
  - node.d.ts: node 객체의 type 정의
  - emotion.d.ts: emotion의 theme 등 type 정의
  - [domain].d.ts: 각 도메인의 Object와 API Response, Request type 정의
- .env
- .env.local
- eslintrc.json
- .gitignore
- .prettierrc
- Dockerfile
- entrypoint.sh
- next-env.d.ts
- next.config.ts
- package.json
- package-lock.json
- readme.md
- tsconfig.json

## ✍️ Naming Convention

### Files/Folder