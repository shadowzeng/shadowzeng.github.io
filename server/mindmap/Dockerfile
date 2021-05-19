FROM rust:1.52.1-slim

WORKDIR /usr/src/mindmap
COPY . .
RUN cargo build --release
RUN cargo install --path .
CMD ["/usr/local/cargo/bin/mindmap"]