import {Component, Input, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import response from '../../../assets/response_example';
import mapData from '../../../assets/spainProvincesCustomLow';
import {CoronaService} from '../../service/corona.service';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input()
  coronaData: any;

  polygonSeries: any;

  constructor(private itemsService: CoronaService) {
    itemsService.getCoronaData().subscribe(
      data => {
        this.processData(data);
      },
      err => console.error(err),
      () => console.log('done loading foods')
    );
  }

  ngOnInit() {
    let map = am4core.create('chartdiv', am4maps.MapChart);
    map.geodata = mapData;
    map.projection = new am4maps.projections.Mercator;
    this.polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    this.polygonSeries.useGeodata = true;
    this.polygonSeries.mapPolygons.template.events.on('hit', function (ev) {
      map.zoomToMapObject(ev.target);
    });
    this.polygonSeries.dataFields.value = 'value';

    // Configure series
    let polygonTemplate = this.polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{nameunit} {value} {id}';
    polygonTemplate.fill = am4core.color('#FAC564');

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create('hover');
    hs.properties.opacity = 0.8;

    // Mini map
    map.smallMap = new am4maps.SmallMap();
    map.smallMap.series.push(this.polygonSeries);

    // Heat map
    this.polygonSeries.heatRules.push({
      'property': 'fill',
      'target': this.polygonSeries.mapPolygons.template,
      'min': am4core.color('#F6AA1C'),
      'max': am4core.color('#621708')
    });

    // Add expectancy data
    this.polygonSeries.events.on("beforedatavalidated", function(ev) {
      let source = ev.target.data;
      if (source) {
        console.log(source)
        ev.target.data = source;
      }
    });
  }

  processData(data) {
    this.coronaData = [
      {
        id: "ES-BU",
        value: 60
      },
      {
        id: "ES-M",
        value: 60
      },
      {
        id: "ES-LU",
        value: 60
      }
    ];
    this.polygonSeries.data = this.coronaData;
    console.log(data);
  }
}
