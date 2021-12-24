
use crate::schema::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct BaseInfoNode {
    pub id: String,
    pub name: String,
    pub coordinate: String
}