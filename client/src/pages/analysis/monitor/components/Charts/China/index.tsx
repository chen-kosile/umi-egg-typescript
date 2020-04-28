import { Scene, PolygonLayer, LineLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import * as React from 'react';

export default class Map extends React.Component {
    private scene: Scene;

    public async componentDidMount() {
      this.initMap();
      this.addLayer();
    }

    public componentWillUnmount() {
        this.scene.destroy();
    }

    private initMap() {
        this.scene = new Scene({
          id: 'map',
          map: new GaodeMap({
              pitch: 0,
              style: 'light',
              center: [ 107.042225, 37.66565 ],
              zoom: 3.87
          })
        });
    }

    private addLayer() {
        fetch('https://gw.alipayobjects.com/os/rmsportal/JToMOWvicvJOISZFCkEI.json')
        .then(res => res.json())
        .then(data => {
          const colors = [
            '#D7F9F0',
            '#A6E1E0',
            '#72BED6',
            '#5B8FF9',
            '#3474DB',
            '#005CBE',
            '#00419F',
            '#00287E'
          ];
          const layer = new PolygonLayer({})
            .source(data)
            .color('name', colors)
            .shape('fill')
            .active(true)
            .style({
              opacity: 0.9
            });
    
          const layer2 = new LineLayer({
            zIndex: 2
          })
            .source(data)
            .color('#fff')
            .size(0.3)
            .style({
              opacity: 1
            });
    
          this.scene.addLayer(layer);
          this.scene.addLayer(layer2);
        });
    }

    public render() {
      return (
        <div
          id="map"
          style={{
            position: 'relative',
            width: '100%',
            height: '452px',
          }}
        />
      );
    }
}
