use actix_web::Responder;
use actix_web::types::json::Json;
use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use std::vec::Vec;
use std::fs::File;
use std::fs::{write};
use std::string::ToString;
use std::io::BufReader;
use std::io::Read;
use log::{info};

#[derive(Debug, Serialize, Deserialize)]
pub struct MapFile {
}

pub async fn get_file() -> Result<HttpResponse, Error> {
    Ok(
        web::block(move || do_get_file())
        .await
        .map(|user| HttpResponse::Ok().json(user))
        .map_err(|e| HttpResponse::InternalServerError().json(format!("{}", e.to_string())))?,
    )
}

pub async fn save_file(content: web::Json<MapFile>) -> Result<HttpResponse, Error> {
    Ok(
        web::block(move || do_save_file(content))
            .await
            .map(|user| HttpResponse::Ok().json(user))
            .map_err(|_| HttpResponse::InternalServerError())?,
    )
}

fn do_get_file() -> Result<String, std::io::Error> {
    let file = File::open("/home/kai/test.json")?;
    let mut buf_reader = BufReader::new(file);
    let mut content = String::new();
    buf_reader.read_to_string(&mut content)?;
    Ok(content)
}

fn do_save_file(content: web::Json<MapFile>) -> Result<usize, std::io::Error> {
    write("/home/kai/test.json", content.to_string());
    Ok(1)
}
