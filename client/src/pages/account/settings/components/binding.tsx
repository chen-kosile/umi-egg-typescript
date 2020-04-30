// import { formatMessage } from 'umi-plugin-react/locale';
import { GithubFilled, WechatFilled, QqOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { Component, Fragment } from 'react';

class BindingView extends Component {
  getData = () => [
    {
      title: '绑定github',
      description: '当前未绑定github',
      actions: [
        <a key="Bind">
          绑定
        </a>,
      ],
      avatar: <GithubFilled className="taobao" />,
    },
    {
      title: '绑定微信',
      description: '当前未绑定微信',
      actions: [
        <a key="Bind">
          绑定
        </a>,
      ],
      avatar: <WechatFilled className="alipay" />,
    },
    {
      title: '绑定QQ',
      description: '当前未绑定QQ',
      actions: [
        <a key="Bind">
          绑定
        </a>,
      ],
      avatar: <QqOutlined className="dingding" />,
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default BindingView;
