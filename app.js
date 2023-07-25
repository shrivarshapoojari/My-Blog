//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://shrivarshapoojary8095:Shri8722@cluster1.6ekyuqr.mongodb.net/').then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
  console.log(e);
}); 


const homeStartingContent = "  \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Welcome to Express Blog, a digital haven where creativity, intellect, and passion collide.  This virtual space is a celebration of young minds seeking to make their mark on the world. Here, we embark on a journey of discovery, uncovering the depths of knowledge and the boundless potential within us. With every word, we aim to bridge the gap between the academic realm and real-life experiences, exploring the vast expanse of subjects that intrigue and inspire us. From sharing our insights and adventures to voicing our dreams and aspirations, this blog serves as a platform to amplify the voices of tomorrow's leaders. We invite you to dive into the vibrant tapestry of ideas woven by our community of curious minds, as we navigate the labyrinth of learning and growth. Join us in this immersive experience, where each blog post is a testament to the passion and commitment of the student spirit. Together, let's shape a brighter future, one word at a time."

const aboutContent = " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Welcome to Express Blog! I am Shrivarsha, a first-year Computer Science and Engineering student at RV College of Engineering (RVCE), and I am driven by an unwavering passion for web development. This digital sanctuary is an ode to my journey as a budding web developer, where I unravel the boundless possibilities of the online world. From exploring the latest front-end technologies to diving deep into back-end frameworks, I strive to share my insights, experiences, and discoveries on this platform.As a young enthusiast, I believe that the web is a canvas of endless creativity, waiting to be transformed into captivating user experiences. With each post, I aspire to showcase the art of crafting responsive and intuitive websites, while delving into the intricacies of coding and design. Alongside my academic pursuits, I embrace every opportunity to learn, experiment, and evolve in the rapidly evolving landscape of web development.";
const contactContent = " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Hello there! I'm thrilled that you want to get in touch. Whether you have a question, suggestion, or just want to say hello, feel free to reach out. Your feedback and engagement mean the world to me, and I promise to respond as soon as possible. Thank you for visiting Express blog and taking the time to connect with me. I look forward to hearing from you and engaging in meaningful conversations.";
 
const app = express();
let posts=[];


const postSchema=new mongoose.Schema({
  postName:String,
  postContent:String

});

const Post= mongoose.model("Post",postSchema);



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/",function(req,res){
  
  Post.find().then((foundlist)=>
  {
    res.render("home",
    {para1:homeStartingContent,
      posts:foundlist
    });
  }).catch((e)=>{
    console.log(e);
  })
 
 
 
});



app.get("/about",function(req,res){
  res.render("about",{para2:aboutContent});
  res.redirect("/about");
});



app.get("/contact",function(req,res){
  res.render("contact",{para3:contactContent});
  res.redirect("/contact");
});


app.get("/compose",function(req,res)
{
  res.render("compose");

})




app.get("/posts/:postId",function(req,res){


  const postid=req.params.postId.trim();
  console.log(postid);

  Post.findById({_id:postid}).then((found)=>{
    res.render("posts",{
            posttitle:found.postName,
           article:found.postContent
          })
  }).catch((e)=>{
    console.log(e);
  })
   
});


app.post("/compose",function(req,res){
 const post={
  title:req.body.articletitle,
  content:req.body.newarticle
 };
 const postd=new Post({
  postName:post.title,
  postContent:post.content

 })
 postd.save().then(()=>{
  res.redirect("/");
 }).catch((e)=>
 {
  console.log("Error While Saving")
 })

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});






















































