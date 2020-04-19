import { Controller} from 'egg';

class ProcessController extends Controller {
    public async submitProcess() {
        const { ctx } = this;
        const {
            userId,
            processType,
            leaveType,
            approve,
            reason,
            startTime,
            endTime
        } = ctx.request.body;
        const process = await ctx.service.process.createProcess({
            userId,
            processType,
            leaveType,
            approve,
            reason,
            startTime,
            endTime,
            status: 1
        });
        if (process && process.userId) {
            ctx.returnBody(200, "提交成功")
        } else {
            ctx.returnBody(500, "提交失败", {
                process
            });
        }
    }

    public async getProceeList() {
        const { ctx } = this;
        const { offset, limit, userId } = ctx.request.body;
        const list = await ctx.service.process.getProcessList({
            offset,
            limit,
            userId
        });
        if (list) {
            ctx.returnBody(200, "获取成功", {
                list: list.rows,
                total: list.count
            })
        } else {
            ctx.returnBody(500, '错误');
        }
    }
}

module.exports = ProcessController;