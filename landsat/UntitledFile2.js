/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var nights = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var bs = 9
var bands = ee.List(['B1','B2','B3','B4','B5','B6','B7','B8','B9'])
var nights = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
var bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.eq('Name','Bihar')).geometry();
var fcc = ee.FeatureCollection('ft:13YnFNSd-d1x6IRiirVUw8sPLZhtMRAjFTS7s1LTr','geometry')
// fcc=fcc.filter(ee.Filter.inList('ST_NM',['Bihar']))//,'Haryana','NCT of Delhi','Punjab','Uttar Pradesh']))
var fc = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
var district = fc.filter(ee.Filter.eq('name','Patna'));//.merge(fc.filter(ee.Filter.eq('name','Patna')))
bihar=india

var india_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(bands)
.filterBounds(india).filterDate('2014-01-01','2014-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).median())
// india_image = addBands(india_image);
  // Map.addLayer(india_image, {bands: ['B3', 'B2', 'B1'], max: 0.4}, 'i');
var bands_c = bands.add('class')
// var ft_nbu = ee.FeatureCollection('ft:11w_QkE5HjUzUJxz3Bn1Lb6ZUcO2xmcTIezSQibc1').select(bands_c)
// .limit(50000);
// var ft_bu = ee.FeatureCollection('ft:13pHXFjug3k2uVQYwVbGqzx1QrthG9PS7VYzL52dL').select(bands_c)
// .limit(60000);
var ftt = ee.FeatureCollection('ft:1HABUR_nXX3oswF85QtZNamxckzUzGrcjPbpaZgUm').select(bands_c)
var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0').limit(1);
var training = india_image.sampleRegions(ft,['class'],30);
// training = training.merge(ft_bu)
// training = training.merge(ft_nbu)
training = training.merge(ftt)
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
var c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7'])
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
// c1 = (ee.ImageCollection)(c1.merge(c2))
return  (ee.Image)(c2.max())
}

// var trained = ee.Classifier.cart().train(training, 'class', bands);
var trained = ee.Classifier.randomForest().train(training, 'class', bands);
// var trained = ee.Classifier.randomForest({numberOfTrees:10}).train(training, 'class', new_bands);
// print(trained)
  var i,i1,i2,x,ff;
  i1 = getImageMax(bihar,'2010','01','2020','12')
  i2 = getImageMin(bihar,'2010','01','2020','12')
  var b='B7'
  x = i1.expression('(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
var y = '2014'
var bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(india)
.filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).median())
function numImages(y,district){
  return ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds((ee.Feature)(district).geometry())
.filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).size()
}
function getCinput(y,geom){
  y = String(y)
  var bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(geom)
.filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).median())
return bihar_image.select(bands);
}
function getCinput1(y,geom){
  y = String(y)
  var bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(geom)
.filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',3)).median())
return bihar_image.select(bands);
}
function getCinput2(y,geom){
  y = String(y)
  var bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(geom)
.filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2.5)).median())
return bihar_image.select(bands);
}
function getCImage(input){
input = input.classify(trained);
input = input.expression('LC==1?1:0',{'LC':input.select('classification')});
ff = input
ff = ff.expression('a>0&&b<0.35?1:0',{'a':ff.select('constant'),'b':x.select(b)})  
return ff
}
function getFImage(y,geom){
var  ff11 = getCImage(getCinput(y,geom))
var  ff12 = getCImage(getCinput1(y,geom))
var  ff13 = getCImage(getCinput2(y,geom))
ff11 = ff11.expression('a+b+c>2?1:0',{'a':ff11.select('constant'),'b':ff12.select('constant'),'c':ff13.select('constant')})
return ff11
}
nights = nights.filterBounds(india)
var fn1 = nights.filterDate('2014-01-01','2014-12-01').median()
var fn2 = nights.filterDate('2015-01-01','2015-12-01').median()
var fn3 = nights.filterDate('2016-01-01','2016-12-01').median()
var fn4 = nights.filterDate('2017-01-01','2017-12-01').median()
// fn1 = fn1.expression('a>10?1:0',{'a':fn1.select('avg_rad')})
function getAA(im,district,scale,prop){
  var ss = im.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: district.geometry(),
  scale: scale,
  maxPixels: 1e9
});
return (ss.get(prop))
}
function getAM(im,district,scale,prop){
  var ss = im.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: district.geometry(),
  scale: scale,
  maxPixels: 1e9
});
return (ss.get(prop))
}

function getFF(district){
var res = ee.Feature(null,{})
res = res.set('censuscode',district.get('censuscode'))
res = res.set('name',district.get('DISTRICT'))
// for(var yy=2014;yy<2018;yy++) res = res.set('num'+String(yy),numImages(yy,district));
// // res = res.set('num',numImages(yy,district))
var india = district.geometry()
var  ff1 = getFImage(2014,india)
var  ff2 = getFImage(2015,india)
var  ff3 = getFImage(2016,india)
var  ff4 = getFImage(2017,india)
ff1 = ff1.expression('a>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
ff2 = ff2.expression('b>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
ff3 = ff3.expression('c>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
ff4 = ff4.expression('d>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
// res = res.set('b2014',getAA(ff1,district,100,'constant'))
res = res.set('bs2015',getAA(ff2,district,100,'constant'))
res = res.set('bm2015',getAM(ff2,district,100,'constant'))
var fnn = ff2.expression('a>0?b:0',{'a':ff2.select('constant'),'b':fn2.select('avg_rad')})
res = res.set('ns2015',getAA(fnn,district,100,'constant'))
res = res.set('nm2015',getAM(fnn,district,100,'constant'))
// res = res.set('b2016',getAA(ff3,district,100,'constant'))
// res = res.set('b2017',getAA(ff4,district,100,'constant'))
// res = res.set('n2014',getAA(fn1,district,500,'avg_rad'))
res = res.set('n2015',getAA(fn2,district,500,'avg_rad'))
// res = res.set('n2016',getAA(fn3,district,500,'avg_rad'))
// res = res.set('n2017',getAA(fn4,district,500,'avg_rad'))
return res
}
// var  ff1 = getFImage(2014,india)
// var  ff2 = getFImage(2015,india)
// var  ff3 = getFImage(2016,india)
// var  ff4 = getFImage(2017,india)
// ff1 = ff1.expression('a>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
// ff2 = ff2.expression('b>0&&a+b+c+d>2?1.0:0.0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
// ff3 = ff3.expression('c>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
// ff4 = ff4.expression('d>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
// var fnn = ff2.expression('a>0?double(b):0',{'a':ff2.select('constant'),'b':fn2.select('avg_rad')})
// Map.addLayer(ff2.clip(india))
// ff2 = ff2.addBands(fnn)
// ff2 = ff2.clip(india)
// Export.image.toDrive({image:ff2,scale:30,maxPixels:5989216896})
// print(ff2.clip(india))
print(getFF(fcc.first()))
Export.table.toDrive(fcc.map(getFF))
// Map.addLayer(ff1.clip(india))
// Map.addLayer(ff2.clip(india))
// Map.addLayer(ff3.clip(india))
// Map.addLayer(ff4.clip(india))
// Export.image.toAsset(getCImage(2014,bihar))
// var ft_bu = ft.filter(ee.Filter.eq('class',1));
// var mew = x_nbu.sampleRegions(ft_bu)
// var rp = ff.stratifiedSample({numPoints:0,classBand:'constant',region:india,scale:30,classValues:[1],classPoints:[100000]});
// Export.table.toDrive(rp)
// Export.table.toDrive(mew)
