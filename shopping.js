$(document).ready(function(){
    var inputs=JSON.parse(localStorage.getItem('inputs'));
    var all_items=loadAllItems();
    var promotions=loadPromotions();
    var items_buy=get_items_buy(inputs,all_items);
    var items_buy_count=get_items_buy_count(items_buy);
    var items_free=get_items_free(items_buy_count,loadPromotions());
    var items_buy_count_total=get_items_buy_count_total(items_buy_count,items_free);
    var all_total=get_all_total(items_buy_count_total,items_free);
    var result=get_result(items_buy_count_total,items_free,all_total);
//    var print_result=print(result);
    print(result);
//    var template_string = $("#1").text();
//    var compiled = _.template(template_string);
//    $('.order').append($(compiled({'result':result.items_list})));

});
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '美国短毛猫',
            unit: '只',
            price: 1000.00
        },
        {
            barcode: 'ITEM000001',
            name: '孟买猫',
            unit: '只',
            price: 2000.00
        },
        {
            barcode: 'ITEM000002',
            name: '波斯猫',
            unit: '只',
            price: 3000
        },
        {
            barcode: 'ITEM000003',
            name: '流浪猫',
            unit: '只',
            price: 150.00
        },
        {
            barcode: 'ITEM000004',
            name: '伯曼猫',
            unit: '只',
            price: 2500.00
        },
        {
            barcode: 'ITEM000005',
            name: '欧西猫',
            unit: '只',
            price: 450.00
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
//function1
function get_weight(a,items_buy,inputs){
    var need_weight=[];
    need_weight=inputs[a].split('-');
    for(var k=0;k<all_items.length;k++){
        if(need_weight[0]==all_items[k].barcode){
            for(var l=0;l<parseInt(need_weight[1]);l++){
                items_buy.push(all_items[k]);
            }
        }
    }
}
//function2
function get_items_buy(inputs,all_items){
    var items_buy=[];
    var check;
    for(var i=0;i<inputs.length;i++){
        check=0;
        for(var j=0;j<all_items.length;j++){
            if(inputs[i]==all_items[j].barcode){
               items_buy.push(all_items[j]);
               check=1;
            }
        }
        if(check==0){
            get_weight(i,items_buy,inputs);
        }
    }
    return items_buy;
}
//function 3
function items_count(a,items_buy_count,items_buy){
    check=0;
    for(var j=0;j<items_buy_count.length;j++){
        if(items_buy[a].barcode==items_buy_count[j].barcode){
           items_buy_count[j].count++;
           check=1;
        }
    }
    if(check==0){
        items_buy_count.push({barcode:items_buy[a].barcode,
                              name:items_buy[a].name,
                              count:1,
                              unit:items_buy[a].unit,
                              price:items_buy[a].price});
    }
}

//function 4
function get_items_buy_count(items_buy){
    //items_buy=get_items_buy();
    var items_buy_count=[];
    var check;
    items_buy_count.push({barcode:items_buy[0].barcode,
                        name:items_buy[0].name,
                        count:1,
                        unit:items_buy[0].unit,
                        price:items_buy[0].price});
    for(var i=1;i<items_buy.length;i++){
        items_count(i,items_buy_count,items_buy);
    }
    return items_buy_count;
}
//function 5
function get_items_free(items_buy_count,promotions){
    //items_buy_count=get_items_buy_count();
    var items_free=[];
    for(var i=0;i<items_buy_count.length;i++){
        for(var j=0;j<promotions[0].barcodes.length;j++){
            if(items_buy_count[i].barcode==promotions[0].barcodes[j]){
                if(items_buy_count[i].count>=3){
                    items_free.push({name:items_buy_count[i].name,
                                   count:(items_buy_count[i].count-items_buy_count[i].count%3)/3,
                                   unit:items_buy_count[i].unit,
                                   price:items_buy_count[i].price});
                }
            }
        }
    }
    return items_free;
}
//function 6
function items_free_total(a,items_buy_count_total,items_buy_count,items_free){
    check=0;
    items_buy_count_total[a]=items_buy_count[a];
    for(var j=0;j<items_free.length;j++){
        if(items_buy_count[a].name==items_free[j].name){
            items_buy_count_total[a].total=(items_buy_count[a].count-items_free[j].count)*items_buy_count[a].price;
            check=1;
        }
    }
    if(check==0){
        items_buy_count_total[a].total=items_buy_count[a].count*items_buy_count[a].price;
    }

}
//function 7
function get_items_buy_count_total(items_buy_count,items_free){
    //items_buy_count=get_items_buy_count();
    var items_buy_count_total=[];
    var check;
    for(var i=0;i<items_buy_count.length;i++){
        items_free_total(i,items_buy_count_total,items_buy_count,items_free);
    }
    return items_buy_count_total;
}
//function 8
function get_all_total(items_buy_count_total,items_free){
    var all_total=[];
    all_total[0]={all:0,save:0};
    for(var i=0;i<items_buy_count_total.length;i++){
        all_total[0].all+=items_buy_count_total[i].total;
    }
    for(var j=0;j<items_free.length;j++){
        all_total[0].save+=items_free[j].count*items_free[j].price;
    }
    return all_total;
}
//function 9
function get_result(items_buy_count_total,items_free,all_total){
    var result={items_list:items_buy_count_total,
            gift:items_free,
            account:all_total};
    return result;
}
//function 10

function print(result){
/*
    print_result='<table class="table"><tr><th>名称</th><th>数量</th><th>单位</th><th>单价</th><th>小计</th></tr>'
    for(var i=0;i<result.items_list.length;i++){
        print_result+='<tr><td>'+result.items_list[i].name+'</td><td>'+result.items_list[i].count+'</td><td>'+
                      result.items_list[i].unit+'</td><td>'+result.items_list[i].price.toFixed(2)+'(元)</td><td>'+
                      result.items_list[i].total.toFixed(2)+'(元)</td></tr>';
    }
    print_result+='</table><h3>优惠</h3><table class="table"><tr><th>名称</th><th>数量</th><th>单位</th></tr>';
    for(var j=0;j<result.gift.length;j++){
        print_result+='<tr><td>'+result.gift[j].name+'</td><td>'+result.gift[j].count+'</td><td>'+result.gift[j].unit+'</td></tr>';
    }
    print_result+='</table><h3>合计</h3><table class="table"><tr><th>总计</th><th>节省</th></tr><tr><td>'+result.account[0].all.toFixed(2)
    +'(元)</td><td>'+result.account[0].save.toFixed(2)+'(元)</td></tr></table>'
    return print_result;
    */
    var template_string = $("#1").text();
    var compiled = _.template(template_string);
    $('.order').append(compiled({'items_list':result.items_list,
                                   'gift':result.gift,
                                   'account':result.account}));
}
