const config = require("config");
const { Router } = require("express");
const router = Router();
const cartItem=require("../models/cartItems");
router.get("/cartItems", async (req, res) => {
  try {
    let data= await cartItem.find();
    res.status(200).json({ message: data});
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Ошибка сервера, попробуйте позже" });
  }
});
router.post("/cartItems", async (req, res) => {
  try {
  console.log("da")
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Ошибка сервера, попробуйте позже" });
  }
});
router.post("/buy", async (req, res) => {
  try {
    await req.body.forEach((e)=>{
      let fun=async ()=>{
        let data=await cartItem.findOne({_id:e._id});
        if(data.count-e.count<0){
          console.log(data.count,e.count)
          res.status(426).json({message:"На складе нет указанного количества товаров, сделайте заказ снова"})
        }else {
          data.count=data.count-e.count;
          await data.save()
        }
      };
      fun()
    });

    res.status(200).json({message:"Успешно"})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Ошибка сервера, попробуйте позже" });
  }
});
router.get("/cartItem", async (req, res) => {
  try {
    console.log("da")
    let cart=new cartItem({id: 13, name: "potato", cost:120, count: 21})
    cart.save()
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Ошибка сервера, попробуйте позже" });
  }
});

module.exports = router;
