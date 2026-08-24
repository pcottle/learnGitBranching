FROM node:14.20.0-alpine3.16 as build
WORKDIR "/src"

COPY package.json yarn.lock /src/
RUN yarn install --frozen-lockfile --ignore-scripts && \
	yarn cache clean
COPY . /src
RUN yarn gulp build

FROM scratch AS export
WORKDIR /
COPY --from=build /src/index.html .
COPY --from=build /src/build ./build
COPY --from=build /src/assets ./assets



FROM nginx:stable-alpine
COPY --from=export /index.html /usr/share/nginx/html/index.html
COPY --from=export /build /usr/share/nginx/html/build
COPY --from=export /assets /usr/share/nginx/html/assets
