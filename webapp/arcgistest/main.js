require.config({
    /** lib库目录 */
    baseUrl: "../",
    /** 如果调试，地址上添加时间戳 */
    urlArgs: "bust="+(new Date()).getTime(),
    /** 超时时间 */
    waitSeconds: 30,
    /** 模块路径 */
    paths: {
		  
    },
    shim: {
       	
    }
});

define([
  "dojo/has",
  "esri/config",
  "esri/Map",
  "esri/views/SceneView",
  "esri/widgets/Search"
], function (
  has, esriConfig,
  Map, SceneView,
  Search
) {

  if (!has("dojo-built")) {
    esriConfig.workers.loaderConfig = {
      paths: {
        "esri": "../arcgis-js-api"
      }
    };
  }

  var map = new Map({
    basemap: "streets-night-vector",
    ground: "world-elevation"
  });

  var view = new SceneView({
    container: "viewDiv",
    map: map,
    scale: 50000000,
    center: [-101.17, 21, 78]
  });

  var searchWidget = new Search({
    view: view,
    container: "searchDiv"
  });
});