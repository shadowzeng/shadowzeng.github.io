FROM rust:1.51.0-slim

WORKDIR /usr/src/docker-rust
COPY . .

RUN cargo install --path .

CMD ["docker-rust"]