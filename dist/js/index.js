var root = window.player;
var nowIndex = 0;
var dataList;
var len;
var audio = root.audioManger;
var timer;
function getData(url){
    $.ajax({
        type:'Get',
        url:url,
        success: function(data){
            console.log(data);
            dataList = data;
            len = data.length;
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            bindEvent();
        },
        error: function(err) {
            console.log('error');
        }
    })
}

function bindEvent(){
    $('body').on('play:change',function(e,index){
        audio.getAudio(dataList[index].audio);
       
        root.render(dataList[index]);
        if(audio.status == 'play'){
            audio.play();
            rotated(0);
        }
        $('.img-box').attr('data-deg',0);

        $('.img-box').css({
            'transform':'rotateZ('+ 0 +'deg)',
            'transition':'none'
        })
    })
    $('.prev').on('click',function(){
        // if(nowIndex == 0){
        //     nowIndex = len - 1;
        // }else{
        //     nowIndex --;
        // }
        var i = root.controlIndex.prev();
        $('body').trigger('play:change',i);
        // audio.getAudio(dataList[i].audio);
       
        // root.render(dataList[i]);
        // if(audio.status == 'play'){
        //     audio.play();
        // }
    })

    // $('.next').click(function(){
    //     console.log(123);
    // })

    $('.next').on('click', function(){
        // if(nowIndex == len - 1){
        //     nowIndex = 0;
        // }else{
        //     nowIndex ++;
        // }
       var i =  root.controlIndex.next();
       $('body').trigger('play:change',i);

        // audio.getAudio(dataList[i].audio);
        
        // root.render(dataList[i]);
        // if(audio.status == 'play'){
        //     audio.play();
        // }
    })

    $('.play').on('click',function(){
        // new audio();
        // clearInterval(timer);
      
        if(audio.status == 'pause'){
            audio.play();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
            // audio.status
        }else{
            audio.pause();
            clearInterval(timer);
        }
        $(this).toggleClass('playing');
    })
    var str = '';
    $('.list').on('click',function(){
        console.log(root.controlIndex.index)
        
    if(!str){
        dataList.forEach((item,index) => {
            str += '<div class="tab-item'+  (index == 0 ?' active' : '') +'" data-index='+ index +'>'+  item.song + '-' + item.singer  +'</div>'
        });
        $('.tab-list').html(str);
    }
       
        $('.tab-list').toggleClass('show');
        $('.tab-item').on('click', function(e){
            var i = $(this).data('index');
            $('.tab-item').removeClass('active');
            $(this).addClass('active');
            setTimeout(function(){
                $('.tab-list').removeClass('show');
                // $('.play').trigger('click')
                // audio.play()
            },200)
            $('body').trigger('play:change',i);
        })
          
    })
}


function rotated(deg){
    // var deg = 0;
    clearInterval(timer)
    timer = setInterval(function(){
        console.log(deg);
        deg = +deg;
        deg += 2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform':'rotateZ('+ deg +'deg)',
            'transition':'all 1s ease-out'
        })
    },1000)
}


getData('../mock/data.json');

// 信息+图片渲染到页面上
// /点击按钮
// 音频的播放与暂停  切歌
// 进度条的运动与拖拽
// 图片旋转
// 列表切歌