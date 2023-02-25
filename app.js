const express = require('express');
const app = express();   // app 객체 만들어줌 
const port = 3000;

//라우터 등록
const goodsRouter = require('./routes/goods.js')
const cartsRouter = require('./routes/carts.js')


const connect = require('./schemas')
// 폴더까지만 지정해준 이유 : nodejs 에서 모듈을 가지고 올때 기본적으로 폴더 이름만 지정했을때도 index.js 파일을 인식함
connect() // connect 실행

app.use(express.json())
// 전역 미들웨어 (body-paser-middleware 를 쓰기 위한 구문)
// localhost:3000/api => goodsRouter
app.use("/api", [goodsRouter, cartsRouter])
// app.use("/api", [ goodsRouter, usersRouter ])  안에 라우터를 배열로도 넣을 수 있음

//  /api가 추가된 경로는 goodsRouter로 가라는 의미

app.post("/", (req, res) => {
    console.log(req.body)

    res.send("기본 uri에 POST 메소드가 정상적으로 실행되었습니다.")
})

app.get('/', (req, res) => {
    console.log(req.query)

    res.send('정상적으로 반환되었습니다.')
});

app.get('/:id', (req, res) => {
    console.log(req.params)

    res.send(":id URI에 정상적으로 반환되었습니다.")
})


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});

