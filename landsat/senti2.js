/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var senti2 = ee.ImageCollection("COPERNICUS/S2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var states = ee.FeatureCollection('ft:1gJtsRZ8g8zfqezE_vJjp829_19CwIAjdf7B2QVdj','geometry');
var state = (ee.Feature)(states.filter(ee.Filter.eq('Name','Bihar')).first())
var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India'));
state = india
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
.filterDate(String(y)+'-01-01',String(y)+'-12-01').filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',0.1))
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
var i = (ee.ImageCollection)(getImagesSenti(state,2016))
var im = i.median()
var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0').limit(1);
var training = im.sampleRegions(ft,['class'],30);
var ft2 = ee.FeatureCollection('ft:12ToCX-dXQEwujxlZk_jR0Z5AjQjr2q3cGPGrlJxe');
training = training.merge(ft2)
// Export.table.toDrive(training)
print(training.size())
Map.addLayer(im.select(['B4','B3','B2']),{gain: '0.1, 0.1, 0.1', scale:20})
var bands = ['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B10','B11']
var trained = ee.Classifier.randomForest().train(training, 'class', bands);
var out = im.classify(trained);
out = out.expression('LC==1?1:0',{'LC':out.select('classification')});
Map.addLayer(out)

var b = 'B4'
var i1 = (i.select(b).min())
var i2 = (i.select(b).max())
var x = i1.expression('(a-b)/(a+b)',{'a':i2.select(b),'b':i1.select(b)}).clip(state)
// Map.addLayer(x)
x = x.expression('x<0.4?1:0',{'x':x.select(b)}).clip(state)
// Map.addLayer(x)
var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0');
var ft_bu = ft.filter(ee.Filter.eq('class',1)).filterBounds(state.geometry());
var ft_nbu = ft.filter(ee.Filter.eq('class',2)).filterBounds(state.geometry());
var training = x.sampleRegions(ft,['class'],30);
// var sums = training2
//   .reduceColumns({
//     reducer: ee.Reducer.sum(),
//     selectors: ['constant'],
// });
// print(ee.Number(sums.get('sum')).multiply(100).divide(training.size()));
// print(training)
// Export.table.toDrive(training)