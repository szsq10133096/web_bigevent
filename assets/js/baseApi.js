// 注意 每次调用$.get或者$.post或者$.ajax的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
})