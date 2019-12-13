import React from 'react';
import { connect } from 'dva';
import { Button, Card, Tooltip, Typography, Modal, message } from 'antd';
import StandardTable from '@/components/standard-table';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import { ConnectProps } from '@/models/connect';
import { IUserTable, IUser } from '@/models/user';
import UserDrawer, { TType } from './components/user-drawer';
import UserPermission from './components/user-permission';
import UserToGroup from './components/user-to-group';

interface IProps extends ConnectProps {
  loading: boolean;
  userTable: IUserTable
}

interface IQueryData {
  page: number;
  limit: number
}

const { Paragraph } = Typography;
const confirm = Modal.confirm;

const UsersPage: React.FC<IProps> = (props) => {
  const { userTable, loading, dispatch } = props;

  const [visible, setVisible] = React.useState<boolean>(false);
  const [permissionVisible, setPermissionVisible] = React.useState<boolean>(false);
  const [groupVisible, setGroupVisible] = React.useState<boolean>(false);
  const [type, setType] = React.useState<TType>('create');
  const [currentUser, setCurrentUser] = React.useState<IUser>({});
  const [queryData, setQueryData] = React.useState<IQueryData>({
    page: 1,
    limit: 10
  });

  React.useEffect(() => {
    getList();
  }, [queryData]);

  const getList = () => {
    dispatch({
      type: 'user/fetchList',
      payload: queryData
    })
  };

  const showCreateView = () => {
    setType('create');
    setCurrentUser({});
    setVisible(true);
  };

  const showUpdateView = (record) => {
    setType('update');
    setCurrentUser(record);
    setVisible(true);
  };

  const showPermissionView = (record) => {
    setCurrentUser(record);
    setPermissionVisible(true);
  };

  const showGroupView = (record) => {
    setCurrentUser(record);
    setGroupVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handlePermissionClose = () => {
    setPermissionVisible(false);
  };

  const handleGroupClose = () => {
    setGroupVisible(false);
  };

  const handleSubmit = (values) => {
    if (type === 'create') {
      dispatch({
        type: 'user/fetchCreate',
        payload: values,
        callback: () => {
          setVisible(false);
          message.success('创建成功');
          getList();
        }
      });
      return;
    }
    if (type === 'update') {
      dispatch({
        type: 'user/fetchUpdate',
        payload: values,
        callback: () => {
          setVisible(false);
          message.success('修改成功');
          getList();
        }
      });
    }
  };

  const handleConfirmRemove = (data) => {
    confirm({
      title: '确定删除?',
      content: '操作不可逆，请确定是否删除',
      onOk() {
        handleRemove(data.id);
      }
    });
  };

  const handleRemove = (userId) => {
    dispatch({
      type: 'user/fetchRemove',
      payload: userId,
      callback: () => {
        message.success('删除成功');
        getList();
      }
    })
  };

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setQueryData({
      page: current,
      limit: pageSize
    });
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div className="table-action">
          <Tooltip placement="top" title="添加到用户组">
            <Button
              size="small"
              icon="team"
              onClick={() => { showGroupView(record) }}
            />
          </Tooltip>
          <Tooltip placement="top" title="赋权">
            <Button
              size="small"
              icon="api"
              onClick={() => { showPermissionView(record) }}
            />
          </Tooltip>
          <Tooltip placement="top" title="更新">
            <Button
              size="small"
              icon="edit"
              onClick={() => { showUpdateView(record) }}
            />
          </Tooltip>
          <Tooltip placement="top" title="删除">
            <Button
              type="danger"
              size="small"
              icon="delete"
              onClick={() => { handleConfirmRemove(record) }}
            />
          </Tooltip>
        </div>
      )
    }
  ];

  const table = React.useMemo(() => {
    return (
      <StandardTable
        loading={loading}
        data={userTable}
        columns={columns}
        onChange={handleTableChange}
      />
    )
  }, [props.userTable, props.loading]);

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="用户管理"
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            新建用户
          </Button>
        ]}
      >
        <Paragraph>
          用户可以单独授权，单独授权的用户将不继承已添加的用户组的权限
        </Paragraph>
      </PageHeaderWrapper>

      <Card bordered={false}>
        {table}
      </Card>

      <UserDrawer
        type={type}
        visible={visible}
        currentUser={currentUser}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />

      <UserPermission
        visible={permissionVisible}
        onClose={handlePermissionClose}
      />

      <UserToGroup
        visible={groupVisible}
        onClose={handleGroupClose}
      />
    </React.Fragment>
  )
};

UsersPage.defaultProps = {
  loading: false
};

export default connect(({ user, loading }) => ({
  userTable: user.table,
  loading: loading.effects['user/fetchList'],
}))(UsersPage);
