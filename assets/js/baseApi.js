// 注意 每次调用$.get或者$.post或者$.ajax的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);

    // 统一为有权限的接口 设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }


        // 全局统一挂在 complete回调函数
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                
                
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    }
})