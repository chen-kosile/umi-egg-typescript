import { Card, Col, Row, Statistic } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
// import numeral from 'numeral';
import { StateType } from './model';
import { 
  // Pie, 
  // WaterWave, 
  Gauge, 
  // TagCloud, 
  World,
  Map
} from './components/Charts';
// import ActiveChart from './components/ActiveChart';
import styles from './style.less';

// const { Countdown } = Statistic;

// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

interface MonitorProps {
  dashboardAndmonitor: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

class Monitor extends Component<MonitorProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndmonitor/fetchTags',
    });
  }

  render() {
    // const { dashboardAndmonitor, loading } = this.props;
    // const { tags } = dashboardAndmonitor;
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={24}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title='全球疫情'
                bordered={false}
              >
                <Row>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      valueStyle={{color: '#E83132'}}
                      title='累计确诊'
                      suffix="人"
                      value={2941308}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      valueStyle={{color: '#FF6A57'}}
                      title='现有确诊'
                      suffix="人"
                      value={1910263}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      valueStyle={{color: '#000000'}}
                      title='死亡'
                      suffix="人"
                      value={203614}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      valueStyle={{color: '#10B8D2'}}
                      title='治愈'
                      suffix="人"
                      value={827431}
                    />
                  </Col>
                </Row>
                <div className={styles.mapChart}>
                  <World />
                </div>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title="全球疫情"
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                <Row>
                  <Col>
                    <Statistic
                        valueStyle={{color: '#E83132'}}
                        title='累计确诊'
                        suffix="人"
                        value={2941308}
                      />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Statistic
                        valueStyle={{color: '#FF6A57'}}
                        title='现有确诊'
                        suffix="人"
                        value={1910263}
                      />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Statistic
                        valueStyle={{color: '#000000'}}
                        title='死亡'
                        suffix="人"
                        value={203614}
                      />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Statistic
                        valueStyle={{color: '#10B8D2'}}
                        title='治愈'
                        suffix="人"
                        value={827431}
                      />
                  </Col>
                </Row>
              </Card>
              <Card
                title='治愈率'
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Gauge
                  title={formatMessage({
                    id: 'dashboardandmonitor.monitor.ratio',
                    defaultMessage: 'Ratio',
                  })}
                  height={180}
                  percent={87}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title='国内疫情'
                bordered={false}
              >
                <Row>
                <Col md={6} sm={12} xs={24}>
                    <Statistic
                      valueStyle={{color: '#E83132'}}
                      title='累计确诊'
                      suffix="人"
                      value={84367}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      valueStyle={{color: '#FF6A57'}}
                      title='现有确诊'
                      suffix="人"
                      value={1012}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      valueStyle={{color: '#000000'}}
                      title='死亡'
                      suffix="人"
                      value={4643}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      valueStyle={{color: '#10B8D2'}}
                      title='治愈'
                      suffix="人"
                      value={78712}
                    />
                  </Col>
                </Row>
                <div className={styles.mapChart}>
                  <Map />
                </div>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title="国内疫情"
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                <Row>
                  <Col>
                  <Statistic
                      valueStyle={{color: '#E83132'}}
                      title='累计确诊'
                      suffix="人"
                      value={84367}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Statistic
                      valueStyle={{color: '#FF6A57'}}
                      title='现有确诊'
                      suffix="人"
                      value={1012}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Statistic
                      valueStyle={{color: '#000000'}}
                      title='死亡'
                      suffix="人"
                      value={4643}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Statistic
                      valueStyle={{color: '#10B8D2'}}
                      title='治愈'
                      suffix="人"
                      value={78712}
                    />
                  </Col>
                </Row>
              </Card>
              <Card
                title='治愈率'
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Gauge
                  title={formatMessage({
                    id: 'dashboardandmonitor.monitor.ratio',
                    defaultMessage: 'Ratio',
                  })}
                  height={180}
                  percent={50}
                />
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    dashboardAndmonitor,
    loading,
  }: {
    dashboardAndmonitor: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    dashboardAndmonitor,
    loading: loading.models.dashboardAndmonitor,
  }),
)(Monitor);
