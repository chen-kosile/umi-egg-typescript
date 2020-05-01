import React from 'react';
import { Avatar } from 'antd';
import { connect } from 'dva';
import { CheckSquareOutlined } from '@ant-design/icons';

import { ConnectProps, ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import styles from './style.less';
import { roleLevel } from '../../config';

interface HeaderProps extends ConnectProps {
    currentUser?: CurrentUser
}

const Header: React.FC<HeaderProps> = props => {
    const { 
        currentUser = {
            avatar: '',
            username: '',
            name: '',
        }
    } = props;

    return (
        <div className={styles.header}>
            <div className={styles.top}>
                <div className={styles.left}>
                    <Avatar size="large" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
                    <div className={styles.userInfo}>
                        <div className={styles.name}>{currentUser.name}</div>
                        <div className={styles.time}>{currentUser.username}</div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.text}>{roleLevel[currentUser.level || -1]}</div>
                    <div className={styles.text}>{currentUser.group || '无'}</div>
                    <div className={styles.text}>{currentUser.parentGroup || '无'}</div>
                    <div className={styles.bgImg}/>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <div className={styles.upcoming}>
                        <CheckSquareOutlined />
                        <span className={styles.process}>待办流程 {0}</span>
                    </div>
                    <p style={{marginTop: '20px'}}>暂无待办流程，喝杯咖啡休息一下吧~</p>
                </div>
                <div className={styles.center}>
                    <div className={styles.process}>我的发起 <span className={styles.undone}>未完成 {0}</span></div>
                    <div style={{marginTop: '20px'}} className={styles.process}>抄送流程 <span className={styles.undone}>未确认 {0}</span></div>
                </div>
                <div className={styles.right}>
                    今日日程 {0}
                </div>
            </div>
        </div>
    )
}

export default connect(({ user }: ConnectState) => ({
    currentUser: user.currentUser
}))(Header);