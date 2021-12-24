
#[macro_use]
extern crate log4rs;
extern crate log4rs_rolling_file;

use actix_web::*;
use std::sync::*;
use log::*;

mod handlers;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    init_logger();

    // Start http server
    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .route("/file/get", web::get().to(handlers::get_file))
            .route("/file/save", web::post().to(handlers::save_file))
            .route("/file/save_as", web::post().to(handlers::save_as_file))
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
