var bands = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B10', 'B11'];

var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
var bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.eq('Name','Bihar')).geometry();
var fc = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
var district = fc.filter(ee.Filter.eq('name','Nalanda'));//.merge(fc.filter(ee.Filter.eq('name','Patna')))
var india_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(india).filterDate('2014-02-01','2014-09-01')
.sort('CLOUD_COVER').limit(500).mosaic();
var bihar_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(district).filterDate('2014-02-01','2014-04-01')
.sort('CLOUD_COVER').limit(4).mosaic();
var input = bihar_image;
// print(input)
input = addBands(input.select(bands));
// Map.addLayer(input);

india_image = addBands(india_image);


var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0');
// var ft2 = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0').limit(2000);
var ft_bu = ft.filter(ee.Filter.eq('class',1)).limit(1200);
var ft_nbu = ft.filter(ee.Filter.eq('class',2)).limit(1800);
ft = ft_bu.merge(ft_nbu);
// print(ft.size());
// print(ft_nbu.size());
var new_bands = ['B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B10', 'B11','NDBI','NDVI'];
function addBands(image){
  var ndvi = image.normalizedDifference(['B4', 'B3']).rename('NDVI');
  var ndbi = image.normalizedDifference(['B5', 'B4']).rename('NDBI');
  var ndwi = image.normalizedDifference(['B6', 'B6']).rename('NDWI');
  return image.addBands(ndvi).addBands(ndbi).addBands(ndwi);
}

// print(sampleRegionLandsat(ft.first()));
// Load a Landsat 8 image to be used for prediction.
var training = india_image.sampleRegions(ft,['class'],30);
// Export.
var validation = india_image.sampleRegions(ft.limit(1000),['class'],30);
// print(training);
var trained = ee.Classifier.cart().train(training, 'class', new_bands);
// var trained = ee.Classifier.randomForest().train(training, 'class', new_bands);
// var trained = ee.Classifier.randomForest({numberOfTrees:10}).train(training, 'class', new_bands);
var validated = validation.classify(trained);
var accuracy = validated.errorMatrix('class','classification');
// var acc = ee.FeatureCollection([])
// Export.table.toDrive(accuracy);
var arr = (ee.Array(accuracy.array()));
// print(training);
// print(trained.getInfo());

// var features = ee.FeatureCollection([
//   ee.Feature(null, {i: 1,val:arr}),
//   ee.Feature(null, {i: 2,val:accuracy.accuracy()})
// ]);
// print(features)
// Export.table.toDrive(features);
input = input.clip(district);
var input2 = input;
input = input.classify(trained);
print(input);
// print(ft.filterBounds(mfp).size())
input = input.expression('LC==1?1:0',{'LC':input.select('classification')});
// Export.image.toAsset(input,'bihar_nbu','bihar_nbu',30,bihar);
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence').gt(0);
var xor = input.addBands(gsw);
xor = ee.Image('users/saurabhkumar1311/nlxx16')
print(xor)
xor = xor.expression('L>0? 1 : 0',{'L':xor.select('constant')});
Map.addLayer(xor.clip(district));
// Create 1000 random points in the region.
var randomPoints = ee.FeatureCollection.randomPoints(district,54,193);
// Display the points.
Map.centerObject(randomPoints);
Map.addLayer(randomPoints, {}, 'random points');

// var n = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG').filterDate('2016-01-01','2016-06-01').select('cf_cvg').mosaic()
// n = n.expression('L>8? 1 : 0',{'L':n.select('cf_cvg')});

// Map.addLayer(n.clip(district))
// print(n)
