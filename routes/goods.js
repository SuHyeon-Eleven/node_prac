// /routes/goods.js
const express = require("express");

const router = express.Router();

const Cart = require('../schemas/cart.js')
const Goods = require("../schemas/goods.js");
// goods 스키마를 가지고 와서 goods 변수에 할당 


router.post("/goods", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({ goodsId });
    if (goods.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }

    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

    res.json({ goods: createdGoods });
});

//상품 목록 조회 API
router.get("/goods", async (req, res) => {
    const goods =  await Goods.find({})
    res.status(200).json({ goods });
});

// 상품 상세 조회 API
router.get("/goods/:goodsId", (req, res) => {
    const { goodsId } = req.params

    // let result = null
    // for (const good of goods) {
    //     if (Number(goodsId) === good.goodsId) {
    //         result = good
    //     }
    // }

    const [result] = goods.filter((good) => Number(goodsId) === good.goodsId)

    res.status(200).json({ detail: result })
})

router.post("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params
    const { quantity } = req.body

    const existsCarts = await Cart.find({ goodsId })
    if (existsCarts.length) {
        return res.status(400).json({
            success: false,
            errorMessage: "이미 장바구니에 상품이 존재합니다."
        })
    }

    await Cart.create({ goodsId, quantity })

    res.json({ result: "success" })
})

router.put("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params
    const { quantity } = req.body

    const existsCarts = await Cart.find({ goodsId })
    if (existsCarts.length) {
        await Cart.updateOne(
            { goodsId: goodsId },
            { $set: { quantity: quantity } }
        )
    }
    res.status(200).json({ success: true })
})

router.delete('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params

    const existsCarts = await Cart.find({ goodsId })
    if (existsCarts.length) {
        await Cart.deleteOne({ goodsId })
    }

    res.json({ result: "success" })
})
module.exports = router