use actix_web::{web, HttpResponse, Error};
use crate::schema::hierarchy_node::dsl::*;
use crate::db::PostgresPool;
use crate::errors::{ServiceError};
use crate::models::hierarchy_node::{HierarchyNode, NewHierarchyNode};
use diesel::dsl::{insert_into};
use diesel::QueryDsl;
use crate::diesel::RunQueryDsl;
use serde::{Deserialize, Serialize};
use log::{info};

#[derive(Debug, Serialize, Deserialize)]
pub struct  InputNode {
    pub id: String,
    pub parent: String,
    pub name: String,
    pub coordinate: String, // {x: number, y: number}
    // pub font
    // pub colors
    // pub locked
    // pub payload
    // pub image
    // pub k
}

// #[derive(Debug, Serialize, Deserialize)]
// pub struct InputMap {
// }

pub async fn to_db(
    db: web::Data<PostgresPool>,
    map: web::Json<Vec<InputNode>>
) -> Result<HttpResponse, Error> {
    Ok(web::block(move || do_to_db(db, map))
        .await
        .map(|node| HttpResponse::Ok().json(node))
        .map_err(|e| ServiceError::InternalServerError(e.to_string()))?)
}

fn do_to_db(
    db: web::Data<PostgresPool>,
    map: web::Json<Vec<InputNode>>,
) -> Result<HierarchyNode, diesel::result::Error> {
    let conn = db.get().unwrap();
    info!("{:#?}", map[0]);
    let new_node = NewHierarchyNode {
        id: &map[0].id,
        name: &map[0].name,
        parent: &map[0].parent,
    };
    let res = insert_into(hierarchy_node).values(&new_node).get_result(&conn)?;
    Ok(res)
}

