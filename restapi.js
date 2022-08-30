"use strict"
// const moment = require("moment")
const dbs = require("./dbs")
const sql_set_persion_mysql = `INSERT INTO Persons (lastName, status, age) VALUES(?, ?, ?)`

const Service = {
    createPersion: async (req, res, next) => {
        try {
            const persion = req.body
            let sql, result, binds
            sql = sql_set_persion_mysql
            binds = [persion.lastName,persion.status,persion.age]
            result = await dbs.query(sql, binds)
            console.log(`createPersion successfullly`)
            res.json(result[0])
        } catch (err) {
            console.log(`createPersion `, err)
            // throw new Error(err.message)
            next(err)
        }
    }
}

module.exports = Service