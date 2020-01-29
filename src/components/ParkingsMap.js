import React from 'react';
import { connect } from 'react-redux';

import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { OSM } from 'ol/source';

import { checkPaid } from './ParkingsList'
import './style/ParkingsMap.css';

const gdanskWebMercator = fromLonLat([18.608097630119324, 54.383750637998535]);

class ParkingsMap extends React.Component {
  constructor() {
    super();
    
    this.state = {
      center: gdanskWebMercator,
      zoom: 16,
    };

    this.checkObjectFromMap.bind(this);
    this.onClickNewLayer.bind(this);
    this.onMouseOverNewLayer.bind(this);
  }

  checkObjectFromMap(polygon, object) {
    var map = this.map;

    map.on('pointermove', function(event) {
      if(!polygon.intersectsCoordinate(event.coordinate)) {
        map.getOverlayById(0).setPosition(undefined);
      }
      else {
        var element = map.getOverlayById(0).getElement();
        element.style.display = "block";

        var content = document.getElementById('popup-content');
        content.innerHTML = '<p>Ilość miejsc parkingowych: ' + object.properties.spots + '</p>' +
                            '<p>Ilość miejsc parkingowych dla niepełnosprawnych: ' + object.properties.handicappedSpots + '</p>' +
                            '<p>' + checkPaid(object.properties.paid) + '</p>';
        map.getOverlayById(0).setPosition(event.coordinate);
      }
    });
  }

  onClickNewLayer(onClickItem) {
    this.map.removeLayer(this.onClickVectorLayer); 
    
    var newPolygon = onClickItem.geometry.coordinates["0"];

    this.polygon = new Polygon([newPolygon]);
    this.polygon.transform('EPSG:4326', 'EPSG:3857');

    var feature = new Feature(this.polygon);

    var vectorSource = new VectorSource();
    vectorSource.addFeature(feature);

    this.onClickVectorLayer = new VectorLayer({
      source: vectorSource
    });

    var newCenterView = fromLonLat(onClickItem.geometry.coordinates["0"]["0"]);

    this.map.getView().setCenter(newCenterView);
    this.map.getView().setZoom(17);

    this.map.addLayer(this.onClickVectorLayer);
  }

  onMouseOverNewLayer(onMouseOverItem) {
    if(onMouseOverItem === false) {
      this.map.removeLayer(this.onMouseOverVectorLayer);
    }
    else {
      var newPolygon = onMouseOverItem.geometry.coordinates["0"];

      var polygon = new Polygon([newPolygon]);
      polygon.transform('EPSG:4326', 'EPSG:3857');

      var feature = new Feature(polygon);

      var vectorSource = new VectorSource();
      vectorSource.addFeature(feature);

      this.onMouseOverVectorLayer = new VectorLayer({
        source: vectorSource
      });

      this.map.addLayer(this.onMouseOverVectorLayer);
    }
  }

  componentDidMount() {
    var overlay = new Overlay({
      id: 0,
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.map = new Map({
      target: "map",
      overlays: [overlay],
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchSelected !== this.props.fetchSelected) {
      this.onClickNewLayer(this.props.fetchSelected);
      this.checkObjectFromMap(this.polygon, this.props.fetchSelected);
    }

    if (prevProps.fetchOnMouseOver !== this.props.fetchOnMouseOver) {
      this.onMouseOverNewLayer(this.props.fetchOnMouseOver);
    }
  }

  render() {
    return (
      <div id="map">
        <div id="popup" className="ol-popup">
          <div id="popup-content"></div>
        </div>
      </div>
    )
  }
  }

  const mapStateToProps = state => {
  return { fetchSelected: state.fetchSelected,
          fetchOnMouseOver: state.fetchOnMouseOver 
  };
}

export default connect(mapStateToProps)(ParkingsMap);