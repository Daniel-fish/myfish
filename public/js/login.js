/**
 * Created by SYT on 2016-07-31.
 */
var Box = document.getElementById("Box");
var loginBox = document.getElementById("loginBox");
var zhuceBox = document.getElementById("zhuceBox");
function login() {
    Box.style.visibility = "visible";
    loginBox.style.visibility = "visible"
    console.log("456")
}
function switchLogin() {
    Box.style.visibility = "visible";
    zhuceBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible"
}
function switchZhuce() {
    Box.style.visibility = "visible";
    loginBox.style.visibility = "hidden";
    zhuceBox.style.visibility = "visible"
}
function zhuce() {
    Box.style.visibility = "visible";
    zhuceBox.style.visibility = "visible"
}
function close1() {
    console.log("123")
    Box.style.visibility = "hidden";
    loginBox.style.visibility = "hidden";
    zhuceBox.style.visibility = "hidden"
}


$(function () {
    $('#loginBtn').click(function () {
        // var layer = layui.layer;
        let user = $('#loginUser').val();
        let pwd = $('#loginPwd').val();
        if (user.trim().length == 0) {
            layer.msg('用户名不能为空')
        } else if (pwd.trim().length == 0) {
            layer.msg('密码不能为空')
        } else {
            //加载loading
            var index = myloading()

            //发送请求到服务器
            $.ajax({
                type: "post",
                url: "/userLogin",
                data: "user=" + user + "&pwd=" + pwd,
                success: function (data) {
                    layer.close(index);
                    layer.alert(data.message);
                    if (data.code == 200) {
                        location.reload();//刷新页面

                    }
                }
            });
        }
    });
    $('#zhuceBtn').click(function () {
        var obj = {
            'Email': '邮箱', 'zhuceUser': '用户名', 'zhucePwd': '密码不能为空',
            'resPwd': '确认密码不能为空'
        }
        var flag = true;
        for (var k in obj) {
            if ($('#' + k).val().trim().length == 0) {
                flag = false;
                layer.alert(obj[k] + '不能为空');
                break;
            }

        }
        if (flag) {
            var index = myloading();
            //发起注册
            $.ajax({
                type: "post",
                url: "/reg",
                data: $('#frmreg').serialize(),
                success: function (data) {
                    layer.close(index);
                    layer.alert(data);
                    if (data == '注册成功') {
                        switchLogin();
                    }
                }
            });
        }
    })
})


//加载函数
function myloading() {
    return layer.load(2, {
        shade: [0.5, '#000'],
        content: '',
        success: function (layero) {
            layero.find('.layui-layer-content').css({
                'paddingTop': '40px',
                'textAlign': 'center',
                'backgroundPositionX': 'center',
                'color': '#fff',
                'fontSize': '16px',
                'fontWeight': '700',
                'letterSpacing': '2px'
            });
        }
    });
}