const myexpress = require('express');
const favicon = require('serve-favicon');//自定义图标
const logger = require('morgan');//日志
const bodyparser = require('body-parser')//post参数解析
const userrouter = require('./router/userrouter')
const cookieParser = require('cookie-parser')//引入cookie
const session = require('express-session')//引入session
const viewrouter = require('./router/viewrouter')
const productrouter=require('./router/productrouter')
var ejs = require('ejs');
const app = myexpress();//执行函数，返回一个服务对象
//配置

//定义日志
app.use(logger('dev'));
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', __dirname + '/view');
app.engine('html', ejs.__express);
app.set('view engine', 'html');
//post方法要配置
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());// 定义cookie解析器
app.use(session({//定义session
    secret: '1234',
    name: 'testapp',   //这里的name值得是cookie的name，默认   cookie的name是：connect.sid
    cookie: { maxAge: 800000 },  //设置maxAge是80000ms，即80s后session和相应的            cookie失效过期
    rolling: true,   //更新session-cookie失效时间
    resave: true     //重新保存
}));

app.use(userrouter);
app.use(viewrouter);
app.use(productrouter);
// app.get('/index.html', (req, res) => {
//     if (req.session.user) {
//         res.render('index', { user: req.session.user, headimage: req.session.info.headimage })
//     } else {
//         res.render('index', { user: req.session.user })
//     }

// })
//静态资源文件的路径配置
app.use(myexpress.static(__dirname + '/public'))//修改为默认的页面

//定义icon图标
app.use(favicon(__dirname + '/public/favicon.ico'));

app.listen(9999)