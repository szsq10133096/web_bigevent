$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户名不能大于6位'
            }
        }
    })
    inituserInfo()
    // 初始化用户信息
    function inituserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化用户信息失败')
                }
                // $('[name=username]').val(res.data.username)
                form.val('formUserInfo', res.data)

            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        inituserInfo()
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交用户信息失败')
                }
                layer.msg('提交用户信息成功')

            }
        })
        window.parent.getuserInfo()
        
    })
})
