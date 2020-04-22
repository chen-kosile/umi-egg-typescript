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

    public async getProcessList() {
        const { ctx } = this;
        const { current, pageSize, userId } = ctx.request.body;
        const data = await ctx.service.process.getProcessList({
            current,
            pageSize,
            userId
        });
        if (data) {
            ctx.returnBody(200, "获取成功", {
                list: data.rows,
                total: data.count
            })
        } else {
            ctx.returnBody(500, '错误');
        }
    }

    public async getApproveList() {
        const { ctx } = this;
        const { userId, pageSize, current } = ctx.request.body;
        const data = await ctx.service.process.getApproveList({
            current,
            pageSize,
            userId
        })
        if (data) {
            ctx.returnBody(200, "获取成功", {
                list: data.rows,
                total: data.count
            })
        } else {
            ctx.returnBody(500, '错误');
        }
    }

    public async changeProcessStatus() {
        const { ctx } = this;
        const { processId, status } = ctx.request.body;
        const success = await ctx.service.process.changeProcessStatus({
            status,
            id: processId
        })
        if (success) {
            ctx.returnBody(200, "")
        } else {
            ctx.returnBody(500, "失败");
        }
    }

    public async deleteProcess() {
        const { ctx } = this;
        const { processId } = ctx.request.body;
        const data = await ctx.service.process.deleteProcess(processId);
        if (data) {
            ctx.returnBody(200, '删除成功');
        } else {
            ctx.returnBody(500, '删除失败');
        }
    }
}

module.exports = ProcessController;