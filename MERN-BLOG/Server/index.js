const express = require('express');
const cors = require('cors');
const blogRouter = require('./route/blogRoute');

require('./db')

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api', (req, res)=>{
//     res.send('Hello World.!');
// })

app.use('/api/blogs', blogRouter);

app.listen(4000, ()=>{
    console.log('App is running in localhost: 4000');
})