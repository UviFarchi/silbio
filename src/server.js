const express = require('express');
const app = express();
const port = 3000;
let forms = require('../config/forms.json')

app.use(express.static('public'))


app.get('/formopts', (req, res) => {
   res.send(forms);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})