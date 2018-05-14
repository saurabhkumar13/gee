var fc = ee.FeatureCollection('ft:1fEggU3OzDPnb1obOO73dL82FXVrP7RrQLZ-fqed1','geometry')
var arawal = fc.filter(ee.Filter.eq('DIST_NAME','NALANDA'))
// print(arawal)
// Map.addLayer(arawal,{},'Munger')
var mfp = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
mfp = mfp.filter(ee.Filter.eq('name','Nalanda'))
Map.addLayer(mfp,{},'Munger')
print(mfp)
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence').clip(mfp);
var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['red', 'blue']
};
var VIS_WATER_MASK = {
  palette: ['white', 'black']
};
var water_mask = occurrence.gt(10).unmask(0).clip(mfp);
var input = ee.Image('users/saurabhkumar1311/nalanda_bu');
input = input.expression('LC==1?1:0',{'LC':input.select('constant')});
water_mask=input.clip(mfp);
print(water_mask)
Map.addLayer(water_mask,{},'water');

var calculateWaterArea = function(feature)
{
  var meanNdviPerState = water_mask.multiply(ee.Image.pixelArea()).reduceRegion
  (
    {
    'reducer': ee.Reducer.sum(),
    'scale':30,
    'geometry': feature.geometry(),
    'maxPixels': 1e9
    }
  )
  var oneStateWithNdvi = feature.set('ndvi',meanNdviPerState);
  return oneStateWithNdvi;
};

var statesWithNdvi = arawal.map(calculateWaterArea);
// print (statesWithNdvi)
// Export.table.toDrive(statesWithNdvi)