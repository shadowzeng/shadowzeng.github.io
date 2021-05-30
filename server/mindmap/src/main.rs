
#[macro_use]
extern crate diesel;

extern crate log4rs;
extern crate log4rs_rolling_file;

use actix_web::*;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use std::sync::*;
use log::*;

mod errors;
mod handlers;
mod models;
mod schema;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // std::env::set_var("RUST_LOG", "info,actix_web=debug");
    // env_logger::init();
    init_logger();

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    // Start http server
    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .data(pool.clone())
            .route("/users", web::get().to(handlers::get_users))
            .route("/users/{id}", web::get().to(handlers::get_user_by_id))
            .route("/users", web::post().to(handlers::add_user))
            .route("/users/{id}", web::delete().to(handlers::delete_user))
    })
    .bind("0.0.0.0:8083")?
    .run()
    .await
}

fn init_logger() {
    use log4rs::init_file;
    use log4rs::file::Deserializers;

    log::info!("init logger");
    let mut deserializers = Deserializers::default();
    log4rs_rolling_file::register(&mut deserializers);
    init_file("log4rs.yaml", deserializers).unwrap();
}