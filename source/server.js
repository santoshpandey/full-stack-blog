import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
const __dirname = path.resolve();


const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/build')));


const articlesInfo = {
    'learn-react' : {
        upvotes:0,
        comments:[],
    },
    'learn-node':{
        upvotes:0,
        comments:[],
    },
    'my-thoughts-on-resumes':{
        upvotes:0,
        comments:[],
    }
}


app.get('/hello', (req, res)=> res.send('Hello'));
app.get('/article/:name', (req, res)=> res.send(`Hello ${req.params.name}`));
app.post('/api/articles/:name/upvote', (req, res)=>{
    const articleName = req.params.name;

    articlesInfo[articleName].upvotes +=1;
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes}`);

})

app.post('/api/articles/:name/add-comment', (req, res)=>{
    const articleName = req.params.name;
    const {username, comment} = req.body;

    articlesInfo[articleName].comments.push({username, comment})
    res.status(200).send(articlesInfo[articleName]);

})

app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(8000, ()=> console.log('Listning port at 8000'));
