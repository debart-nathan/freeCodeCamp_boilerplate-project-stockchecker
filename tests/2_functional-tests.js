const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

/*
Viewing one stock: GET request to /api/stock-prices/
Viewing one stock and liking it: GET request to /api/stock-prices/
Viewing the same stock and liking it again: GET request to /api/stock-prices/
Viewing two stocks: GET request to /api/stock-prices/
Viewing two stocks and liking them: GET request to /api/stock-prices/
*/

suite('Functional Tests', function () {
    test("Viewing one stock: GET request to /api/stock-prices/", function (done) {
        chai.request(server)
            .get("/api/stock-prices/")
            .set("content-type", "application/json")
            .query({ stock: "GOOG" })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, "GOOG");
                assert.exists(res.body.stockData.price, "GOOG has a price");
                done();
            });
    });

    test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done){
        chai.request(server)
            .get("/api/stock-prices/")
            .set("content-type", "application/json")
            .query({ stock: "GOOG", like: "true" })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, "GOOG");
                assert.equal(res.body.stockData.likes,2);
                assert.exists(res.body.stockData.price, "GOOG has a price");
                done();
            });
    });

    test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done){
        chai.request(server)
            .get("/api/stock-prices/")
            .set("content-type", "application/json")
            .query({ stock: "GOOG", like: "true" })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, "GOOG");
                assert.equal(res.body.stockData.likes,2);
                assert.exists(res.body.stockData.price, "GOOG has a price");
                done();
            });
    });

    test("Viewing two stocks: GET request to /api/stock-prices/", function (done){
        chai.request(server)
            .get("/api/stock-prices/")
            .set("content-type", "application/json")
            .query({ stock: ["GOOG","AAPL"] })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData[0].stock, "GOOG");
                assert.equal(res.body.stockData[1].stock, "AAPL");
                assert.exists(res.body.stockData[0].price, "GOOG has a price");
                assert.exists(res.body.stockData[1].price, "AAPL has a price");
                done();
            });
    });
    
    test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function (done){
        chai.request(server)
            .get("/api/stock-prices/")
            .set("content-type", "application/json")
            .query({ stock: ["GOOG","AAPL"], like: "true" })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData[0].stock, "GOOG");
                assert.equal(res.body.stockData[1].stock, "AAPL");
                assert.exists(res.body.stockData[0].price, "GOOG has a price");
                assert.exists(res.body.stockData[1].price, "AAPL has a price");
                assert.exists(res.body.stockData[0].rel_likes, "GOOG has rel_likes");
                assert.exists(res.body.stockData[1].rel_likes, "AAPL has rel_likes");
                done();
            });
    });
});
