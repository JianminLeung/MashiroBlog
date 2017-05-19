$(function(){
    // var index = $(".album_catalog li").attr('name');
    //console.log(index);

    //相册评论
    $('.com_submit').on('click',function(){
        if($('.have-login').css('display')=='none'){
            $('.s_register').slideDown();
            $('.user_frame').fadeIn();
            $('.register_frame').hide();
            $('.click_log').css({
               'color': '#665f62',
               'border-bottom': '3px solid #858585'
            });
            $('.click_rt').css({
              'color':'#635c97',
              'border-bottom':'none'
            });
            $('.grey').show();
        }else {
            var text=$('.myIdea').val();
            if(text==''||text==null){
                $('.comment-tip').html('评论的内容不能为空');
                return false;
            }else{
                var time = new Date();
                var time = "" + time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate();
                //把数据提交给后台
                // $.ajax({
                //     url:'/album/comment',
                //     data:{
                //         'album_id':index,
                //         'content':text
                //     },
                //     dataType:'json',
                //     type:'POST',
                //     success:function(data){
                //         if(data.status == '1'){
                //             $('.comment-tip').html('评论发表成功');
                //             // 将评论的内容插到最新评论中
                //             Comment(name,time,image,text);
                //         }else{
                //             $('.comment-tip').html(data.reason);
                //         }                       
                //     }
                // })
            }
        }    
    });

    //动态生成相册图片
    function section(img){
        for (var i = 0; i < 16; i++) {
            var li01 = $('<li>').appendTo($('.gallery'));
            var bigphoto = $('<a>').appendTo(li01);
            $(bigphoto).attr('href',img);
            var photo=$('<img/>').appendTo(bigphoto);
            $(photo).attr('src',img);
        }
    }

    // 是否具备加载数据块的能力
    // function checkScrollSlide(){
    //     var lastPic=$('.gallery li').last();
    //     var lastPicDis=lastPic.offset().top+Math.floor(lastPic.outerHeight()/2);
    //     var scrollTop=$(window).scrollTop();
    //     var documentH=$(window).height();
    //     return (lastPicDis<(scrollTop+documentH))?true:false;
    // }

    // function checkScrollSlide(){
    //     var scrollHeight=$('.image-row')[0].scrollHeight;
    //     console.log(scrollHeight);
    //     var lastPic=$('.image-row li').last();
    //     var lastPicDis=lastPic.offset().top+Math.floor(lastPic.outerHeight()/2);
    //     console.log(lastPicDis);
    //     var scrollTop=$('.image-row')[0].scrollTop;
    //     var documentH=$('.image-row').height();
    //     console.log(scrollTop);
    //     console.log(documentH);
    //     return (scrollHeight-lastPicDis<=(scrollTop+documentH))?true:false;

    // }
     function checkScrollSlide(){
      var lastPic=$('.image-row li').last();
      var lastPicDis=lastPic.position().top+Math.floor(lastPic.outerHeight()/2);
      console.log(lastPic.index());
      var scrollTop=$('.image-row').scrollTop();
      var documentH=$('.image-row').height();
      // console.log('scrollTop'+scrollTop);
      // console.log('documentH'+documentH);
      // console.log('lastPicDis'+lastPicDis);
      return (lastPicDis<(documentH))?true:false;
    }
    //加载数据
    var page = 0;
    $('.image-row').on('scroll',function(){
        // console.log(checkScrollSlide());
        console.log(checkScrollSlide());
        if(checkScrollSlide()){
           waterfall();
           page++;
           console.log(page);
        }
    })
    

    //相册加载更多    
    function waterfall(){
        // $.ajax({
        //     url:'/album/more?album_id='+index+'&page='+page,
        //     dataType:'json',
        //     type:'GET',
        //     data:{
        //         'album_id':index,
        //         'page':page
        //     },
        //     //回调函数
        //     success:function(data){
        //       //对每一个数据进行遍历
        //         $.each(data,function(index,value){
        //             //调用section函数在页面生成内容
        //             section(data[index].url);        
        //         })
        //     }
        // })
    }
})
