use crate::schema::*;
use serde::{Deserialize, Serialize};

// 该结构对应从数据库表中查询结果映射的结构
#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub created_at: chrono::NaiveDateTime,
}

// 该结构对应向数据库表插入时使用的结构
#[derive(Insertable, Debug)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub name: &'a str,
    pub email: &'a str,
    pub created_at: chrono::NaiveDateTime,
}