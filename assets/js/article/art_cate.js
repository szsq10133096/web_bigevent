$(function () {
    var layer = layui.layer
    var form  = layui.form
    // 获取文章分类列表
    initAriCatelist()
    function initAriCatelist() {
        $.ajax({
            mehtod: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败')
                }
                var htmlStr = template('tpl_artcate', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 为添加图书类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类'
            , content: $('#dialog-add').html(),
            area: ['500px', '250px']
        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        // console.log('ok');
        $.ajax({
            // method: 'POST',
            // url: '/my/article/addcates',
            // data: $(this).serialize(),
            method: 'POST',
            url: '/my/article/addcates',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initAriCatelist()
                layer.msg('新增文章分类成功')
                layer.close(indexAdd)
            }
        })
    })
    var indexedit = null
    // 编辑功能
    $('tbody').on('click', '#btn_edit', function () { 
        // console.log('11');
        indexedit = layer.open({
            type: 1,
            title: '修改文章分类'
            , content: $('#dialog-edit').html(),
            area: ['500px', '250px']
        })
        var id = $(this).attr('data-id')
        // console.log(id);
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类失败！')
                }
                console.log(res);
                
                form.val('form-edit',res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类失败！')
                }
                layer.msg('修改分类成功！')
                layer.close(indexedit)
                initAriCatelist()
            }
        })
    })

    // 通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // console.log(11);
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method:'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    initAriCatelist()
                }
            })
            
            
        })
    })
})