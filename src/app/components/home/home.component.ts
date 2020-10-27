import {Component, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import mapData from '../../../assets/spainProvincesCustomLow';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngOnInit() {

    /*const test = {
      "type":"FeatureCollection",
      "features": [
        {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[1,2], [3,4], [5,6]]]}},
      ]}

    mapData.features.forEach(f => {
      f.geometry.coordinates = f.geometry.coordinates.map(c => {
        let coordinates = [];
        if (f.geometry.type === 'Polygon') {
          coordinates = invertCoordinates(c);
        } else if(f.geometry.type === 'MultiPolygon') {
          c.forEach(a => {
            const r = invertCoordinates(a);
            coordinates.push(r);
          })
        }

        return coordinates;
      });
    });
    const mapDataCopy = mapData;*/


    let map = am4core.create('chartdiv', am4maps.MapChart);
    map.geodata = mapData;
    map.projection = new am4maps.projections.Mercator;
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.events.on('hit', function (ev) {
      map.zoomToMapObject(ev.target);
    });
  }
}

const invertCoordinates = (c) => {
  let orderedCoordinates = [];
  const l = c.length;
  c.forEach((e, i) => {
    orderedCoordinates[l - 1 - i] = e;
  });

  return orderedCoordinates;
}
