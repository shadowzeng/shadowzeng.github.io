use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::fs::{write};
use std::string::ToString;
use std::io::BufReader;
use std::io::Read;
use chrono::Local;
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

// pub async fn save_file(bytes: web::Bytes) -> Result<HttpResponse, Error> {
//     Ok(
//         web::block(move || do_save_file(bytes))
//             .await
//             .map(|message| HttpResponse::Ok().json(message))
//             .map_err(|_| HttpResponse::InternalServerError())?,
//     )
// }
pub async fn save_file(bytes: web::Bytes) -> Result<HttpResponse, Error> {
    let content = String::from_utf8(bytes.to_vec()).map_err(|_| HttpResponse::BadRequest().finish())?;

    match write("/home/mindmap_file_data/map.json", content) {
        Ok(_) => {
            Ok(HttpResponse::Ok().json("ok"))
        },
        Err(_) => {
            Ok(HttpResponse::InternalServerError().json("error"))
        }
    }
}

pub async fn save_as_file(bytes: web::Bytes) -> Result<HttpResponse, Error> {
    let content = String::from_utf8(bytes.to_vec()).map_err(|_| HttpResponse::BadRequest().finish())?;

    let name = format!("/home/mindmap_file_data/map-{}.json", Local::now().format("%Y-%m-%d"));
    info!("{}", name);
    match write(name, content) {
        Ok(_) => {
            Ok(HttpResponse::Ok().json("ok"))
        },
        Err(_) => {
            Ok(HttpResponse::InternalServerError().json("error"))
        }
    }
}

fn do_get_file() -> Result<String, std::io::Error> {
    let file = File::open("/home/kai/test.json")?;
    let mut buf_reader = BufReader::new(file);
    let mut content = String::new();
    buf_reader.read_to_string(&mut content)?;
    Ok(content)
}

// fn do_save_file(bytes: web::Bytes) -> Result<String, Error> {
//     // match String::from_utf8(bytes.to_vec()) {
//     //     Ok(text) => Ok(write("/home/kai/test.json", text)),
//     //     Err(_) => Err()
//     // }
//     let content = String::from_utf8(bytes.to_vec()).map_err(|_| HttpResponse::BadRequest().finish())?;
//     match write("/home/kai/test.json", content) {
//         Ok(_) => {
//             Ok("ok".to_string())
//         },
//         Err(_) => {
//             Err(Error {cause: Box(HttpResponse::BadRequest().finish())})
//         }
//     }
// }
