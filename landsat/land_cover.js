var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];
var states = ee.FeatureCollection('ft:1xSlXU4pk2E99Ey3tOjDhJajjHhiUSiKk-qt7n_ze','geometry')
var bihar = states.filter(ee.Filter.eq('Id',4))
var fc = ee.FeatureCollection('ft:1fEggU3OzDPnb1obOO73dL82FXVrP7RrQLZ-fqed1','geometry')
var district = fc.filter(ee.Filter.eq('DIST_NAME','MUNGER'))
var mfp = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
mfp = mfp.filter(ee.Filter.eq('name','Nalanda'))
var roi=ee.Geometry.Point(85.43243408203125,25.22978942503438);
var roi2=ee.Geometry.Point(85.93243408203125,25.22978942503438);
var roi3=ee.Geometry.Point(85.43243408203125,24.82978942503438);
var landsat = ee.Image(ee.ImageCollection('LANDSAT/LC8_L1T_TOA')
  .filterDate('2011-06-01', '2013-08-30').filterBounds(roi)
  .sort('CLOUD_COVER').first());
var landsat2 = ee.Image(ee.ImageCollection('LANDSAT/LC8_L1T_TOA')
  .filterDate('2014-06-01', '2015-08-30').filterBounds(roi2)
  .sort('CLOUD_COVER').first());
var landsat3 = ee.Image(ee.ImageCollection('LANDSAT/LC8_L1T_TOA')
  .filterDate('2014-06-01', '2015-08-30').filterBounds(roi3)
  .sort('CLOUD_COVER').first());
var collection = ee.ImageCollection.fromImages([landsat,landsat2,landsat3])
landsat = collection.mosaic().clip(mfp)
    .reproject('EPSG:4326', null, 30);
print(landsat)
  // Map.addLayer(landsat);
var input = landsat.clip(mfp);
var vizParams = {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3};
//Map.addLayer(input, vizParams);

// Use MODIS land cover, IGBP classification, for training.
var modis = ee.Image('MODIS/051/MCD12Q1/2011_01_01')
    .select('Land_Cover_Type_1').clip(mfp);
// Sample the input imagery to get a FeatureCollection of training data.
var training = input.addBands(modis);
training = training.sample({
  region: mfp,
  numPixels: 5000,
  seed: 0
});

// print(training);

// Make a Random Forest classifier and train it.
var classifier = ee.Classifier.randomForest(10)
    .train(training, 'Land_Cover_Type_1');

// Classify the input imagery.
var classified = input.classify(classifier);
// Get a confusion matrix representing resubstitution accuracy.
var trainAccuracy = classifier.confusionMatrix();

// Sample the input with a different random seed to get validation data.
var validation = input.addBands(modis).sample({
  numPixels: 5000,
  seed: 1
  // Filter the result to get rid of any null pixels.
}).filter(ee.Filter.neq('B1', null));

// Classify the validation data.
var validated = validation.classify(classifier);

// Get a confusion matrix representing expected accuracy.
var testAccuracy = validated.errorMatrix('Land_Cover_Type_1', 'classification');

// Define a palette for the IGBP classification.
var igbpPalette = [
  'aec3ff', // water
  '152106', '225129', '369b47', '30eb5b', '387242', // forest
  '6a2325', 'c3aa69', 'b76031', 'd9903d', '91af40',  // shrub, grass
  'aa1149', // wetlands
  'cdb3ff', // croplands
  'cc0013', // urban
  '33280d', // crop mosaic
  'd7cdcc', // snow and ice
  'f7e084', // barren
  '6f6f6f'  // tundra
];
// print(modis)
// Display the input and the classification.
//Map.centerObject(mfp, 10);
Map.addLayer(input, {bands: ['B3', 'B2', 'B1'], max: 0.4}, 'landsat');
Map.addLayer(classified, {palette: igbpPalette, min: 0, max: 17}, 'classification');
Map.addLayer(modis, {palette: igbpPalette, min: 0, max: 17}, 'training');

function silenceBand(img,band,region){
  return img.expression('LC=='+band+'?1:0',{'LC':img.select('classification')}).clip(region)
}

function getArea(img){
var stats = img.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:mfp,
  scale:30,
  maxPixels:1e9}
)
return stats.get('constant')
}
function areas(feature){
  return getArea(silenceBand(classified,12,feature))
}
// print(district)
var list = district.toList(district.size(),0)
var croplands = []
var i=0,s=list.size()
// print(s)
// for(;i<10;i++){
  // print(getArea(silenceBand(classified,12,list.get(i))))
// }
// print(croplands)
// Export.image.toAsset({
//   image: classified,
//   description: 'nalanda',
//   assetId: 'nalanda  ',
//   scale: 30,
//   region: mfp
// });
// print(getArea(silenceBand(classified,13,mfp.first())))
