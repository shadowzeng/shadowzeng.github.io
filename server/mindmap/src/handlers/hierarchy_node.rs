use actix_web::{web, HttpResponse, Error};
use crate::schema::hierarchy_node::dsl::*;
use crate::db::PostgresPool;
use crate::errors::{ServiceError};
use crate::models::hierarchy_node::{HierarchyNode, NewHierarchyNode};
use diesel::dsl::{insert_into};
use diesel::QueryDsl;
use crate::diesel::RunQueryDsl;

pub async fn new_hierarchy_node(db: web::Data<PostgresPool>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || do_new_hierarchy_node(db))
        .await
        .map(|node| HttpResponse::Ok().json(node))
        .map_err(|e| ServiceError::InternalServerError(e.to_string()))?)
}

fn do_new_hierarchy_node(
    db: web::Data<PostgresPool>,
) -> Result<HierarchyNode, diesel::result::Error> {
    let conn = db.get().unwrap();
    let newName = "Node";
    let new_node = NewHierarchyNode {
        name: &newName,
    };
    let res = insert_into(hierarchy_node).values(&new_node).get_result(&conn)?;
    Ok(res)
}

