apiready = function () {
    var username = $api.getStorage('username');
    if (username) {
        $('#username').val(username);
    }
}

var username = $('#username');
var password = $('#password');

$('#register').click(function () {
    open('register');
});

function checkName() {
    var msg = "";
    var flag = true;
    if (username.val() == "") {
        msg = '用户名不能为空';
        flag = false;
    }
    $('#name_msg').text(msg);
    return flag;
}

function checkPswd() {
    var msg = "";
    var flag = true;
    if (password.val() == "") {
        msg = '密码不能为空';
        flag = false;
    }
    $('#pswd_msg').text(msg);
    return flag;
}

function login() {
    if (!checkName() || !checkPswd()) {
        return;
    }

    var fData = new FormData();
    fData.append('account', username.val());
    fData.append('password', password.val());

    $.ajax({
        method: 'POST',
        url: "http://212.64.25.177:8083/signIn",
        dataTpye: 'JSON',
        data: fData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (ret) {
            if (ret == 0) {
                $api.setStorage('username', username.val());
                return_index('login');
                api.sendEvent({
                    name: 'login'
                });
            } else if (ret == 1) {
                alert('参数为空');
            } else if (ret == 2) {
                alert('用户名不存在或密码错误');
            }
        },
        error: function (err) {
            alert('登录失败');
        }
    });
}