var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var MongoConn = null;

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'me';
const COLLEC_ARTICLE = 'blog';

// MongoClient.connect(url, function(err, db){
//     assert.equal(null, err);
//     console.log('successfully connect');
//     MongoUtils = db.db('zeng');
// });

module.exports = {
    connect: function(){
        if (!MongoConn){
            MongoClient.connect(DB_URL, function(err,db){
                assert.equal(null, err);
                MongoConn = db;
                console.log('MongoDB连接成功');
            });
        }
    },
    close: function(){
        MongoConn && MongoConn.close();
        MongoConn = null;
        console.log('MongoDB连接关闭');
    },
    save: function(doc){
        MongoConn.db(DB_NAME).collection(COLLEC_ARTICLE).insertOne(doc,function(err,res){
            if (err) throw err;
            console.log('插入一条文档');
        });
    },
    findAll: function(callback){
        MongoConn.db(DB_NAME).collection(COLLEC_ARTICLE).find({}).toArray(function(err,res){
            if (err) throw err;
            callback(res);
        });
    }
};