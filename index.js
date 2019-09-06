var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const BlogSchema = require('./src/models/crmModel');
const blogModel = mongoose.model('blog', BlogSchema);

const Cat = mongoose.model('cat', {name: String});
const kitty = new Cat({name: 'mimi'});
kitty.save().then((res) => {
    console.log(res);
    console.log('Meow');
})

// routes(app);
// app.use(function(req, res, next){
//     console.log('Time', Date.now());
// })

app.get('/', function(req, res, next){
    console.log('Req Method: ', req.method);
    next();
}, function(req, res, next){
    console.log('Request original URL ' + req.originalUrl);
    next();
}, function(req, res, next){
    res.send('Request was successful');
})

// create/post new blog
app.post('/newBlog', (req, res) => {
    let blog = new blogModel(req.body);
    blog.save((err, blogModel) => {
        if(err){
            res.send(err);
        }
        res.json(blog);
    })
})

// Get all blogs
let getAllBlogs = (req, res) => {
    blogModel.find({}, (err, blogs) => {
        if(err){
            res.send(err);
        }else{
            res.json(blogs);
        }
    })
}
app.get('/getBlogs', getAllBlogs);

let getBlogByID = (req, res) => {
    blogModel.findById((req.params.blogId), (err, blog) => {
        if(err){
            res.send(err);
        }
        res.json(blog);
    })
}
app.get('/blog/:blogId', getBlogByID);

// Create a Endpoint for update Data
let updateBlog = (req, res) => {
    blogModel.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true}, (err, updatedBlog) => {
        if(err){
            res.send(err);
        }
        res.json(updateBlog);
    })
}
app.put('/blog/:blogId', updateBlog);

// Create a Endpoint for delete Data
let deleteBlog = (req, res) => {
    blogModel.remove({_id: req.params.blogId}, (err, blog) => {
        if(err){
            res.send(err);
        }
        res.json({message: 'Blog Delete Successfully'});
    })
}
app.delete('/blog/:blogId', deleteBlog);

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server is running on PORT: ' + PORT);
})