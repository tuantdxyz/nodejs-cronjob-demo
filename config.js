module.exports = {
    ent: "tuantd",
    dbtype: "mysql",
    port: 3001,
    sessionTimeout: 9000000,
    url_api: "https://faker-api-v1.herokuapp.com/api/",        //TODO change url post api
    poolConfig: { user: "tuantd", password: "admin123", database: "proxy_lab", host: "172.16.9.26", port: 3306 },   //TODO change database config (mysql)
    scheduleslist: [
        // Job scan DB 10s scan
        { schedulename: "Send to api post", scheduleinterval: '10 * * * * *', schedulemethod: `schedule.sendToApi()`, schedulestatus: 0 }
    ]
}
