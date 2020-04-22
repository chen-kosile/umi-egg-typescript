import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useRef } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { UserModelState, CurrentUser } from '@/models/user';
import { TableListItem } from './data.d';
import { statusType, statusConf, processTypes, leaveTypes } from './config';
import { 
  queryApproveList, 
  queryApproveProcess,
  queryRefuseProcess
} from './service';
import styles from './styles.less';


interface BasicListProps {
  currentUser?: CurrentUser;
}

const TableList: React.FC<BasicListProps> = props => {
  const { currentUser = { userId: ''} } = props;
  const actionRef = useRef<ActionType>();

  function approveProcess(processId: number) {
    queryApproveProcess(processId).then(res => {
      if (res.status === 200) {
        message.success('审批通过');
        if (actionRef && actionRef.current) {
          actionRef.current.reload();
        }
      }
    })
  }

  function refuseProcess(processId: number) {
    queryRefuseProcess(processId).then(res => {
      if (res.status === 200) {
        message.success('操作成功');
        if (actionRef && actionRef.current) {
          actionRef.current.reload();
        }
      }
    })
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '流程状态',
      dataIndex: 'status',
      render: (_, record) => (
        <div>
          <p>{statusType[record.status]}</p>
          <div className={`${styles.circle} ${styles[statusConf[record.status]]}`} />
        </div>
      )
    },
    {
      title: '流程类型',
      dataIndex: 'processType',
      render: (val, record) => {
        console.log(val);
        return (
          <div>
            {processTypes[record.processType]}
          </div>
        )
      }
    },
    {
      title: '请假类型',
      dataIndex: 'leaveType',
      // sorter: true,
      render: (_, record) => <div>{leaveTypes[record.leaveType]}</div>,
    },
    {
      title: '原因',
      dataIndex: 'reason',
    },
    {
      title: '起止时间',
      dataIndex: 'startTime',
      // sorter: true,
      render: (_, record) => <div>{moment(record.startTime).format('YYYY-MM-DD HH:mm')}-
      {moment(record.endTime).format('YYYY-MM-DD HH:mm')}</div>,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '申请人',
      dataIndex: 'user',
      render: (_, record) => <div>{record.user.name}</div>
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => approveProcess(record.id)}
          >
            通过
          </a>
          <Divider type="vertical" />
          <a onClick={() => refuseProcess(record.id)}>拒绝</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      // await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        // tableAlertRender={(selectedRowKeys, selectedRows) => (
        //   <div>
        //     已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
        //     <span>
        //       服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
        //     </span>
        //   </div>
        // )}
        request={async (params = {}) => {
            const res = await queryApproveList({
              ...params,
              userId: currentUser.userId
            })
            return {
              data: res.data.list,
              total: res.data.total,
              page: params.current,
              success: true 
            };
          }
        }
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({
  user
}: { 
  user: UserModelState;
}) => ({
  currentUser: user.currentUser,
}))(TableList);
