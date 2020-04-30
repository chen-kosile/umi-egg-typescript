/* eslint-disable */
import React from 'react';
import { Link } from 'umi';

import styles from './style.less';

const Content: React.FC = () => {
    return (
        <div className={styles.content}>
            <div className={styles.contentItems}>
                <div className={`${styles.contentItem} ${styles.normal} ${styles.item1}`}>
                    <div className={styles.recently}>
                        <span>最近使用</span>
                    </div>
                </div>
                <div className={`${styles.contentItem} ${styles.normal} ${styles.item2}`}></div>
                <div className={`${styles.contentItem} ${styles.normal} ${styles.item3}`}></div>
            </div>
            <div className={styles.contentItems}>
                <div className={`${styles.contentItem} ${styles.item1} ${styles.hoverItem}`}>
                    <div className={`${styles.choose} ${styles.one}`}>
                        流程
                    </div>
                    <div className={styles.chooseHover}>
                        <div className={styles.title}>提供办公流程的申请和审批</div>
                        <div className={styles.line}></div>
                        <div className={styles.cotent}></div>
                    </div>
                </div>
                <div className={`${styles.contentItem} ${styles.item2} ${styles.hoverItem}`}>
                    <div className={`${styles.choose} ${styles.two}`}>
                        公告
                    </div>
                    <div className={styles.chooseHover}>
                        <div className={styles.title}>提供公告发布功能</div>
                        <div className={styles.line}></div>
                        <div className={styles.cotent}></div>
                    </div>
                </div>
                <div className={`${styles.contentItem} ${styles.item3} ${styles.hoverItem}`}>
                    <div className={`${styles.choose} ${styles.three}`}>
                        实时疫情
                    </div>
                    <Link to="/analysis/monitor">
                        <div className={styles.chooseHover}>
                            <div className={styles.title}>提供疫情数据显示</div>
                            <div className={styles.line}></div>
                            <div className={styles.cotent}></div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Content;