FROM node:20-alpine as build
WORKDIR "/src"

COPY package.json yarn.lock /src/
RUN yarn install --frozen-lockfile --ignore-scripts && \
	yarn cache clean
COPY . /src
RUN yarn build

FROM scratch AS export
WORKDIR /
COPY --from=build /src/build ./build
COPY --from=build /src/assets ./assets



FROM nginx:stable-alpine
COPY --from=export /build/index.html /usr/share/nginx/html/index.html
COPY --from=export /build /usr/share/nginx/html/
