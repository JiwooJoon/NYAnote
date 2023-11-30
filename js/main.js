let http = require('http')
let fs = require('fs')
let path = require('path')
const multer = require('multer')
let express = require('express')
const cors = require('cors')

const app = express();
const db = require('./db')
const conn = db.init();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join()))


app.get('/', function(request, response) {
    let pageLink = path.join(__dirname, '..');
    fs.readdirSync(pageLink, function(error, filelist) {
        response.send(fs.readFileSync(pageLink + "/index.html"))
    })   
})

app.post('/', (req, res) => {
    
})



app.listen(app.get('port'), () => {

});