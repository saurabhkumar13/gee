var bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.eq('Name','Bihar')).geometry();
var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
var band = 'B7', y = '2010', y2 = '2008'
var fc = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
var district = fc.filter(ee.Filter.eq('name','Patna'));//.merge(fc.filter(ee.Filter.eq('name','Patna')))
var gaya = fc.filter(ee.Filter.eq('name','Gaya'));//.merge(fc.filter(ee.Filter.eq('name','Patna')))

var biharDistrictList=
[
"Arwal",
"Araria",
"AurangabadBihar",
"Banka",
"Begusarai",
"Bhagalpur",
"Bhojpur",
"Buxar",
"Darbhanga",
"Gaya",
"Gopalganj",
"Jamui",
"Jehanabad",
"Kaimur",
"Katihar",
"Khagaria",
"Kishanganj",
"Lakhisarai",
"Madhepura",
"Madhubani",
"Munger",
"Muzaffarpur",
"Nalanda",
"Nawada",
"Pashchim Champaran",
"Patna",
"Purba Champaran",
"Purnia",
"Rohtas",
"Saharsa",
"Samastipur",
"Saran",
"Sheikhpura",
"Sheohar",
"Sitamarhi",
"Siwan",
"Supaul",
"Vaishali"  ];

var districtBihar=fc.filter(ee.Filter.inList('name',biharDistrictList));

var bihar_image = ee.ImageCollection('LANDSAT/LT5_L1T_TOA')
.filterBounds(india).filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2))
var bihar_image2 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA')
.filterBounds(india).filterDate(y2+'-01-01',y2+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',10))
var ge=india
var im_min = bihar_image.select(band).min()
var im_max = bihar_image.select(band).max()
var im = im_min.expression('(b-a)',{'a':im_min.select(band),'b':im_max.select(band)});
var im_min2 = bihar_image2.select(band).min()
var im_max2 = bihar_image2.select(band).max()
var im2 = im_min2.expression('(b-a)',{'a':im_min2.select(band),'b':im_max2.select(band)});
var im_bu = im.expression('(a<0.1)?1:0',{'a':im.select(band)});
var im_bu2 = im2.expression('(a<0.1)?1:0',{'a':im2.select(band)});

// Map.addLayer(im_min.clip(ge)
// Map.addLayer(im_max.clip(ge))
// Map.addLayer(im_bu2.clip(ge))
// Map.addLayer(im_bu.clip(ge))

function getCImage(y,geom,b){
var y1 = String(y-1),y2 = String(y+1)
y= String(y)
var bihar_image = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').
filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',10))
var im_min = bihar_image.select(band).min()
var im_max = bihar_image.select(band).max()
var im = im_min.expression('(b-a)/(b+a)',{'a':im_min.select(band),'b':im_max.select(band)});
var im_bu = im.expression('(a<b)?1:0',{'a':im.select(band),'b':b});
return im_bu
}

function getAA(y,district,b){
var d = 3
  var i1 = getCImage(y,district,b)
for(var i = -d; i<=d; i++){
  if(i===0) i++;
  var i2 = getCImage(y+i,district,b)
  i1 = i1.expression('a+b',{'a':i1.select('constant'),'b':i2.select('constant')})
}
var input = i1.expression('(a>4)?1:0',{'a':i1.select('constant')})
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
// var y=2005
// getAA(y,district,0.3)
function getFF(district){
var res = ee.Feature(null,{})
for(var y=1990;y<2009;y+=4)
  res = res.set(String(y),getAA(y,district,0.28))
res = res.set('name',district.get('name'))
return res
}
print(getFF(district))
// print(getFF(gaya))
// Export.table.toDrive(districtBihar.map(getFF))
