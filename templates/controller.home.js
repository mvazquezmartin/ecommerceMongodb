const {Router} = require ("express")
const ProductManager = require("../src/productManager")
const router = Router()

router.get("/", async(req, res)=>{  
  res.render('home.handlebars')
})

module.exports = router