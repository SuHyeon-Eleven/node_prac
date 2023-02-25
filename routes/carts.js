const express = require('express')
const router = express.Router()
const Cart = require('../schemas/cart.js')
const Goods = require('../schemas/goods.js')

router.get('/carts', async (req,res)=>{
    const carts = await Cart.find({})
    // [{goodsId, quantity},,,,]

    const goodIds = carts.map(cart => {
        return cart.goodsId
    })
    // 카트의 모든 goodId 찾아옴


    const goods = await Goods.find({goodId :goodIds})
    // Goods에 해당하는 모든 정보를 가지고 올건데 
    // 만약 goodsIds 변수 안에 존재하는 값일때만 조회

    const results = carts.map(cart => {
        return {
            quantity : cart.quantity,
            goods : goods.find((item) => item.goodId === cart.goodsId),
        }
    })

    res.status(200).json({ "carts" : results})

})



module.exports = router