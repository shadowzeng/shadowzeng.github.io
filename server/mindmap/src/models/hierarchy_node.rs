use crate::schema::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct HierarchyNode {
    pub id: String,
    pub name: String,
    pub parent: String,
}

#[derive(Insertable, Debug)]
#[table_name = "hierarchy_node"]
pub struct NewHierarchyNode<'a> {
    pub id: &'a str,
    pub name: &'a str,
    pub parent: &'a str,
}