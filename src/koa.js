const Koa = require('koa');

const app = new Koa();
const PORT = 3000;

// #1
app.use(async (ctx, next)=>{
    console.log(1, '进入中间件1')
    await next();
    console.log(1, '中间件1完成')
});
// #2
app.use(async (ctx, next) => {
    console.log(2, '进入中间件2')
    await next();
    console.log(2, '中间件2完成')
})

app.use(async (ctx, next) => {
    console.log(3, '进入中间件3，执行完成')
})

app.listen(PORT);
console.log(`http://localhost:${PORT}`);


/**
 * 执行结果：
 *  1 进入中间件1
    2 进入中间件2
    3 进入中间件3，执行完成
    2 中间件2完成
    1 中间件1完成
 */
/**
 * 分析：
 * listen 到 3000, 执行app
 * 执行开始：
 * 中间件1 入栈， 打印 "1 进入中间件1" 执行到 next(), 即执行中间件2
 * 中间件2 入栈， 打印 "2 进入中间件2" 执行到 next(), 即执行中间件3
 * 中间件3 入栈， 打印 "进入中间件3，执行完成" 无 next, 中间件3出栈
 * 中间件2回到栈顶，继续执行中间件2剩余代码，中间件2 出栈
 * 中间件1回到栈顶，继续执行中间件1剩余代码，中间件1 出栈
 * 执行结束；
 * 
 */



