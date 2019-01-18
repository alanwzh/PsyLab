//检查是否已经登录,没有登录的话跳转到登录页面
function checkLogin() {
    //var username;
    var username = $api.getStorage('username');
    if (username == null) {
        api.openFrame({
            name: 'login',
            url: './html/login.html',
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            bounces: false,
        });
    }
    $.ajax({ //取最近一次的登录名，如果未登录，跳转到 login登录
        type: 'POST',
        url: "http://212.64.25.177:8083/checkSession",
        success: function (ret) {
            if (ret == 1) {
                api.openFrame({
                    name: 'login',
                    url: './html/login.html',
                    rect: {
                        x: 0,
                        y: 0,
                        w: api.winWidth,
                        h: 'auto'
                    },
                    bounces: false,
                });
            }
        },
        error: function (err) {
            api.toast({
                msg: '检测失败，请确定您已登录',
                duration: 3000,
                location: 'middle'
            });
        }
    });
}

//返回index/frame0，并关闭之前所在的页面page_name
function return_index(page_name) {
    api.openFrame({
        name: 'index',
        url: '../index.html',
        rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: 'auto'
        },
        bounces: false,
        reload: true,
    });
    api.closeFrame({
        name: page_name
    });
}

function open(page_name) {
    api.openFrame({
        name: page_name,
        url: './' + page_name + '.html',
        rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: 'auto'
        },
        bounces: false,
        reload: true,
        progress: {
            type: 'page',
            color: '#00f'
        },
        overScrollMode: 'scrolls',
        animation: {
            type: "movein",
            subType: "from_right",
            duration: 200
        }
    });
}