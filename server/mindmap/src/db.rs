use diesel::{PgConnection};
use diesel::r2d2::{self, ConnectionManager, Pool};

pub type PostgresPool = Pool<ConnectionManager<PgConnection>>;

pub fn create_pg_connection() -> PostgresPool {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    Pool::builder().build(manager).expect("Failed to create pool.")
}
