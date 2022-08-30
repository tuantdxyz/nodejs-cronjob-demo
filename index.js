"use strict"
const cron = require('node-cron')
const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const config = require("./config")
const schedule = require('./schedule')
const restapi = require('./restapi')

// run cronjob
let httpServer
function initialize() {
    return new Promise((resolve, reject) => {
        
        if (config.scheduleslist) {
            console.log("Start cronjob")
            for (const scheduletask of config.scheduleslist) {
                // const schedulename = scheduletask.schedulename
                const scheduleinterval = scheduletask.scheduleinterval
                // const schedulemethod = scheduletask.schedulemethod
                const schedulestatus = scheduletask.schedulestatus
                // scheduleslist = 1 ==> start job
                if (schedulestatus) {
                    cron.schedule(scheduleinterval, () => {
                        // eval(schedulemethod)
                        schedule.sendToApi()
                    })
                }
            }
        }

        // run app
        const app = express()
        const api = express.Router()
        app.enable('trust proxy')
        app.use(bodyParser.json({ limit: '16mb' }))
        app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }))
        app.use(helmet())
        app.use(cors())
        // call api
        app.use("/api", api)
        api.post('/persion', restapi.createPersion)

        httpServer = http.createServer(app)
        httpServer.listen(config.port, err => {
            console.log('Server is running:', config.port)
            if (err) {
                reject(err)
                return
            }
            resolve()
        })
        httpServer.setTimeout(config.sessionTimeout)
    })
}

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close(err => {
            if (err) {
                reject(err)
                return
            }
            resolve()
        })
    })
}

async function startup() {
    try {
        console.log("Initializing application")
        await initialize()
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

async function shutdown(err) {
    try {
        console.log("Closing application")
        await close()
    }
    catch (e) {
        console.error(e)
    }
    if (err) process.exit(1)
    else process.exit(0)
}
startup()
process.on("SIGTERM", () => {
    shutdown()
}).on("SIGINT", () => {
    shutdown()
}).on("unhandledRejection", (reason, promise) => {
    console.error("unhandledRejection at:", promise, "reason:", reason)
}).on("uncaughtException", err => {
    console.error(err)
    shutdown(err)
})
