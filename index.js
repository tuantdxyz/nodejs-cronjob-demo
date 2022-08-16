"use strict"
const cron = require('node-cron')
const http = require("http")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const config = require("./config")
const dbs = require(`./dbs`)
const schedule = require(`./schedule`)

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
        app.use(helmet())
        app.use(cors())
        httpServer = http.createServer(app)
        httpServer.listen(config.port, err => {
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
