var bs = 9
var bands = ee.List(['B1','B2','B3','B4','B5','B6','B7','B8','B9'])

var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
var bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.eq('Name','Bihar')).geometry();
var fc = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
var district = fc.filter(ee.Filter.eq('name','Patna'));//.merge(fc.filter(ee.Filter.eq('name','Patna')))
bihar=india
var india_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(bands)
.filterBounds(india).filterDate('2014-01-01','2014-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).median())
// india_image = addBands(india_image);
  Map.addLayer(india_image, {bands: ['B3', 'B2', 'B1'], max: 0.4}, 'i');
var bands_c = bands.add('class')
var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0');
var ft2 = ee.FeatureCollection('ft:1HABUR_nXX3oswF85QtZNamxckzUzGrcjPbpaZgUm');
// var ft_nbu = ee.FeatureCollection('ft:11w_QkE5HjUzUJxz3Bn1Lb6ZUcO2xmcTIezSQibc1').select(bands_c);
var ft_bu = ee.FeatureCollection('ft:1mPth-S8h3CTtCqDCK2ovuJZGe7tpPwKvkB-SiUZZ').select(bands_c);
var training = india_image.sampleRegions(ft.limit(1),['class'],30);
training = training.merge(ft2)
// training = training.merge(ft_bu) 
// training = training.merge(ft_nbu)
print(training.size())
function getImageMin(geom,y1,m1,y2,m2){
// var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
// .filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
// c1 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.min())
}

function getImageMax(geom,y1,m1,y2,m2){
// var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
// .filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
// c1 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.max())
}

// var trained = ee.Classifier.cart().train(training, 'class', new_bands);
var trained = ee.Classifier.randomForest().train(training, 'class', bands);
// var trained = ee.Classifier.randomForest({numberOfTrees:10}).train(training, 'class', new_bands);

function getCImage(y,geom){
y= String(y)
// var sc = 500
var bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').
filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).median())
var input = bihar_image.select(bands);
// input = addBands(input).clip(geom);
input = input.classify(trained);
input = input.expression('LC==1?1:0',{'LC':input.select('classification')});
return input
}

  var i,i1,i2,x,y='2014',ff;
  i1 = getImageMax(bihar,'2014','01','2020','12')
  i2 = getImageMin(bihar,'2014','01','2020','12')
  var b='B7'
  // print(i2)
  x = i1.expression('(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
  ff = getCImage(2014,bihar)
Map.addLayer(x.clip(bihar))
// Map.addLayer(ff.clip(bihar))
  ff = ff.expression('a>0&&b<0.35?1:0',{'a':ff.select('constant'),'b':x.select(b)})  
// Map.addLayer(x)
// Map.addLayer(ff.clip(bihar))
// Export.image.toAsset(getCImage(2014,bihar))
var vd = ft.filterBounds(bihar).filter(ee.Filter.eq('class',1))
var vdt = ff.sampleRegions(vd,[],30)
var sums = vdt
  .reduceColumns({
    reducer: ee.Reducer.sum(),
    selectors: ['constant'],
});
// print(ee.Number(sums.get('sum')).multiply(100).divide(vdt.size()));