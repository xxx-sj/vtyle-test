# 1단계: 개발 및 빌드 의존성 설치
FROM node:22-alpine AS development

# NestJS 애플리케이션이 실행될 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 파일을 복사하고, 개발 환경에서 의존성 설치
COPY --chown=node:node package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 소스 파일 복사
COPY --chown=node:node . .

# Node 사용자로 권한을 설정하여 보안 강화
USER node

# 2단계: 빌드
FROM node:22-alpine AS build

# 빌드 환경에서 사용할 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 파일 복사
COPY --chown=node:node package*.json yarn.lock ./

# development 단계에서 설치된 node_modules 복사
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# 전체 소스 파일 복사
COPY --chown=node:node . .

# 프로덕션 환경 변수 설정
ENV NODE_ENV production

# NestJS 애플리케이션 빌드
RUN yarn build

# 프로덕션에서 불필요한 개발 의존성 제거하고 프로덕션 의존성만 설치
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Node 사용자로 권한 설정
USER node

# 3단계: 프로덕션 실행
FROM node:22-alpine AS production

# 프로덕션 환경 변수 설정
ENV NODE_ENV production

# 실행 환경에서 사용할 디렉토리 설정
WORKDIR /usr/src/app

# 빌드된 애플리케이션 파일 복사
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# 프로덕션 환경에 필요한 node_modules 복사
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules


# 애플리케이션 포트 노출
EXPOSE 3000

# NestJS 애플리케이션 실행
CMD [ "node", "dist/main.js" ]