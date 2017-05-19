$(function(){	
	$('#column').on('click', function(){
		$(".catalog").toggle();//切换显示状态
	})

	
	/*$(".catalog li").each(function(index){
        var self = index;
        $(".catalog li").eq(index).on('click',function(){
            $.ajax({
                url:'/article?article_id='+ self,
                type:'GET',
                dataType:'json',
                success:function(data){
                    $('.articletitle').html(data.title);
                    $('.articletime').html(data.time);
                    $('.articlebody').html(data.passage);           
                    //评论
                    for(var i = 0; i < data.comment.length; i ++){
                        Comment(data.comment[i].name,data.comment[i].time,data.comment[i].image,data.comment[i].text);
                    }
              
                }
            })
        })*/

    var index = $(".catalog li").attr('name');
    //console.log(index);

    //我要评论
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
                    url:'/article/comment',
                    data:{
                        'article_id':index,
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
    })
})


