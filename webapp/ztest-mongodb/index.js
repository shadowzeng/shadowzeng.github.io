var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/zeng';

MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log('successfully connect');
    var dbase = db.db('zeng');

    // 创建集合///////////////////////////////////////////
    // dbase.createCollection('blog',function(err,res){
    //     if (err) throw err;
    //     console.log('创建集合');
    //     db.close();
    // });

    // 插入数据///////////////////////////////////////////
    // var testBlog = {name:'zeng',age:'1',date:'2018-08-23'};
    // dbase.collection('blog').insertOne(testBlog,function(err,res){
    //     if (err) throw err;
    //     console.log('插入文档');
    //     db.close();
    // });
    // var testBlogs = [{name:'zeng',age:'1',date:'2018-08-23'}];
    // dbase.collection('blog').insertMany(testBlogs,function(err,res){
    //     if (err) throw err;
    //     console.log('插入文档的数量：'+res.insertedCount);
    //     db.close();
    // });

    // 查询所有数据///////////////////////////////////////////
    // dbase.collection('blog').find({}).toArray(function(err,res){
    //     if (err) throw err;
    //     console.log(res);
    //     db.close();
    // });

    // 条件查询///////////////////////////////////////////
    // var whereStr = {name:'zeng'}; // 查询条件
    // dbase.collection('blog').find(whereStr).toArray(function(err,res){
    //     if (err) throw err;
    //     console.log(res);
    //     db.close();
    // });

    // 更新数据///////////////////////////////////////////
    var whereStr = {name:'zeng'};
    var updateStr = {$set:{age:2}};
    dbase.collection('blog').updateOne(whereStr,updateStr,function(err,res){
        if (err) throw err;
        console.log('文档更新成功');
        db.close();
    });
});
