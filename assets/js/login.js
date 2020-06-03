$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 从layui中获取form对象
    var form = layui.form
    // 从layui中获取layer对象
    var layer = layui.layer
    // 通过form.verify自定义校验规则
    form.verify({
        // username: function(value, item){ //value：表单的值、item：表单的DOM对象
        //   if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        //     return '用户名不能有特殊字符';
        //   }
        //   if(/(^\_)|(\__)|(\_+$)/.test(value)){
        //     return '用户名首尾不能出现下划线\'_\'';
        //   }
        //   if(/^\d+\d+\d$/.test(value)){
        //     return '用户名不能全为数字';
        //   }
        // }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repass: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });  
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
            if(res.status !==0) return layer.msg('注册失败');;
            layer.msg('注册成功');
            // 模拟注册成功后自动点击去登录功能
            $('#link_login').click()
        })
    })

    // 监听登录表单的点击事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        var data = {username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()}
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) return layer.msg('登录失败');
            layer.msg('登录成功');
            // console.log(res.token);
            // 将登录成功后获得的token字符串保存到localstorage里（token用于一些需要权限的接口调用）
            localStorage.setItem('token',res.token)
            // 跳转后台主页
            location.href='/index.html'
        })
    })
})