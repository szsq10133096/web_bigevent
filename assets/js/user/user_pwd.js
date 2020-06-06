$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd:function(value) {
            if(value === $('[name=oldPwd]').val()) {
                return '新密码不能喝旧密码一样'
            }
        },
        rePwd:function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码不一样'
            }
        }
    })
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg('重置密码失败')
                }
                layer.msg('重置密码成功')
                console.log(res);
                
                 $('.layui-form')[0].reset()
            }
        })
    })
})