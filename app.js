const express = require('express');
const app=express();
const Post=require('./api/models/post');

const postData=new Post();

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*"); 
    next();
});

app.use('/uploads',express.static('uploads'));

app.get('/api/posts',(req,res)=>{
    res.status(200).send(postData.getPosts());
});

app.get('/api/posts/:postId',(req,res)=>{
    const postId=req.params.postId;
    const post=postData.getIndividualPost(postId);
    if(post){
        res.status(200).send(post);
    }else{
        res.status(404).send('Not Found');
    }
});

app.post('/api/posts',(req,res)=>{
    console.log(req.body);
    res.send('Ok');
})



app.listen(3000,()=>{
    console.log('listning....');
})