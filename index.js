const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, console.log("サーバー"))

//お客さま情報をサーバーに置いておく
const customers = [
    {title: "tanaka" ,id:1},
    {title: "saito" ,id:2},
    {title: "nakajima" ,id:3},
    {title: "ito" ,id:4},
    {title: "andou" ,id:5},
];

app.get("/", (req, res) => {
    res.send("プログラミングチュートリアルへようこそ！");
});
  
app.get("/api/customers", (req, res) => {
    res.send(customers);
});
  
app.get("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) {
        res.status(404).send("<h2>Not Found</h2>");
    }
    res.send(customer);
});

//データを送信(作成)してみよう(「C」RUD)
app.post("/api/customers", (req, res) => {
    const customer = {
        id: customers.length + 1,
        title: req.body.title,
    };
    customers.push(customer);
    res.send(customers);
});

  //データを更新してみよう(C「U」RD)
 app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) {
        res.status(404).send("<h2>Not Found</h2>");
    }
    customer.title = req.body.title;
    res.send(customer);
});
  
  //データを削除してみよう(CUR「D」)
app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) {
        res.status(404).send("<h2>Not Found</h2>");
    }
  
    //最初に現れた配列のインデックスを返す
    const index = customers.indexOf(customer);
    customers.splice(index, 1); //指定した配列を1つだけ削除する。
    res.send(customer);
  });