$(function () {
    getuserInfo();
    $('#btnloginout').on('click', function () {
        // 提示用户是否确认退出
        var layer = layui.layer
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清空本地存储的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'
            // 关闭confirm确认框
            layer.close(index);
          });
        
    })
})
// 声明一个获取用户基本信息函数
function getuserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res);
            
            // 调用renderAvatar函数 渲染用户头像
            renderAvatar(res.data)
           
            
        },
        // 无论成功还是失败 都会执行complete回调函数
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                
                
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
            
        // }
    })
}

// renderAvatar函数 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 2 设置欢迎的文本
    $('#weicome_msg').html('欢迎&nbsp;&nbsp;' + name)
    // 3 按需渲染头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}