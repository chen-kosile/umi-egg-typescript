/* eslint-disable */
// import { Scene, PolygonLayer, LineLayer, PointLayer } from '@antv/l7';
import {
  // HeatmapLayer,
  LineLayer,
  LayerEvent,
  MapboxScene,
  // Marker,
  // PointLayer,
  PolygonLayer,
  Popup,
} from '@antv/l7-react';
// import { GaodeMap } from '@antv/l7-maps';
import * as React from 'react';

const colors =
['#732200', '#CC3D00', '#FF6619', '#FF9466', '#FFC1A6', '#FCE2D7','#2b8cbe','#08589e'].reverse();

// function joinData(geodata: any, ncovData: any) {
//   const ncovDataObj: any = {};
//   ncovData.forEach((item: any) => {
//     const {
//       countryName,
//       countryEnglishName,
//       currentConfirmedCount,
//       confirmedCount,
//       suspectedCount,
//       curedCount,
//       deadCount,
//     } = item;
//     if (countryName === '中国') {
//       if (!ncovDataObj[countryName]) {
//         ncovDataObj[countryName] = {
//           countryName,
//           countryEnglishName,
//           currentConfirmedCount: 0,
//           confirmedCount: 0,
//           suspectedCount: 0,
//           curedCount: 0,
//           deadCount: 0,
//         };
//       } else {
//         ncovDataObj[countryName].currentConfirmedCount += currentConfirmedCount;
//         ncovDataObj[countryName].confirmedCount += confirmedCount;
//         ncovDataObj[countryName].suspectedCount += suspectedCount;
//         ncovDataObj[countryName].curedCount += curedCount;
//         ncovDataObj[countryName].deadCount += deadCount;
//       }
//     } else {
//       ncovDataObj[countryName] = {
//         countryName,
//         countryEnglishName,
//         currentConfirmedCount,
//         confirmedCount,
//         suspectedCount,
//         curedCount,
//         deadCount,
//       };
//     }
//   });
//   const geoObj: any = {};
//   geodata.features.forEach((feature: any) => {
//     const { name } = feature.properties;
//     geoObj[name] = feature.properties;
//     const ncov = ncovDataObj[name] || {};
//     feature.properties = {
//       ...feature.properties,
//       ...ncov,
//     };
//   });
//   return geodata;
// }

const Map = React.memo(function Map() {
  const [data, setData] = React.useState();
  // const [dataPro, setDataPro] = React.useState();
  // const [filldata, setfillData] = React.useState();
  const [popupInfo, setPopupInfo] = React.useState<{
    lnglat: number[];
    feature: any;
  }>();
  React.useEffect(() => {
    const fetchData = async () => {
      const [geoData, ncovData] = await Promise.all([
        fetch(
          '/FeHelper-20200429004004.json'
        ).then((d) => d.json()),
        // https://lab.isaaclin.cn/nCoV/api/area?latest=1
        fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/55a7dd2e-3fb4-4442-8899-900bb03ee67a.json',
        ).then((d) => d.json())
      ]);
      setData(geoData);
    };
    fetchData();
  }, []);

  function showPopup(args: any): void {
    setPopupInfo({
      lnglat: args.lngLat,
      feature: args.feature,
    });
  }
  return (
    <>
      <MapboxScene
        map={{
          pitch: 0,
          style: 'light',
          center: [ 107.042225, 37.66565 ],
          zoom: 2.5
        }}
        style={{
          position: 'absolute',
          background:'#fff', // 地图背景色
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {popupInfo && (
          <Popup lnglat={popupInfo.lnglat}>
            {popupInfo.feature.properties.name}
            <ul
              style={{
                margin: 0,
              }}
            >
              <li>现有确诊:{popupInfo.feature.properties.currentConfirmedCount}</li>
              <li>累计确诊:{popupInfo.feature.properties.confirmedCount}</li>
              <li>治愈:{popupInfo.feature.properties.curedCount}</li>
              <li>死亡:{popupInfo.feature.properties.deadCount}</li>
            </ul>
          </Popup>
          )}
        {data && [
          <PolygonLayer
            key={'1'}
            options={{
              autoFit: false,
            }}
            source={{
              data,
            }}
            scale={{
              values: {
                confirmedCount: {
                  type: 'log',
                },
              },
            }}
            active={{
              option: {
                color: '#0c2c84',
              },
            }}
            color={{
              field: 'confirmedCount',
              values: (count) => {
                return count > 10000
                  ? colors[6]
                  : count > 1000
                  ? colors[5]
                  : count > 500
                  ? colors[4]
                  : count > 100
                  ? colors[3]
                  : count > 10
                  ? colors[2]
                  : count > 1
                  ? colors[1]
                  : colors[0];
              },
            }}
            shape={{
              values: 'fill',
            }}
            style={{
              opacity: 1,
            }}
          >
            <LayerEvent type="mousemove" handler={showPopup} />
          </PolygonLayer>
          ,
          <LineLayer
            key={'2'}
            source={{
              data,
            }}
            size={{
              values: 0.6,
            }}
            color={{
              values: '#aaa', // 描边颜色
            }}
            shape={{
              values: 'line',
            }}
            style={{
              opacity: 1,
            }}
          />,
        ]}
      </MapboxScene>
    </>
  );
});

export default Map;