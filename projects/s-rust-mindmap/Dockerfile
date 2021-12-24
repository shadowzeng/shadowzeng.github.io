# FROM rust:1.52.1-slim
FROM rust:1.51.0-slim

RUN apt-get update \
 && apt-get install -y libpq-dev \
 && rm -rf /var/lib/apt/lists/*

ENV DB_USER=mindmap
ENV APP_ADDRESS=0.0.0.0

WORKDIR /usr/src/mindmap
COPY . .
RUN cargo build --release
RUN cargo install --path .
CMD ["/usr/local/cargo/bin/mindmap"]
