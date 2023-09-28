const express = require('express')
const app = express()
const port = 3000

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({extended: false}));
app.use(bodyPs.json()); 

const ktprouter = require('./routes/ktp');
app.use('/api/ktp',ktprouter);

const kkrouter = require('./routes/kk');
app.use('/api/kk',kkrouter);

const dtkkrouter = require('./routes/dt_kk');
app.use('/api/dtkk',dtkkrouter);
app.listen(port,()=>{
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})