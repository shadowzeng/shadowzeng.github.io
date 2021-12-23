const mongoose = require('./connection')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String
})

const userModel = mongoose.model('user', userSchema)

class UserAction {
    query() {
        return new Promise((resolve, reject) => {
            userModel.find({}, (err, res) => {
                if (err)
                    reject(err)
                resolve(res)
            })
        })
    }
    save(obj) {
        const u = new userModel(obj)
        return new Promise((resolve, reject) => {
            u.save((err, res) => {
                if (err)
                    reject(err)
                console.log(res)
                resolve(res)
            })
        })
    }
}

module.exports = new UserAction()
