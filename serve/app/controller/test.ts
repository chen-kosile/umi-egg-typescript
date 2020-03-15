import { Controller} from 'egg';

class TestController extends Controller {
    public async index() {
        const { ctx } = this;
        ctx.returnBody(500, "该接口没有被定义，查看是否Method错误或者定义接口");
    }
}

module.exports = TestController;