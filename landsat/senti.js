/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var senti = ee.ImageCollection("COPERNICUS/S1_GRD"),
    senti2 = ee.ImageCollection("COPERNICUS/S2"),
    senti3 = ee.ImageCollection("COPERNICUS/S3/OLCI");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var states = ee.FeatureCollection('ft:1gJtsRZ8g8zfqezE_vJjp829_19CwIAjdf7B2QVdj','geometry');
var state = (ee.Feature)(states.filter(ee.Filter.eq('Name','Haryana')).first())
var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India'));
// state = india
// print(state.geometry())
// Map.addLayer(states)

function getImages(ft,y){
var geom = ft.geometry()
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA')
.filterBounds(geom).filterDate(String(y-5)+'-01-01',String(y+5)+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(geom).filterDate(String(y-5)+'-01-01',String(y+5)+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2))
c2 = c2.merge(c1)
return  (c2)
}

function getImageSenti(ft,y){
var geom = ft.geometry()
var c2 = senti2.filterBounds(geom).filterDate(String(y)+'-01-01',String(y)+'-12-01').size()
return  (c2)
}

function getImagesSenti(ft,y){
var geom = ft.geometry()
var c2 = senti2.filterBounds(geom)
.filterDate(String(y-5)+'-01-01',String(y+5)+'-12-01').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',0.1))
return  (c2)
}

function getNumbers(ft){
var ftc = ee.Feature(null)
ftc.set('name',ft.get('name'))
for(var y=2014;y<=2018;y++)
  ftc = ftc.set(String(y),getImageSenti(ft,y))
return ftc
}
// print(getNumbers(state))
// Export.table.toDrive(states.map(getNumbers))
var i = (ee.ImageCollection)(getImages(state,2020))
// print(i.size())
var b = 'B7'
var i1 = (i.select(b).min())
var i2 = (i.select(b).max())
var x = i1.expression('(a-b)/(a+b)',{'a':i2.select(b),'b':i1.select(b)})
Map.addLayer(x.clip(state))
x = x.expression('x<0.35?1:-1',{'x':x.select(b)})
var base = x.expression('1')
Map.addLayer(x.clip(state))
var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0');
var ft_bu = ft.filter(ee.Filter.eq('class',1));
var training = x.sampleRegions(ft_bu,[],30);
var training_base = base.sampleRegions(ft_bu,[],30);
var sums = training
  .reduceColumns({
    reducer: ee.Reducer.sum(),
    selectors: ['constant'],
});
var sums2 = training_base
  .reduceColumns({
    reducer: ee.Reducer.sum(),
    selectors: ['constant'],
});
print(training.first())
print(sums)
print(sums2)
print(ee.Number(sums.get('sum')).multiply(100).divide(ee.Number(sums2.get('sum'))));