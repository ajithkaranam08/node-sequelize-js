import app from './api/app'
import db from './config/dbConfig'


db.sequelize.authenticate().then(()=>{
    app.listen(3000,()=>{
        console.log("server listening on port 3000")
    })
})




