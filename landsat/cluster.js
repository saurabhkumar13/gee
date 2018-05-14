/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var nights = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
    multipoly = /* color: #0B4A8B */ee.Geometry.Polygon(
        [[[84.8458785851, 25.5840192917],
          [84.8458785851, 25.5391035275],
          [84.8818111965, 25.5391035275],
          [84.8818111965, 25.5840192917],
          [84.8458785851, 25.5840192917]],
         [[85.0075753362, 25.6558845145],
          [85.0075753362, 25.5391035275],
          [85.2770699215, 25.5391035275],
          [85.2770699215, 25.6558845145],
          [85.0075753362, 25.6558845145]],
         [[85.6813117993, 25.512154069],
          [85.6813117993, 25.4582551519],
          [85.7711433277, 25.4582551519],
          [85.7711433277, 25.512154069],
          [85.6813117993, 25.512154069]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var fcc = ee.FeatureCollection('ft:13YnFNSd-d1x6IRiirVUw8sPLZhtMRAjFTS7s1LTr','geometry')
// fcc=fcc.filter(ee.Filter.inList('ST_NM',['Bihar','Haryana','NCT of Delhi','Punjab','Uttar Pradesh']))
var bihar=fcc
function getImageMin(geom,y1,m1,y2,m2){
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
c1 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.min())
}

function getImageMax(geom,y1,m1,y2,m2){
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
c1 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.max())
}


function getAA(im,district,scale,prop){
  var ss = im.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: district.geometry(),
  scale: scale,
  maxPixels: 1e9
});
return (ss.get(prop))
}

function getFF(district){
var res = ee.Feature(null,{})
  var i,i1,i2,x,ff;
  i1 = getImageMax(district,'2010','01','2020','12')
  i2 = getImageMin(district,'2010','01','2020','12')
  var b='B7'
  x = i1.expression('1-(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
ff = x.expression('a>0.65?1:0',{'a':x.select('  constant')})
res = res.set('PK',district.get('PKey'))
res = res.set('name',district.get('DISTRICT'))
res = res.set('x',getAA(x,district,100,'constant'))
res = res.set('ff',getAA(ff,district,100,'constant'))
return res
}

// print(getFF(bihar.first()))
// Export.table.toDrive(bihar.map(getFF))
bihar = bihar.filter(ee.Filter.eq('DISTRICT','Aizawl'))
var night=nights.filterBounds(bihar).median().select('avg_rad')
night = night.expression('a/17',{'a':night.select('avg_rad')})
print(night.clip(bihar))
Map.addLayer(night.clip(bihar))
Export.image.toDrive(night.clip(bihar))

var multipoly = ee.Geometry.MultiPolygon([[[84.8458785851,25.5840192917],
[84.8458785851,25.5391035275],
[84.8818111965,25.5391035275],
[84.8818111965,25.5840192917],
[84.8458785851,25.5840192917]],
[[85.0075753362,25.6558845145],
[85.0075753362,25.5391035275],
[85.2770699215,25.5391035275],
[85.2770699215,25.6558845145],
[85.0075753362,25.6558845145]],
[[85.6813117993,25.512154069],
[85.6813117993,25.4582551519],
[85.7711433277,25.4582551519],
[85.7711433277,25.512154069],
[85.6813117993,25.512154069]]])

Map.addLayer(multipoly)