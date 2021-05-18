
#[macro_use]
extern crate diesel;

use actix_web::*;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use std::sync::*;

mod errors;
mod handlers;
mod models;
mod schema;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=debug");

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let data = Arc::new(Mutex::new(ActixData::default()));
    // Start http server
    HttpServer::new(move || {
        App::new()
            .data(data.clone())
            .route("/users", web::get().to(handlers::get_users))
            .route("/users/{id}", web::get().to(handlers::get_user_by_id))
            .route("/users", web::post().to(handlers::add_user))
            .route("/users/{id}", web::delete().to(handlers::delete_user))
    })
    .bind("127.0.0.1:8083")?
    .run()
    .await
}

#[derive(Debug, Default)]
struct ActixData {
    counter: usize,
}
