var bs = 7
var bands = ['B1','B2','B3','B4','B5','B6','B7']
var new_bands = ee.List(bands)
for(var i=0;i<bs;i++)
  new_bands = new_bands.add(bands[i]+'_1');
for(var i=0;i<bs;i++)
  new_bands = new_bands.add(bands[i]+'_2');
// for(var i=0;i<bs;i++)
  // new_bands = new_bands.add(bands[i]+'_2');
// print(new_bands)
// var bands = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9','B10', 'B11'];
// var new_bands = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9','B10', 'B11','B1_1','B2_1', 'B3_1', 'B4_1', 'B5_1', 'B6_1', 'B7_1', 'B8_1', 'B10_1', 'B11_1','B1_2','B2_2', 'B3_2', 'B4_2', 'B5_2', 'B6_2', 'B7_2', 'B8_2', 'B10_2', 'B11_2'];

var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
var bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.eq('Name','Bihar')).geometry();
var states = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.inList('Name',
['Bihar','Haryana','Punjab','Delhi','Uttar Pradesh'])).geometry();
var fc = ee.FeatureCollection('ft:1lQ5Big4I9v3hGYLlv9Ph1IeNKIKMUnP7OniblNdF','geometry')
var district = fc.filter(ee.Filter.eq('DISTRICT','Central'));//.merge(fc.filter(ee.Filter.eq('name','Patna')))
var districts = fc.filter(ee.Filter.inList('ST_NM',['Bihar','Haryana','Punjab','NCT of Delhi','Uttar Pradesh']));
// print(districts.size())


var india_image = ee.ImageCollection('LANDSAT/LT5_L1T_TOA')
.filterBounds(india).filterDate('2011-01-01','2011-12-01').filter(ee.Filter.lt('CLOUD_COVER',2))
india_image = addBands(india_image);
var new_bands_c = new_bands.add('class')
var ft_nbu = ee.FeatureCollection('ft:1bfq0xwToEzsp5HYrxKBDMnOL_Wxstlp1xsULkWNP').select(new_bands_c);
var ft_bu = ee.FeatureCollection('ft:1pQZaBxWLmng3rvneg8Zi0WK-_3L-BFPB_kNrtqSL').select(new_bands_c);

var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0');
// var ft_bu = ft.filter(ee.Filter.eq('class',1)).limit(2000);
// var ft_nbu = ft.filter(ee.Filter.eq('class',2)).limit(2000);
// ft = ft_bu.merge(ft_nbu);
// print(ft.size());
// print(ft_nbu.size());
function addBands(images){
  var min = images.min().select(bands)
  var max = images.max().select(bands)
  var mean = images.median().select(bands)
  mean = min.addBands(max).addBands(mean)
  return mean
  // return min.addBands(max)
  // return mean.addBands(min.expression('(a-b)/(a+b)',{'a':max.select(bands),'b':max.select(bands)}).rename(['B7_NDSV']))
}

// print(sampleRegionLandsat(ft.first()));
// Load a Landsat 8 image to be used for prediction.
var training = india_image.sampleRegions(ft,['class'],30);
// training = training.merge(ft_bu)
// training = training.merge(ft_nbu)
// print(training.size())
// print(training.limit(100))
// Export.
var validation = india_image.sampleRegions(ft.limit(100),['class'],30);
// print(training);
// var trained = ee.Classifier.cart().train(training, 'class', new_bands);
var trained = ee.Classifier.randomForest().train(training, 'class', new_bands);
// var trained = ee.Classifier.randomForest({numberOfTrees:10}).train(training, 'class', new_bands);
var validated = validation.classify(trained);
var accuracy = validated.errorMatrix('class','classification');
// Export.table.toDrive(accuracy)
// print(accuracy)
// var acc = ee.FeatureCollection([])
// Export.table.toDrive(accuracy);
// var arr = (ee.Array(accuracy.array()));
// print(training);
// print(trained.getInfo());

// var features = ee.FeatureCollection([
//   ee.Feature(null, {i: 1,val:arr}),
//   ee.Feature(null, {i: 2,val:accuracy.accuracy()})
// ]);
// print(features)
// Export.table.toDrive(features);
// input = input.clip(district);
function getImageMin(geom,y1,m1,y2,m2){
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
c1 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c1.min())
}

function getImageMax(geom,y1,m1,y2,m2){
var c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
c1 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c1.max())
}

function getBase(){
  var i,i1,i2,x,y='2014',ff;
  i1 = getImageMax(states,'2010','01','2020','12')
  i2 = getImageMin(states,'2010','01','2020','12')
  var b='B7'
  x = i1.expression('(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
  // Map.addLayer(x)
  x = x.expression('a>0.37?0:1',{'a':x.select(b)})
  return x
}
function getCImage(y,geom){
y= String(y)
// var sc = 500
var bihar_image = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').filterBounds(geom)
.filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',10))
print(bihar_image)
var input = bihar_image;
input = addBands(input).clip(geom);
input = input.classify(trained);
input = input.expression('LC==1?1:0',{'LC':input.select('classification')});
// print('mew')
return input
}

// print(input);
// print(ft.filterBounds(mfp).size())
// Export.image.toAsset(input,'bihar_nbu','bihar_nbu',100,bihar);
// var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence').gt(0);
// input2 = input2.expression('L>=-0.1 ? 1 : 0',{'L':input2.select('NDWI')});
// var xor = input.addBands(input2);
// xor = xor.expression('L==1 && W>0 ? 0 : L',{'L':xor.select('constant'),'W':xor.select('constant_1')});
// xor = input.addBands(gsw);
// xor = xor.expression('L==1 && W>0 ? 0 : L',{'L':xor.select('constant'),'W':xor.select('occurrence')});
// print(xor);
// Map.addLayer(xor.clip(district));
function getAA(y,district){
var d = 2
  var i1 = getCImage(y,district)
for(var i = -d; i<=d; i++){
  if(i===0) continue;
  var i2 = getCImage(y+i,district)
  i1 = i1.expression('a+b',{'a':i1.select('constant'),'b':i2.select('constant')})
}
var input = i1.expression('(a>d)?1:0',{'a':i1.select('constant'),'d':d})
var x = getBase()
input = input.expression('a>0&&b>0?1:0',{'a':input.select('constant'),'b':x.select('constant')})
var ss = input.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: district.geometry(),
  scale: 100,
  maxPixels: 1e9
});
Map.addLayer(input.clip(district))
// Export.image.toAsset(input)
return (ss.get('constant'))
}
var y = 2004
function getAAR(feat){
var res = ee.Feature(null,{})
for(y = 2002;y<=2008;y+=3)
  res = res.set(String(y),getAA(y,feat))
res = res.set('name',feat.get('name'))
return res
}
// Export.table.toDrive(districts.map(getAAR))
// print(getAAR(district))
var x = getBase()
var districts_d = fc.filter(ee.Filter.inList('ST_NM',['NCT of Delhi']));
district = districts_d
Map.addLayer(getCImage(2005,district).clip(district))
Map.addLayer(x.clip(district))
// Map.addLayer(input.clip(district));

//   var areaa = xor.multiply(ee.Image.pixelArea()).reduceRegion
//   (
//     {
//     'reducer': ee.Reducer.sum(),
//     'scale':30,
//     'geometry': district.geometry(),
//     'maxPixels': 1e9
//     }
//   )
// print(areaa.get('constant'));
// Map.addLayer(input2.clip(district));
// Map.addLayer(bihar_image.clip(district), {bands: ['B3', 'B2', 'B1'], max: 0.4}, 'landsat');
// Map.addLayer(district);
// Map.addLayer(bihar_image.clip(district));
// checkClass(ft.first());
// Export.image.toAsset({image:input,scale:30,region:district.geometry()});
