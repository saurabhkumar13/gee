/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var modis = ee.ImageCollection("MODIS/051/MCD12Q1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var fcD = ee.FeatureCollection('ft:17FoEu1aJZbmr4VxHXaSf7YrKqqkebJgFmFKY6wIL','geometry')
fcD = fcD.filter(ee.Filter.inList('ST_NM',['Bihar']))
fcD = fcD.filter(ee.Filter.eq('censuscode',226))
print(fcD)
modis = modis.select(['Land_Cover_Type_1']);
modis = modis.median()
print(modis)
modis = modis.expression('a==13?1:0',{'a':modis.select('Land_Cover_Type_1')});
// Map.addLayer(modis)
// Map.addLayer(fc)
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',11)), {color: 'deebf7'}, '11');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',14)), {color: '9ecae1'}, '14');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',13)), {color: '3182bd'}, '13');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',12)), {color: '3182fd'}, '12');

function getImageMin(geom,y1,m1,y2,m2){
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
c2 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.min())
}

function getImageMax(geom,y1,m1,y2,m2){
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
c2 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.max())
}
var district = fcD;
var i,i1,i2,x,ff;
i1 = getImageMax(district.geometry(),'2014','01','2020','12')
i2 = getImageMin(district.geometry(),'2014','01','2020','12')
var b='B7'
ff = i1.expression('1-(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
var nl = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
.filterBounds(district.geometry()).median().select('avg_rad');
ff = ff.expression('b>0.7&&a>1?1:0',{'a':nl.select('avg_rad'),'b':ff.select('constant')})
nl = nl.expression('b==1?a:0',{'a':nl.select('avg_rad'),'b':ff.select('constant')})
Map.addLayer(ff.clip(district))
Map.addLayer(nl.clip(district))

function gitIm(district){
var i,i1,i2,x,ff;
i1 = getImageMax(district.geometry(),'2014','01','2020','12')
i2 = getImageMin(district.geometry(),'2014','01','2020','12')
var b='B7'
ff = i1.expression('1-(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
var nl = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
.filterBounds(district.geometry()).median().select('avg_rad');
ff = ff.expression('b>0.7&&a>1?1:0',{'a':nl.select('avg_rad'),'b':ff.select('constant')})
nl = nl.expression('b==1?a:0',{'a':nl.select('avg_rad'),'b':ff.select('constant')})
// Map.addLayer(ff.clip(district))
// Map.addLayer(nl.clip(district))
var ss;
var res = ee.Feature(null);
res = res.set('censuscode',district.get('censuscode'));
ss = nl.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: district.geometry(),
  scale: 30,
  maxPixels: 1e9
}).get('constant');
res = res.set('s_nl',ss);
  ss = nl.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: district.geometry(),
  scale: 30,
  maxPixels: 1e9
}).get('constant')
res = res.set('m_nl',ss);
ss = ff.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: district.geometry(),
  scale: 30,
  maxPixels: 1e9
}).get('constant');
res = res.set('s_bu',ss);
  ss = ff.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: district.geometry(),
  scale: 30,
  maxPixels: 1e9
}).get('constant')
res = res.set('m_bu',ss);
  return res;
}
// var k = 204
// for(var k = 203;k<=240;k++)
print(gitIm(fcD.first()))
// fcD = fcD.filter(ee.Filter.gt('censuscode',(k-1)*100))
// print(fcD.size())
// Export.table.toDrive(fcD.map(gitIm))
var fcD = ee.FeatureCollection('ft:17FoEu1aJZbmr4VxHXaSf7YrKqqkebJgFmFKY6wIL','geometry')
fcD = fcD.filter(ee.Filter.eq('ST_NM','Bihar'))
// var fc = ee.FeatureCollection('ft:1KPSrYXWjRuR1Vo2eEWFOHP6NoGyAOJObCkScteQo','geometry')
// fc = fc.filter(ee.Filter.inList('PKey',[301,1002,303,703,1803,905,1105,1806,2006,208,308,1808,2108,2208,2408,2508,2808,3308,909,111,411,112,512,812,912,1612,413,513,813,1013,1113,114,414,115,215,315,515,615,715,117,417,517,2020,2021,722,922,1022,1222,1322,1422,1722,1822,623,1523,1623,1723,1823,1923,2023,2123,2223,2323,2423,3023,3723,3823,4423,4723,4823,4923,5023,2624,127,227,327,427,527,627,727,827,927,1027,1227,1427,1527,1627,1727,1827,1927,2827,2927,3027,3227,3427,1028,1828,1928,2028,2128,2228,229,529,629,729,929,1629,2629,833,2533]))
// Map.addLayer(fc)
// print(fc)
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',11)), {color: 'deebf7'}, '11');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',14)), {color: '9ecae1'}, '14');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',13)), {color: '3182bd'}, '13');
// Map.addLayer(fcD.filter(ee.Filter.eq('censusEmp1',12)), {color: '3182fd'}, '12');