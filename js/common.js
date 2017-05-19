$(function(){
  // 点击导航栏的登录时，弹窗出现
  $('.login_btn').on('click',function(){
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
  });
    // 点击导航栏的注册时，弹窗出现
  $('.register_btn').on('click',function(){
    $('.s_register').slideDown();
    $('.user_frame').hide();
    $('.register_frame').fadeIn();
    $('.click_rt').css({
      'color': '#665f62',
      'border-bottom': '3px solid #858585'
    });
    $('.click_log').css({
      'color':'#635c97',
      'border-bottom':'none'
    });
    $('.grey').show();
  })
   // 点击×时
  $('.close').on('click',function(){
    $('.s_register').fadeOut();
    $('.reset_pwd').slideUp(); 
    $('.grey').fadeOut();
    $('.quiz').fadeOut();
    $('.invite').fadeOut();
  })
  // 点击弹窗里面的登录
  $('.click_log').on('click',function(){
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
  })
  // 点击弹窗里面的注册
  $('.click_rt').on('click',function(){
    $('.user_frame').hide();
    $('.register_frame').fadeIn();
    $('.click_rt').css({
      'color': '#665f62',
      'border-bottom': '3px solid #858585'
    });
    $('.click_log').css({
      'color':'#635c97',
      'border-bottom':'none'
    });
  })


  //查询登录状态
  // $.ajax({
  //   url:'/user/status',
  //   data:{},
  //   dataType:'json',
  //   type:'GET',
  //   //回调函数
  //   success:function(data){
  //     if(data.status == '1')
  //     {
  //       $('.click_register').hide();
  //       $('.have-login').show();
  //       $('.per_name').html(data.username);
  //     }else {
  //       $('.click_register').show();
  //       $('.have-login').hide();
  //     }
  //   }
  // })

  // 头像预览
  function previewImage(file, prvid) {
    /* file：file控件
     * prvid: 图片预览容器
     */
    var file=document.getElementById(file);
    var tip = "请选择jpg或png的图片"; // 设定提示信息
    var filters = {
        "jpeg"  : "/9j/4",
        "gif"   : "R0lGOD",
        "png"   : "iVBORw"
    }    
    if (window.FileReader) { // html5方案
      for (var i=0, f; f = file.files[i]; i++) {
        var fr = new FileReader();
        fr.onload = function(e) {
          var src = e.target.result;
          if (!validateImg(src)) {
            alert(tip)
          } else {
            showPrvImg(src);
          }
        }
        fr.readAsDataURL(f);
      }
    } else { // 降级处理
      if ( !/\.jpg$|\.png$|\.gif$/i.test(file.value) ) {
        alert(tip);
      } else {
        showPrvImg(file.value);
      }
    }
   
    function validateImg(data) {
      var pos = data.indexOf(",") + 1;
      for (var e in filters) {
        if (data.indexOf(filters[e]) === pos) {
          return e;
        }
      }
      return null;
    }
   
    function showPrvImg(src) {
      var img=$('<img/>').appendTo($(prvid)).addClass('upload-image');
      $(img).attr('src',src);
    }
  }

  $('#photo').change(function(){
    previewImage('photo','.upload-img');
  }) 
  
  //点击注销用户时，退出登录并跳转至主页
  $('.logout').on('click',function(){
    // $.ajax({
    //   url:'/user/logout',
    //   data:{},
    //   dataType:'json',
    //   type:'GET',
    //   //回调函数
    //   success:function(data){
    //     if(data.status == 'success'){
    //       location.href='/index';
    //       $('.s_register').slideDown();
    //         $('.user_frame').fadeIn();
    //         $('.register_frame').hide();
    //         $('.click_log').css({
    //           'color': '#665f62',
    //           'border-bottom': '3px solid #858585'
    //         });
    //         $('.click_rt').css({
    //           'color':'#635c97',
    //           'border-bottom':'none'
    //         });
    //         $('.grey').show();
    //       return true;
    //     } else {
    //       alert("退出登录失败！");
    //       return false;
    //     }
    //   }
    // })
  })

  //验证表单
  //$(function(){

  // 判断输入框是否为空的函数
  function ifEmpty(clsName) {
    var username = $.trim($(clsName).val());
    if(username==""||username==null) {
      return false;
    }
    return true;
  } 
  // 判断昵称框格式是否正确的函数
  function validate_name(uName) {
    var name = $(uName).val();
    var pattern = new RegExp(/^[\w-]+$/);
    return pattern.test(name);
  }
  // 判断密码框格式是否正确的函数
  function validate_pw1(uPassword) {
    var pw = $(uPassword).val();
    var pattern = new RegExp(/\S{6,16}/);
    return pattern.test(pw);
  }
  function validate_pw2(uPassword) {
    var pw = $(uPassword).val();
    var pattern = new RegExp(/^\d{1,8}$/);
    return pattern.test(pw);
  }

  //按下enter键的时候，完成相关事件
  function getEnter(frame,btn){
    $(frame).on('keydown',function(event){
      var e=event||window.event|| arguments.callee.caller.arguments[0];
      var keycode=e.which||e.keyCode; 
      if(keycode==13){
        $(btn).click();
        e.preventDefault(); 
      }
    })
  }
  //当登录框按下enter时
  getEnter('.user_frame','#login');
  //当注册框按下enter时
  getEnter('.register_frame','#register');
    //当登录框按下enter时
    /*getEnter('.reset_frame','#resetPwd');*/

  //验证登录框的页面
  //点击登录框的登录按钮的时候验证账号和密码是否正确以及是否为空
  $('#login').click(function(){
  	var iText=ifEmpty('.username');
	  var iPwd=ifEmpty('.password');
      
    var username=$('.username').val();//昵称框内容
    var password=$('.password').val();//密码框内容
    var checkbox=$('input[name="keep"]:checked').val();//记住密码框内容
    if(iText){
      $('.user01').html('');
		  if(iPwd){
        $('.pwd01').html('');
          //ajax验证用户名是否存在，密码是否正确
          // $.ajax({
         	//   url:'/user/login',
         	//   data:{
         	//  	  'username': username,
         	//  	  'password': password,
         	//  	  /*'keep': checkbox,*/
         	//   },
         	//   dataType:'json',
         	//   type:'POST',
         	//   //回调函数
         	//   success:function(data){
         	//  	  if(data.status == '1') {
          //  	 		$('.click_register').hide();
          //       $('.have-login').fadeIn();
          //       $('.s_register').fadeOut();
          //       $('.grey').fadeOut();
          //       $('.per_name').html(username);
          //       return true;
         	//  	  } else {
     	 		 //       //这种情况理论上不会发生，因为之前全部验证过,只是为了防止后台有bug
          //       $('.user01').html(data.reason);
          //       return false;
       	 	//     }
         	//   }
          // })
      }else{
		    $('.pwd01').html('密码不能为空');
		    return false;
		  }
    }else{
		  $('.user01').html('昵称不能为空');
		  return false;
    }
  })


  //验证注册框的页面
  //验证头像、昵称、密码是否为空以及是否正确
  var error = new Array();
  error['photo'] = 0;
  error['username'] = 0;
  error['password'] = 0;
  error['repassword'] = 0;

  //验证头像大小
  $('#photo').blur(function(){
     
  })
  //验证昵称
  $('#username').blur(function() {
    var username = $('#username').val();
    if (username == "") {
        error['username'] = 1;
        $('#mess4').html("昵称不能为空!");
    } else if (username.length < 4 || username.length > 30) {
        error['username'] = 1;
        $('#mess4').html("昵称长度为4~30位！");
    } else {
        error['username'] = 0;
        $('#mess4').html("");
    }
    var isFormated=validate_name('#username');
    if(isFormated){
      error['username'] = 0;
    }else{
      error['username'] = 1;
      $('#mess4').html("昵称只能由字母、数字、'-'和'_'组成");
    }     
  })
  //验证密码
  $('#password').blur(function() {
    var password = $('#password').val();
    if (password == "") {
      error['password'] = 1;
      $('#mess2').html("密码不能为空!");
    }else {
      error['password'] = 0;
      $('#mess2').html("");
    }  
    var isFormated1=validate_pw1('#password');
    if(isFormated1){
      error['password'] = 0;
      $('#mess2').html("");
    }else{
      error['password'] = 1;
      $('#mess2').html("密码长度为6~16位且不能含有空格");
    } 
    var isFormated2=validate_pw2('#password');
      if(isFormated2){
        error['password'] = 1;
        $('#mess2').html("密码不能为9位纯数字");                
      }else{
        error['password'] = 0;
        $('#mess2').html("");
      }   
  })
  //验证重复密码
  $('#repassword').blur(function() {
      var password = $('#password').val();
      var repassword = $('#repassword').val();
      if (repassword == "") {
          error['repassword'] = 1;
          $('#mess22').html("确认密码不能为空!");
      } else if (repassword.length < 6 || repassword.length > 16) {
          error['repassword'] = 1;
          $('#mess22').html("密码长度为6~16位！");
      } else if (password != repassword) {
          error['repassword'] = 1;
          $('#mess22').html("两次密码不一致!");
      } else {
          error['repassword'] = 0;
          $('#mess22').html("");
      }
  })
  //提交注册按钮
  $('#submit1').on('click',function(){
    if (error['photo'] == 1) {
      return false;
    }else if(error['username'] == 1){
      return false;
    }else if (error['password'] == 1){
      return false;
    }else if (error['repassword'] == 1){
      return false;
    }else{
      //表示所有的数据都已通过验证
      var form=new FormData();//因为要提交图片信息，所以用这个比较容易提交图片信息
      form.append('file',$('#photo')[0].files[0]);//图片的信息
      var username = $('#username').val();
      var password = $('#password').val();
      var repassword = $('#repassword').val();
      
      console.log(form);
      //用ajax完成注册过程，插入数据并自动登录
      // $.ajax({
      //   url:'/user/register',
      //   data:{
      //     'username' : username,
      //     'password' : password,
      //     'repassword':repassword,
      //     'photo':form
      //   },
      //   dataType:'json',
      //   type:'POST',
      //   success:function(data){
      //     if(data.status == '1') {
      //       $('.click_register').hide();
      //       $('.have-login').fadeIn();
      //       $('.s_register').fadeOut();
      //       $('.grey').fadeOut();
      //       $('.per_name').html(username);
      //       return true;
      //     }else{
      //       alert(data.reason);
      //       return false;
      //     }
      //   }
      // });
    }
  })
})
    
