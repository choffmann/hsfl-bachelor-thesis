FROM node:20-bookworm as builder
ARG APP_URL
ARG AUTHOR
ARG CURRENT_BRANCH
ARG APP_VERSION
ARG LAST_COMMIT


ENV VITE_APP_URL=$APP_URL
ENV VITE_AUTHOR=$AUTHOR
ENV VITE_CURRENT_BRANCH=$CURRENT_BRANCH
ENV VITE_APP_VERSION=$APP_VERSION
ENV VITE_LAST_COMMIT=$LAST_COMMIT

RUN apt update && apt install -y \
    build-essential \
    curl 

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

WORKDIR /app

COPY experiment/ /app
RUN yarn install && yarn build

FROM nginx:bookworm
COPY --from=builder /app/webserver/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
