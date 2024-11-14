import express from "express";
import path from "path"
import multer from "multer";

const app = express()

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
})

const upload = multer({storage: storage})


app.use(express.json())

app.get("/",(req,res)=>{
    res.render("homepage")
})

app.use(express.urlencoded({extended: false}))

app.post("/upload", upload.single("profileImage") ,(req,res)=>{
    const body = req.body
    console.log(body)
    console.log(req.file)

    return res.redirect("/")
})

app.listen(7000,()=>{
    console.log("Server started at Port:7000")
})