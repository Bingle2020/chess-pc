window.onload = function () {
    var canvas = document.getElementById('canvas');

    var context = canvas.getContext('2d');

    context.strokeStyle = '#000000';

    //canvas宽,高
    var cw = canvas.width - 40;
    var ch = canvas.height - 40;
    var ci = cw / 14;

    var x = 20,
        y = 20;
    for (var i = 0; i < 15; i++) {
        //横向
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + cw, y);
        context.stroke();
        context.closePath();
        y += ci;
    }
    var x1 = 20,
        y1 = 20;
    for (var j = 0; j < 15; j++) {
        //纵向
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1, y1 + ch);
        context.stroke();
        context.closePath();
        x1 += ci;
    }

    //标上文字
    var wd = 'ABCDEFGHIJKLMNO';
    var x0 = 20,y0 = 20;
    for (var k = 0; k < wd.length; k++) {
        context.beginPath();
        context.font = '12px';
        context.textAlign = 'center';
        context.fillText(wd.slice(k,k+1),x0,10);
        context.closePath();
        x0 += ci;
    }
    for(var l = 1;l <= 15;l++ ){
        context.beginPath();
        context.font = '12px';
        context.textAlign = 'center';
        context.fillText(l,5,y0 + 6);
        context.closePath();
        y0 += ci;
    }

    //创建隐形小盒子
    var $frag = $(document.createDocumentFragment());
    for(var n = 0;n < 225;n++){
        var $div = $('<div></div>');
        $div.addClass('small');
        $div.attr('name',n);
        $frag.append($div);
    }
    $('.layer').append($frag);

    //拖拽黑子触发事件
    var belem = null;
    $('.bchess').on('dragstart',function(){
        belem = $(this);
    })
    //松开黑子事件
    $('.bchess').on('dragend',function(){
        belem = null;
        $('.layer>div')[0].ondrop = null;
    })

    //拖拽白子触发事件
    var welem = null;
    $('.wchess').on('dragstart',function(){
        welem = $(this);
    })
    //松开白子事件
    $('.wchess').on('dragend',function(){
        welem = null;
        $('.layer>div')[0].ondrop = null;
    })

    //在小格子里移动事件
    $('.layer>div').on('dragover',function(e){
        e.preventDefault();
    })

    //进入小格子松开事件
    var w_b = null;
    $('.layer>div').on('drop',function(){
        var arr = [belem,welem];
        for(var p = 0;p < arr.length;p++){
            if(arr[p] !== null){
                // if(w_b == null){
                //     var chessClone = arr[p].clone();
                //     chessClone.attr('draggable','false');
                //     chessClone.appendTo($(this));
                //     w_b = arr[p].attr('class');
                // }
                // else{
                //     if(w_b !== arr[p].attr('class')){
                //         var chessClone = arr[p].clone();
                //         chessClone.attr('draggable','false');
                //         chessClone.appendTo($(this));
                //         w_b = arr[p].attr('class');
                //     }
                // }               
                var chessClone = arr[p].clone();
                chessClone.attr('draggable','false');
                if(w_b == null || w_b !== arr[p].attr('class')){
                    chessClone.appendTo($(this));
                    w_b = arr[p].attr('class');
                }                         
            }
        }
        
    })

    // if($(this).clone() == clone){
    //     $(this).attr('draggable','false');
    //     $('.wchess').attr('draggable','true');
    // }

}