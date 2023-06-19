const {Router} = require("express")
const generateProducts = require("../utils/mock.util")

const router = Router()

router.get("/", (req,res)=>{
  try{
    const prod = generateProducts(100)
    res.json({prodLength:prod.length ,productos: prod})
  }catch(error){
    console.log(error)
  }
})

module.exports = router