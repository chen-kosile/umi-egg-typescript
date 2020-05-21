/* eslint-disable */
import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { Link } from 'umi';

import styles from './style.less';

const Content: React.FC = () => {
    return (
        <div className={styles.content}>
            <GridContent>
                <React.Fragment>
                    {/* <Row gutter={24} >
                        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }} >
                            <div className={`${styles.contentItem} ${styles.normal} ${styles.item1}`}>
                                <div className={styles.recently}>
                                    <span>最近使用</span>
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                            <div className={`${styles.contentItem} ${styles.normal} ${styles.item2}`}></div>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                            <div className={`${styles.contentItem} ${styles.normal} ${styles.item3}`}></div>
                        </Col>
                    </Row> */}
                    <Row gutter={24} style={{ marginBottom: 24 }}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }} >
                            <div className={`${styles.contentItem} ${styles.item1} ${styles.hoverItem}`}>
                                <div className={`${styles.choose} ${styles.one}`}>
                                    流程
                                </div>
                                <div className={styles.chooseHover}>
                                    <div className={styles.title}>流程的申请和审批</div>
                                    <div className={styles.line}></div>
                                    <div className={styles.cotent}></div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
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
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                            <div className={`${styles.contentItem} ${styles.item3} ${styles.hoverItem}`}>
                                <div className={`${styles.choose} ${styles.three}`}>
                                    数据可视化
                                </div>
                                <Link to="/analysis/monitor">
                                    <div className={styles.chooseHover}>
                                        <div className={styles.title}>提供疫情数据显示</div>
                                        <div className={styles.line}></div>
                                        <div className={styles.cotent}></div>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </React.Fragment>
            </GridContent>
        </div>
        
    )
}

export default Content;