$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    // 定义梅花时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数的对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initTable()
    initCate()
    // 获取文章列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                console.log(res);

                // 使用模板引擎渲染页面数据
                var htmlStr = template('tpl-artlist', res)
                $('tbody').html(htmlStr)
                // 调用渲染分页的方法
                renderPage(res.total)
            }


        })
    }
    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败！')
                }
                console.log(res);
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过layui 重新渲染表单区域的UI结构
                form.render()
            }


        })
    }

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象q中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新筛选条件重新渲染表格数据
        initTable()
    })

    // 定义玄反分页的方法
    function renderPage(total) {
        // 调用laypage.render()方法渲染分页结构
        laypage.render({
            elem: 'pagebox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total, //数据总数，从服务端得到
            limit: q.pagesize,//每页显示几条数据
            curr: q.pagenum,//设置默认被选中的分页

            // 分页发生切换的时候,触发jump回调
            // 触发jump回调的方式有两种：
            // 1.点击页码时触发
            // 2.只要调用了laypage.render方法就会触发jump回调
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 根据最新的q获取对应的数据列表
                if (!first) {
                    initTable()
                }
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10]
        })
    }

    // 通过代理的形式 为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        // 获取删除按钮的个数 
        var length = $('.btn-delete').length

        var id = $(this).attr('data-id')
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }

                    layer.msg('删除文章成功')
                    // 当数据删除完成后，需要判断当前这一页中 是否有剩余的数据
                    // 如果没有剩余的数据了，则让页码值减1，再重新调用initTable（）
                    if (length === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });

    })

    // 通过代理的形式 为编辑按钮绑定点击事件
    var indexedit = null
    $('tbody').on('click', '#btn_edit', function () {
        location.href = '/article/art_edit.html'
        var id = $(this).attr('data-id')
        console.log(id);

        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类失败！')
                }
                layer.msg('成功')
                console.log(res);

                form.val('form-pub', res.data)
            }
        })
    })
})