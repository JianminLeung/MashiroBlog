$(function(){
    //我要留言
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
                $.ajax({
                    url:'/msgboard/msg',
                    data:{
                        'content':text
                    },
                    dataType:'json',
                    type:'POST',
                    success:function(data){
                        if(data.status == '1'){
                            $('.comment-tip').html('评论发表成功');
                            // 将评论的内容插到最新评论中
                            Comment(name,time,image,text);
                        }else{
                            $('.comment-tip').html(data.reason);
                        }                       
                    }
                })
            }
        }
    });

    // 是否具备加载数据块的能力
    function checkScrollSlide(){
        var scrollHeight=$('.com_all').scrollHeight();
        // var lastPic=$('.c_ment').last();
        // var lastPicDis=lastPic.offset().top+Math.floor(lastPic.outerHeight()/2);
        var scrollTop=$('.com_all').scrollTop();
        var documentH=$('.com_all').height();
        return (scrollHeight<=(scrollTop+documentH))?true:false;
    }

    //加载数据
    var page = 0;
    $('.com_all').on('scroll',function(){
        if(checkScrollSlide){
           waterfall();
           console.log(1);
           page++;
        }
    })
    

    //留言加载更多    
    function waterfall(){
        $.ajax({
            url:'/msgboard/msg?page='+page,
            dataType:'json',
            type:'GET',
            data:{
                'page':page
            },
            //回调函数
            success:function(data){
              //对每一个数据进行遍历
                $.each(data,function(index,value){
                    Comment(data[index].name,data[index].time,data[index].image,data[index].text);                        
                })
            }
        })
    }
})
