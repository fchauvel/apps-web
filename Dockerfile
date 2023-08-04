FROM node:18 AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY static/ ./static/
COPY src/theme/ ./src/theme/
RUN npm install
COPY . ./
RUN npm run build

FROM node:18-alpine
WORKDIR /var/apps
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/build ./build
COPY --from=build /app/static/ ./static/
COPY --from=build /app/src/theme/ ./src/theme/
RUN npm ci --omit=dev
CMD ["node", "build"]
