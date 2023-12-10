const express = require('express')
const app = express()
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const User = require('./models/User')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(10)
const secret = 'asdfghyutigghopjkladjf'
const cookieParser = require('cookie-parser')
const multer = require('multer')
require('dotenv').config()
const uploadMiddleware = multer({dest:'uploads/'})
// to rename the file we will use
const fs = require('fs')
const Post = require('./models/Post')

app.use(cors({ credentials: true, origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname + '/uploads'))


async function main() {
    // console.log(`Couln't connect:`)
    const connectionOptions = {
        useNewUrlParser: true,
    };
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to mongodb')
    } catch (err) {
        console.log(`Couldn't connect: ${err}`)
    }
}
// SHY5kiLwFsoj7x9N
main();

app.post('/register', async(req,res)=>{
    console.log("yes i am in...")
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt)
        })
        res.json(userDoc)
    }catch(e){
        console.log(e)
        res.status(400).json(e)
    }
    
})

app.get('/',(req,res)=>{
    res.send("hii");
})
app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username})
    if (userDoc == null) res.status(400).json('wrong credentials');
    else{
        console.log(userDoc.password)
        const passOk = bcrypt.compareSync(password, userDoc.password);

        console.log(passOk)
        // userDoc.password === password
        if (passOk) {
            // loggedin
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username,
                })
            })
        }
        else {
            res.status(400).json('wrong credentials');
        }
}
})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    console.log("check",token)
    if (token === undefined){ res.json(null) }
    else if(token != '')
    {
        console.log("laksdjlkf")
            jwt.verify(token,secret,{},(err,info)=>{
                if(err) throw err;
                res.json(info)
            })
    }
    
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok')
})

app.post('/post', uploadMiddleware.single('file'),async (req,res) =>{
    const {originalname,path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath)

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async(err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author:info.id, 
        })

        res.json(postDoc)
    })

    
})

app.get('/post',async(req,res)=>{
    const posts = (await Post.find()
    .populate('author',['username'])
    .sort({createdAt:-1})
    .limit(20)
    );
    res.json(posts)
})

app.get('/post/:id',async(req,res)=>{
    const {id} = req.params
    const postDoc = await Post.findById(id).populate('author',['username'])
    res.json(postDoc)
})

app.put('/post', uploadMiddleware.single('file'),async (req,res)=>{
    let newPath = null
    if(req.file){
        const { originalname, path } = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
    }
    const {token} = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
        if(!isAuthor){
            return res.status(400).json('you are not the author')
            // throw "you are not the author"
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath?newPath:postDoc.cover,
        })
       

        res.json(postDoc)
    })
})


app.get("/deletePost/:id",async(req,res)=>{
    const {id} = req.params

    console.log("**",id);

    const { token } = req.cookies;
    console.log(token)
    // jwt.verify(token, secret, {}, async (err, info) => {

    //     console.log(info)
    // })
    const t = await Post.findById(id);
    console.log(t.author._id)
    console.log(t._id)
    console.log((t.author._id === t._id))
    // // console.log(t)
    try {
        
        
        console.log("deleted") 
        const P = await Post.deleteOne(
            {
                _id: id
            }
        )
        console.log("after deleted")
        res.status(200).json("success")
    
    } catch (error) {
        console.log(error);
       console.log("not deleted") 
       res.status(404).json("failure")
    }
})


app.get('/see/:id',async(req,res)=>{
    const { id } = req.params
    const allData = (await Post.find({
        author: id
    })
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20)
    );
    // console.log(allData)
    res.json(allData)
})
app.listen(4000)