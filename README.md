# nodejs-cronjob-demo
* scan DB1 with status=0 ==> call api insert to DB2 ==> update status=1 in DB1
* Change url api post, database connection, time run job (scheduleinterval = 30s) in [config.js](config.js)
![image](https://user-images.githubusercontent.com/74556484/184950046-1637c2ac-89f4-454f-94ac-58a0998d0c55.png)

* Change sql, limit record = 1000, param, token, host in [schedule.js](schedule.js)
![image](https://user-images.githubusercontent.com/74556484/184952950-ee3a187d-d265-447c-9270-deed906fdd67.png)

# run cronjob & restapi
* npm install
* node index.js or: pm2 start, pm2 stop, pm2 log...

 # evidence
  
  ![image](https://user-images.githubusercontent.com/74556484/184950640-0239e428-92c2-4b2b-8587-f0b19115581c.png)

  ![image](https://user-images.githubusercontent.com/74556484/184950661-8e9cc058-bf61-42b0-98c4-f62cb7c4d1d9.png)

  ![image](https://user-images.githubusercontent.com/74556484/184950704-162c35ff-3a33-4b2f-bf84-b77397460aac.png)

  ![image](https://user-images.githubusercontent.com/74556484/184951202-9cc4e1b9-13b7-4843-a865-791b022ef761.png)

  
