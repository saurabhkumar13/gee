/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #00ff00 */ee.Geometry.Polygon(
        [[[85.3857421875, 25.341047318966705],
          [85.6219482421875, 26.762287724188816],
          [84.583740234375, 26.95830802391083],
          [84.8309326171875, 27.44199047720987],
          [83.7872314453125, 27.515092154429464],
          [83.95751953125, 26.943618291193427],
          [84.4354248046875, 26.688692675996965],
          [84.2047119140625, 25.60883739904981],
          [85.2923583984375, 25.316221781745735]]]),
    geometry2 = /* color: #0000ff */ee.Geometry.Polygon(
        [[[85.62744140625, 26.796615781313676],
          [85.3857421875, 25.33608258854442],
          [86.8853759765625, 25.20692917169016],
          [87.20947265625, 26.718136406537685]]]),
    geometry3 = /* color: #999900 */ee.Geometry.Polygon(
        [[[86.8798828125, 25.20692924752756],
          [88.1103515625, 25.092563777335396],
          [88.13232421875, 25.984712215628115],
          [87.07763671875, 26.167271026931843]]]),
    geometry4 = /* color: #009999 */ee.Geometry.MultiPolygon(
        [[[[88.2861328125, 25.9550812901446],
           [88.3685302734375, 26.605227550064114],
           [87.1820068359375, 26.57575468623244],
           [87.0831298828125, 26.167271026931843]]],
         [[[85.6768798828125, 26.90933480388987],
           [84.671630859375, 27.13932369361311],
           [84.57275390625, 26.953411659112152],
           [85.6109619140625, 26.7475725230264],
           [85.6494140625, 26.826031565340912]]],
         [[[84.17724609375, 26.772096799626873],
           [83.671875, 26.561015334269094],
           [84.26513671875, 25.87602895412367],
           [84.44091796875, 26.678876408142084]]]]),
    geometry5 = /* color: #ff00ff */ee.Geometry.Polygon(
        [[[87.4072265625, 25.14727363995497],
          [85.374755859375, 25.34601180779105],
          [85.264892578125, 25.30629019466907],
          [84.17724609375, 25.613790882070973],
          [84.210205078125, 25.75240389317348],
          [83.2159423828125, 25.112461082434457],
          [83.64990234375, 24.30905575882361],
          [85.572509765625, 24.27901542121759],
          [86.912841796875, 24.30905575882361]]]),
    night = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry');//.filter(ee.Filter.eq('Name','Gujarat')).geometry();
var fc = ee.FeatureCollection('ft:1calNPrkdt2BXLINO7389l-3PWouwenAuwvylKi4y','geometry')
fc = ee.FeatureCollection('ft:13YnFNSd-d1x6IRiirVUw8sPLZhtMRAjFTS7s1LTr','geometry')
fc=fc.filter(ee.Filter.inList('ST_NM',['Chhattisgarh']))
// 16ln9k64V3OOBHocn1LySXnYN6LwfMy8zII-CwFkw
print(fc.size())
// bihar = fc
function getImageMin(geom,y1,m1,y2,m2){
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',10))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',10))
c2 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.min())
}

function getImageMax(geom,y1,m1,y2,m2){
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',10))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',10))
c2 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.max())
}

var i,i1,i2,x,ff;
i1 = getImageMax(bihar,'2014','01','2020','12')
i2 = getImageMin(bihar,'2014','01','2020','12')
var b='B7'
x = i1.expression('1-(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
// var x1,x2,x3,x4,x5,x6;
// x1 = x.expression('a>0.7?1:0',{'a':x.select('constant')}).clip(geometry);
// x2 = x.expression('a>0.65?1:0',{'a':x.select('constant')}).clip(geometry2);
// x3 = x.expression('a>0.6?1:0',{'a':x.select('constant')}).clip(geometry3);
// x4 = x.expression('a>0.75?1:0',{'a':x.select('constant')}).clip(geometry4);
// x5 = x.expression('a>0.7?1:0',{'a':x.select('constant')}).clip(geometry5);
// var coll = ee.ImageCollection([x1,x2,x3,x4,x5]).mosaic()
// ff = x
ff = x.expression('a>0.7?a:0',{'a':x.select('constant')});
var nl = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
.filterBounds(bihar).median().select('avg_rad');
ff = ff.expression('b>0&&a>0.5?1:0',{'a':nl.select('avg_rad'),'b':ff.select('constant')})
// nl = nl.expression('b==1?a:0',{'a':nl.select('avg_rad'),'b':ff.select('constant')})
// fc = fc.filter(ee.Filter.eq('V_CODE2011',260021))
// fc = fc.filter(ee.Filter.eq('V_CODfE2011',259276))
// fc = fc.filter(ee.Filter.eq('V_CODE2011',259256))
// fc = fc.filter(ee.Filter.eq('V_CODE2011',228145))
// fc = fc.filter(ee.Filter.eq('V_CODE2011',245296))
Map.addLayer(nl)
// Map.addLayer(ff.clip(fc))
// var coor = ee.List(ee.List(fc.geometry().coordinates().get(0)).get(0))
// Map.setCenter(coor.get(0).getInfo(),coor.get(1).getInfo(),16)
function gitIm(district){
var i,i1,i2,x,ff,bihar = district.geometry();
i1 = getImageMax(bihar,'2014','01','2020','12')
i2 = getImageMin(bihar,'2014','01','2020','12')
var b='B7'
x = i1.expression('1-(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
ff = x.expression('a>0.7?a:0',{'a':x.select('constant')});
var nl = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
.filterBounds(bihar).median().select('avg_rad');
ff = ff.expression('b>0&&a>0.5?1:0',{'a':nl.select('avg_rad'),'b':ff.select('constant')})
nl = nl.expression('b==1?a:0',{'a':nl.select('avg_rad'),'b':ff.select('constant')})
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
// print(gitIm(fc.first()))
// Export.table.toDrive(fc.map(gitIm))
// Map.addLayer(x.clip(bihar))
// Map.addLayer(ff.clip(geometry2))
// print(fc.filterBounds(geometry2).size())
var fcc = ee.FeatureCollection('ft:1D2B6c7sO6sao2xXYVM5PgUeO7tY5UUivsx9pWkrq','geometry')
Map.addLayer(fcc.filter(ee.Filter.eq('label',1)))
Map.addLayer(fcc.filter(ee.Filter.eq('label',2)))
