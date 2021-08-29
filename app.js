const express = require('express');

const app=express();

const Post=require('./api/models/post');
const postData=new Post();




const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});
const upload = multer({storage:storage});






//to make node known we r using json
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

app.post('/api/posts',upload.single("post-image"),(req,res)=>{
    console.log(req.body);
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    };
    console.log(req.file.path);
    postData.addNewPost(newPost);
    // console.log(req.body);
    res.status(201).send(newPost);
})



app.listen(3000,()=>{
    console.log('listning....');
})