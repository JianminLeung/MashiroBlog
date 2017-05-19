$(function(){
    //最新评论(动态生成)
    function Comment(name,time,image,text){
      var section=$('<div>').addClass('c_ment').prependTo($('.com_all'));
      var info=$('<div>').addClass('info').appendTo(section);
      var left=$('<div>').addClass('left_img').appendTo(info);
      var img=$('<img/>').appendTo(left).addClass('com_image');
      $(img).attr('src',image);
      var right=$('<div>').addClass('right_name').appendTo(info);
      var name=$('<p>').appendTo(right).addClass('com_name').html(name);
      var time=$('<p>').appendTo(right).addClass('com_time').html(time);
      var text=$('<p>').appendTo(section).addClass('com_content').html(text);	
    }	
})