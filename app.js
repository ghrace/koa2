const Koa = require('koa')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const router = require('koa-router')()
// import appRouters from './routes/index.js'
const appRouters=require('./routes')
const bodyParser = require('koa-bodyparser');


const app = new Koa()
app.use(bodyParser())
// 处理跨域的配置
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));


const db = mongoose.connect("mongodb://localhost:27017/admin")

let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
// 新增数据
let User = mongoose.model('acounts',UserSchema);//集合 名字结尾不是s会添加s
// var user = {
//     username: 'ydj',
//     password: '123123',
//     email: ''
//   }
// var newUser = new User(user);
// newUser.save();
router.get('/', async (ctx, next) => {
	let val = null
	const data = await User.findOne({username: 'ydj'})
	console.log('data', data)
	const result = {
		code:200,
		response: data,
		msg: 'ok'
	}
	ctx.response.body = result
	return result
})
app.use(router.routes())
app.use(appRouters.routes())

app.listen(9000);
console.log('app started at port 9000...')
