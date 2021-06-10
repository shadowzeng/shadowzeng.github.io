#[macro_use]
extern crate diesel;

use actix_web::{HttpServer, App, web};
use actix_web::middleware::Logger;
use log::{info};

mod db;
mod errors;
mod handlers;
mod models;
mod schema;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // std::env::set_var("RUST_LOG", "info,actix_web=debug");
    // env_logger::init();
    init_logger();

    let pool = db::create_pg_connection();

    info!("Start server...");
    // Start http server
    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
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
