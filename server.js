const express = require("express"); // 서버를 만드는 express 모듈을 호출
const app = express(); // express 객체 ==> 서버 인스턴스를 app으로 생성
const cors = require("cors");
let port = 4000;
// 미들웨어 : 요청-미들웨어-서버에 위치
app.use(express.json()); // 요청 해석용
app.use(express.urlencoded({extended: false})); // json 해석용 (false)문자:기본, (true)배열, 객체 
app.use(cors());
// 샘플 회원 데이터 - 메모리 vs DB (나중에 구축)
const users = [
    {
        id: 1,
        nick: "관리자",
        userId: "admin",
        userPw: "admin1004",
        userEmail: "admin@test.com",
        createDate: "2023-01-01",
        ip: "19 2.168.11.0"
    },
    {
        id: 2,
        nick: "테스트",
        userId: "test",
        userPw: "test1004",
        userEmail: "test@test.com",
        createDate: "2023-02-02",
        ip: "192.168.11.1"
    }
]
app.get("/", (req, res) => {
    res.send("get 요청이 들어왔습니다.");
    console.log(req.params); 
    // :4000/?id=test&pw=test1234
});
app.post("/login", (req, res) => {
    const {id, pw} = req.body; //요청 id, pw
    for(const user of users) { // vs for(초깃값;조건식;증감식) {...}
        if(id === user.userId && pw === user.userPw) {
            return res.json({
                status: 200,
                statusText: 'success',
                nick: user.nick
            });
            break;
        } else {
            // 회원아니거나 회원인데, ID/PW등이 틀린!
            return res.json({
                status: 400,
                statusText: 'fail'
            });
            break;
        }
    }
});

app.listen(port, () => {
    console.log(`server is running on ${port}...`);
});