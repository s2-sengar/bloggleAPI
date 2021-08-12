const path='./data.json'
const fs=require('fs');

class Post{
    getPosts(){
        return this.readData();
    }
    getIndividualPost(id){
        let posts=this.readData();
        let postFound=posts.find((post)=>post.id==id);
        return postFound;
    }
    addNewPost(data){
        let oldData=this.readData();
        oldData.unshift(data);
        this.storeData(oldData);
    }
    readData(){
        let rawData=fs.readFileSync(path);
        let posts=JSON.parse(rawData);
        return posts;
        // console.log(fs.readFileSync(path));
    }
    storeData(rawData){
        let data=JSON.stringify(rawData);
        fs.writeFileSync(path,data);
    }

}

module.exports=Post;