




const express = require('express');
const app = express();

const path = require('path')

app.use(express.static(__dirname +'/dist/surveyjs-angular-cli'));


app.listen(process.env.PORT || 8080);


//PathLocationStrategy

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/surveyjs-angular-cli/index.html'))
})

console.log('Console Listening')


