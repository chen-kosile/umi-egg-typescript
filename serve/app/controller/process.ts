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
            endTime
        });
        if (process && process.userId) {
            ctx.returnBody(200, "提交成功")
        } else {
            ctx.returnBody(500, "提交失败", {
                process
            });
        }
    }

}

module.exports = ProcessController;