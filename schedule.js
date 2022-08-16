"use strict"
// const moment = require("moment")
const dbs = require("./dbs")
const config = require("./config")
const axios = require("axios")

const sql_getTuanClazz = `SELECT * from tuan_clazz WHERE status = 0 order by id, datetime_trans LIMIT 1 OFFSET 0`
const sql_updateTuanClazz = `UPDATE tuan_clazz SET status=1 WHERE id=?`

const Service = {
    sendToApi: async (req, res, next) => {
        try {
            let sql_get, sql_update, result, binds_get, binds_update, rows
            sql_get = sql_getTuanClazz
            binds_get = []
            result = await dbs.query(sql_get, binds_get)
            rows = result[0]
            for (const row of rows) {
                console.log("row:", row)

                // call post API ==> example create student
                // TODO change param
                let params = {
                    class_id: "33fbf0cd-c8c1-47c3-81a0-146bbf76129f",
                    id: row.id,
                    name: "tuan trinh",
                    sex: row.description,
                    medium_score: row.id_ref,
                    avatar: "https://cdn.fakercloud.com/avatars/ionuss_128.jpg"
                }
                const token = "TOKEN";   //TODO change TOKEN
                let host = config.url_api
                await axios.post(`${host}students`, params, {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Basic ${token}`
                    }
                })
                    .then(result => {
                        console.log("Call successfullly api:", result)
                    })
                    .catch(err => {
                        console.log("Error call api:", err && err.message)
                    })

                // update db after call api
                sql_update = sql_updateTuanClazz
                binds_update = [row.id]
                await dbs.query(sql_update, binds_update)
                console.log("Update successfullly database")
            }
        } catch (err) {
            console.log(`sendToApi `, err)
        }
    }
}

module.exports = Service