function add(a, b) {
    return a + b
}

// 모듈을 호출했을 때, add 키의 값에는 add  함수가 들어가는 방법
// exports.add = function (a, b) {
//     return a + b
// }


// 모듈을 호출했을 때, add키의 값에는 add 함수가 들어가는 방법
// module.exports = { add: add }

// 모듈 그 자체를 바로 add 함수를 할당 
// module.exports = add
