import Koa from "koa";
import route from "koa-route";

const app = new Koa();

app.use(
  route.get("/robots.txt", ctx => {
    ctx.body = "Robots.txt";
  })
);

app.use(async (ctx, next) => {
  ctx.body = "Hello World";
});

export default () => app.callback();
