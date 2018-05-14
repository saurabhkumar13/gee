// var fcD = ee.FeatureCollection('ft:17FoEu1aJZbmr4VxHXaSf7YrKqqkebJgFmFKY6wIL','geometry')
// fcD = fcD.filter(ee.Filter.eq('ST_NM','Bihar'))
var fcV = ee.FeatureCollection('ft:1bS713JsGCVgpF8T-LQ-zfziqUjL5GGjoVxTITokg','geometry')
// fcV = fcV.filter(ee.Filter.eq('ST_NM','Bihar'))
// var fc = ee.FeatureCollection('ft:1KPSrYXWjRuR1Vo2eEWFOHP6NoGyAOJObCkScteQo','geometry')
// fc = fc.filter(ee.Filter.inList('PKey',[301,1002,303,703,1803,905,1105,1806,2006,208,308,1808,2108,2208,2408,2508,2808,3308,909,111,411,112,512,812,912,1612,413,513,813,1013,1113,114,414,115,215,315,515,615,715,117,417,517,2020,2021,722,922,1022,1222,1322,1422,1722,1822,623,1523,1623,1723,1823,1923,2023,2123,2223,2323,2423,3023,3723,3823,4423,4723,4823,4923,5023,2624,127,227,327,427,527,627,727,827,927,1027,1227,1427,1527,1627,1727,1827,1927,2827,2927,3027,3227,3427,1028,1828,1928,2028,2128,2228,229,529,629,729,929,1629,2629,833,2533]))
// Map.addLayer(fcV)
// print(fc)
var h = ee.FeatureCollection('ft:160wc9WElpq9daaoAceg6jfTXvf5l_6D_oKS_UlXj','geometry')

Map.addLayer(fcV.filter(ee.Filter.eq('Village_HHD_Cluster_EMP','1. High Unemployement')), {color: 'deebf7'}, 'low');
Map.addLayer(fcV.filter(ee.Filter.eq('Village_HHD_Cluster_EMP','2. High AL')), {color: '9ecae1'}, 'med');
Map.addLayer(fcV.filter(ee.Filter.eq('Village_HHD_Cluster_EMP','3. High Non-AL')), {color: '3182bd'}, 'adv');
Map.addLayer(h)
function addCentroid(ft){
  ft = ee.Feature(ft)
  ft = ft.set('geometry',ft.geometry().centroid())
  ft = (ft.setGeometry(null))
  return ft;
}
// print(addCentroid(fcV.first()))
Export.table.toDrive(fcV.map(addCentroid))
var nl = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG').median().select('avg_rad')
nl = nl.expression('a/20', {'a': nl.select('avg_rad')})
Map.addLayer(nl)

// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',12)), {color: '3182fd'}, '12');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',11)), {color: 'deebf7'}, '11');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',14)), {color: '9ecae1'}, '14');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',13)), {color: '3182bd'}, '13');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',12)), {color: '3182fd'}, '12');
// Map.addLayer(fcD.filter(ee.Filter.lt('emp',0.35)), {color: '3182fd'}, '13');
// Map.addLayer(fcD.filter(ee.Filter.gt('emp',0.35)), {color: 'deebf7'}, '12');
// Map.addLayer(fc.filter(ee.Filter.eq('labels',11)), {color: 'deebf7'}, '11');
// Map.addLayer(fc.filter(ee.Filter.eq('labels',14)), {color: '9ecae1'}, '14');
// Map.addLayer(fc.filter(ee.Filter.eq('labels',13)), {color: '3182bd'}, '13');
// Map.addLayer(fc.filter(ee.Filter.eq('labels',12)), {color: '3182fd'}, '12');
// Map.addLayer(fc.filter(ee.Filter.eq('label',1)), {color: 'deebf7'}, 'colored');
// Map.addLayer(fc.filter(ee.Filter.eq('label',4)), {color: '9ecae1'}, 'colored');
// Map.addLayer(fc.filter(ee.Filter.eq('label',3)), {color: '3182bd'}, 'colored');
// Map.addLayer(fc.filter(ee.Filter.eq('label',2)), {color: '3182fd'}, 'colored');

 