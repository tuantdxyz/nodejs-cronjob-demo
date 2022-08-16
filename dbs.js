'use strict'
const mysql = require('mysql2/promise')
const config = require('./config')
let poolConfig = config.poolConfig
const pool = mysql.createPool(poolConfig)
module.exports = pool