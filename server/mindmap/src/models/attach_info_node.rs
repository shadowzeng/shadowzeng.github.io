
use crate::schema::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct AttachInfoNode {
    pub id: String,
    pub note: String,
    pub image: String,
}