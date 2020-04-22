import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import {
  // Avatar,
  Card,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  // Progress,
  Radio,
} from 'antd';

import { findDOMNode } from 'react-dom';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { statusType, statusConf, processTypes, leaveTypes } from './config';
import { BasicListItemDataType } from './data.d';
import { UserModelState, CurrentUser } from '@/models/user';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface BasicListProps {
  listAndbasicList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
  currentUser?: CurrentUser;
}

const ListContent = ({
  data: { 
    createdAt, 
    user,
    processType,
    leaveType,
    reason,
    startTime,
    endTime,
    status,
  },
  index
}: {
  data: BasicListItemDataType;
  index: number
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <p>{index + 1}</p>
    </div>
    <div className={styles.listContentItem}>
      <p>{statusType[status]}</p>
      <div className={`${styles.circle} ${styles[statusConf[status]]}`} />
    </div>
    <div className={styles.listContentItem}>
      <span>类型</span>
      <p>{processTypes[processType]}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>请假类型</span>
      <p>{leaveTypes[leaveType]}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>原因</span>
      <p>{reason}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>起止时间</span>
      <p>{moment(startTime).format('YYYY-MM-DD HH:mm')}-{moment(endTime).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>operator</span>
      <p>{user.name}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
  </div>
);

export const BasicList: FC<BasicListProps> = props => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    listAndbasicList: { list, total },
    currentUser = {
      userId: ''
    }
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);
  const [newList, setNewList] = useState<BasicListItemDataType[]>(list);

  useEffect(() => {
    dispatch({
      type: 'listAndbasicList/queryProcessList',
      payload: {
        current: 0,
        pageSize: 20,
        userId: currentUser.userId
      },
    });
  }, []);

  useEffect(() => {
    setNewList(list);
  }, [list])
  const paginationProps = {
    // showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 20,
    total
  };

  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: number) => {
    dispatch({
      type: 'listAndbasicList/queryDeleteProcess',
      payload: { processId: id },
    });
  };

  const editAndDelete = (key: string, currentItem: BasicListItemDataType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除申请',
        content: '确定删除该申请吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };
  const onChangeSelect = (ev: any) => {
    const { value } = ev.target;
    let tempList: BasicListItemDataType[];
    if (value === 'normal') {
      tempList = list.filter(item => item.status === 1);
    } else if (value === 'success') {
      tempList = list.filter(item => item.status === 2);
    } else if (value === 'exception') {
      tempList = list.filter(item => item.status === 3);
    } else {
      tempList = list;
    }
    setNewList(tempList);
  }

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all" onChange={onChangeSelect}>
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="normal">进行中</RadioButton>
        <RadioButton value="success">完成</RadioButton>
        <RadioButton value="exception">驳回</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn: React.FC<{
    item: BasicListItemDataType;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    const id = current ? current.id : '';

    setAddBtnblur();

    setDone(true);
    dispatch({
      type: 'listAndbasicList/submit',
      payload: { ...values, id },
    });
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="基本列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={newList}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={e => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <ListContent data={item} index={index} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(
  ({
    listAndbasicList,
    loading,
    user
  }: {
    listAndbasicList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
    user: UserModelState;
  }) => ({
    listAndbasicList,
    loading: loading.models.listAndbasicList,
    currentUser: user.currentUser,
  }),
)(BasicList);
