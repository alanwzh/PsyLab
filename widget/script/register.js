var username = $('#username');
var password = $('#password');
var mail = $('#mail');
var vcode = $('#vcode');
var formData= new FormData();

function getVCode() {
    var fData = formData;
    fData.set('mail', mail.val());

    $.ajax({
        type: 'POST',
        url: "http://212.64.25.177:8083/sendMail",
        data: fData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: 'JSON',
        cache: false,
        processData: false,
        contentType: false,
        success: function (ret) {
            if (ret == 0) {
                api.toast({
                    msg: '邮件发送成功！',
                    duration: 3000,
                    location: 'middle'
                });
            }
            if (ret == 1) {
                alert('参数不合法');
            } else if (ret == 2) {
                alert('邮件发送失败');
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

function register() {
    if (!check()) return;
    var fData = formData;
    fData.set('username', username.val());
    fData.set('password', password.val());
    fData.set('mail', mail.val());
    fData.set('verifyCode', vcode.val());

    $.ajax({
        type: 'POST',
        url: "http://212.64.25.177:8083/signUp",
        data: fData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: 'JSON',
        cache: false,
        processData: false,
        contentType: false,
        success: function (ret) {
            if (ret == 0) {
                api.toast({
                    msg: '注册成功！',
                    duration: 3000,
                    location: 'middle'
                });
                api.closeFrame({
                    name: 'register'
                });
            }
            if (ret == 1) {
                alert('验证码错误');
            } else if (ret == 2) {
                alert('参数不合法');
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

function checkMail() {
    var msg;
    var reg = /^.*@.*\..*$/; //电子邮件地址为xxx@xxx.xxx
    var flag = true;
    if (!reg.test(mail.val())) {
        msg = '请输入合法的邮箱地址！';
        flag = false;
    }

    $('#mail_msg').text(msg);
    return flag;
}

function checkPswd() {
    var msg;
    var reg = /^[A-Za-z0-9]+$/; //密码只能包含数字与字母
    var flag = true;
    if (password.val().length < 8 || password.val().length > 20) {
        msg = '密码长度应>=8且<=20';
        flag = false;
    } else if (!reg.test(password.val())) {
        msg = '密码只能包含数字与字母！';
        flag = false;
    }
    $('#pswd_msg').text(msg);
    return flag;
}

function checkName() {
    var msg = "";
    var reg = /^[\w0-9\u4e00-\u9fa5]+$/; //用户名只能包含英文字母、汉字、数字与下划线
    var flag = true;
    if (username.val().length == 0) {
        msg = '用户名不能为空';
        flag = false;
    } else if (!reg.test(username.val())) {
        msg = '用户名只能包含英文字母、汉字、数字与下划线！';
        flag = false;
    }
    $('#name_msg').text(msg);
    return flag;
}

function check() {
    var ok = true;

    if (!checkName()) {
        ok = false;
    }
    if (!checkPswd()) {
        ok = false;
    }
    if (!checkMail()) {
        ok = false;
    }

    return ok;
}