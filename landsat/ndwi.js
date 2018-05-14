var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
var bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.eq('Name','Bihar')).geometry();
var fc = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
var district = fc.filter(ee.Filter.eq('name','Nalanda'))
var india_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(india).filterDate('2014-02-01','2014-09-01')
.sort('CLOUD_COVER').limit(500).mosaic();
var bihar_image = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(district).filterDate('2014-02-01','2014-04-01')
.sort('CLOUD_COVER').limit(4).mosaic();
var input = bihar_image;

var image = input.clip(district)
// Create an NDWI image, define visualization parameters and display.
var ndwi = image.normalizedDifference(['B3', 'B5']);
var ndwiViz = {min: -.1, max: .1, palette: ['000000', 'FFFFFF']};
print(ndwi);
Map.addLayer(ndwi);
Map.addLayer(ndwi,ndwiViz);
//Map.addLayer(image);

var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
var water_mask = occurrence.gt(10).unmask(0).clip(district);
Map.addLayer(water_mask,{},'water',false);
