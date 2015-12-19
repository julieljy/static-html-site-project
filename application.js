$(document).ready(function(){
    $('.add_to_cart').on('click',function(){
       var barcode=$(this).data('barcode');
       var inputs=JSON.parse(localStorage.getItem('inputs'));
       if(inputs==null){
           inputs=[];
       };
       inputs.push(barcode);
       localStorage.setItem('inputs',JSON.stringify(inputs));
    });

});