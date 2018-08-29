var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var MongoConn = null;

const DB_URL = 'mongodb://118.25.41.250:27017';

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
        MongoConn.db('blog').collection('article').insertOne(doc,function(err,res){
            if (err) throw err;
            console.log('插入一条文档');
        });
    },
    findAll: function(callback){
        MongoConn.db('blog').collection('article').find({}).toArray(function(err,res){
            if (err) throw err;
            callback(res);
        });
    }
};