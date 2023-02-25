const mongoose = require("mongoose");

// 스키마 내용 정의 
const goodsSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    thumbnailUrl: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model("Goods", goodsSchema);
// 위에 작성한 goodsSchema를 몽구스의 Goods 라는 모델로 사용한다
// Goods 가 컬렉션 명

