var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.get("/allItems",function(req,res){
    res.send([
                 {"barcode":"ITEM000000",
                  "name":"美国短毛猫",
                  "unit":"只",
                  "price":1000},
                 {"barcode":"ITEM000001",
                   "name":"孟买猫",
                   "unit":"只",
                   "price":2000},
                 {"barcode":"ITEM000002",
                   "name":"波斯猫",
                   "unit":"只",
                   "price":3000},
                 {"barcode":"ITEM000003",
                   "name":"流浪猫",
                   "unit":"只",
                   "price":150},
                 {"barcode":"ITEM000004",
                   "name":"伯曼猫",
                   "unit":"只",
                   "price":2500},
                 {"barcode":"ITEM000005",
                   "name":"欧西猫",
                   "unit":"只",
                   "price":450}
               ]);
});
app.get("/promotions",function(req,res){
    res.send([
              {
                "type": "BUY_TWO_GET_ONE_FREE",
                "barcodes": [
                            "ITEM000000",
                            "ITEM000001",
                            "ITEM000005"
                          ]
              }
            ]);
});

var server=app.listen(8080,function(){
    console.log("%s:%s",server.address().address,server.address().port);
});