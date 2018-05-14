/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var nl_geo = /* color: #98ff00 */ee.Geometry.MultiPolygon(
        [[[[84.3255615234375, 26.249576247207134],
           [84.3255615234375, 26.19537005652582],
           [84.3914794921875, 26.210156067869253],
           [84.3914794921875, 26.269281323976593]]],
         [[[84.979248046875, 25.656877665886803],
           [85.0396728515625, 25.50328082531428],
           [85.330810546875, 25.547893755672366],
           [85.25390625, 25.765762091710975]]],
         [[[85.4132080078125, 26.185511672564633],
           [85.3363037109375, 26.185511672564633],
           [85.352783203125, 26.06221155960027],
           [85.4461669921875, 26.07208035505037]]],
         [[[85.4791259765625, 25.23525584883012],
           [85.49560546875, 25.150754827898144],
           [85.550537109375, 25.1805854110396],
           [85.53955078125, 25.260097926073286]]],
         [[[85.95703125, 25.50328082531428],
           [85.946044921875, 25.42392803030057],
           [86.1822509765625, 25.374305979765467],
           [86.19873046875, 25.433849990912854]]],
         [[[86.4129638671875, 25.409043557943722],
           [86.4898681640625, 25.255129917003003],
           [86.5667724609375, 25.28493492213516],
           [86.4898681640625, 25.433849990912854]]],
         [[[87.418212890625, 25.80533170376432],
           [87.4566650390625, 25.731127856711897],
           [87.5445556640625, 25.765762091710975],
           [87.5006103515625, 25.81522204337537]]],
         [[[87.528076171875, 25.56276104494853],
           [87.550048828125, 25.4983228093645],
           [87.5994873046875, 25.5181536450822],
           [87.5830078125, 25.572671546156723]]],
         [[[84.32281494140625, 24.772021956777017],
           [84.385986328125, 24.714650220937312],
           [84.4189453125, 24.749575300356433],
           [84.35302734375, 24.801944520023348]]],
         [[[84.14154052734375, 24.911598769031922],
           [84.232177734375, 24.856783797167694],
           [84.2486572265625, 24.906616595158173],
           [84.16351318359375, 24.95144891450064]]],
         [[[83.97674560546875, 24.96389944187843],
           [84.02618408203125, 24.931525452275793],
           [84.05364990234375, 24.948958657936565],
           [84.00146484375, 24.983817665921364]]],
         [[[84.95452880859375, 25.22506888664452],
           [84.98199462890625, 25.187793130877978],
           [85.02044677734375, 25.200219651057267],
           [85.00396728515625, 25.247428858745682]]],
         [[[84.9407958984375, 24.819396014953963],
           [84.94354248046875, 24.6647402509302],
           [84.98748779296875, 24.6647402509302],
           [85.03692626953125, 24.841830039455534]]],
         [[[85.50933837890625, 24.894160280437028],
           [85.53131103515625, 24.86425999813699],
           [85.5615234375, 24.884194323723342],
           [85.53955078125, 24.911598769031922]]],
         [[[85.4022216796875, 25.026133178435757],
           [85.42144775390625, 24.99377556832142],
           [85.4681396484375, 25.026133178435757],
           [85.4461669921875, 25.051017844323805]]],
         [[[87.23968505859375, 25.299586122520026],
           [87.2149658203125, 25.210159954186583],
           [87.27813720703125, 25.197734448455293]]],
         [[[87.275390625, 25.202704802935042],
           [87.308349609375, 25.28468633481382],
           [87.24517822265625, 25.294619730057164]]],
         [[[86.89361572265625, 25.25736530365554],
           [86.956787109375, 25.205189904084925],
           [87.0391845703125, 25.215129801333156],
           [87.0391845703125, 25.28220285887463]]],
         [[[85.7373046875, 25.871828092321422],
           [85.748291015625, 25.83475279639566],
           [85.83343505859375, 25.83722484441013],
           [85.82244873046875, 25.89900925110608]]],
         [[[83.946533203125, 25.557557461559803],
           [83.9849853515625, 25.54268952667119],
           [84.00970458984375, 25.58233325316597],
           [83.9739990234375, 25.592242134185412]]],
         [[[84.82269287109375, 25.560035271375913],
           [84.88037109375, 25.55260168820017],
           [84.8968505859375, 25.604627081325397]]],
         [[[85.8526611328125, 26.197587837263644],
           [85.88287353515625, 26.09156854175779],
           [85.93231201171875, 26.096501806123374],
           [85.9405517578125, 26.20251662248162]]],
         [[[85.92681884765625, 25.391427650313837],
           [85.94329833984375, 25.35420300370326],
           [86.0009765625, 25.376539168073258]]],
         [[[86.06964111328125, 25.187793130877978],
           [86.0833740234375, 25.152992131930183],
           [86.11358642578125, 25.17536534304835],
           [86.1163330078125, 25.200219651057267]]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
var bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.eq('Name','Bihar')).geometry();
var geom=[
  ee.Geometry.Point([87.550048828125,26.053575380343982]),
  ee.Geometry.Point([84.837060546875,25.00312889293048]),
  ee.Geometry.Point([85.837060546875,25.00312889293048]),
  ee.Geometry.Point([82.837060546875,25.00312889293048]),
  ee.Geometry.Point([85.837060546875,28.00312889293048]),
  ee.Geometry.Point([84.037060546875,28.00312889293048]),
  ee.Geometry.Point([84.837060546875,26.00312889293048]),
  ee.Geometry.Point([86.837060546875,26.00312889293048]),
  ee.Geometry.Point([86.837060546875,25.00312889293048])
];
function getImages(l,y1,m1,y2,m2){
  var c = l.length;
  var li = [];
  for(var i=0;i<c;i++){
    li.push(getImage(l[i],y1,m1,y2,m2))
  }
  return (ee.Image)(ee.ImageCollection(li).mosaic());
}
function getImage(geom,y1,m1,y2,m2){
return (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').sort('CLOUD_COVER').first());
}
function nextY(y){return (parseInt(y)+1)+'';}
function addB(x,i1,i2,b){
  return x.select('B1').add(i1.select(b).subtract(i2.select(b)).divide(i1.select(b).add(i2.select(b))).divide(12))
}
function addNDSVBands(image){
  var ndvi = image.normalizedDifference(['B4', 'B3']).rename('NDVI');
  var ndbi = image.normalizedDifference(['B5', 'B4']).rename('NDBI');
  var ndwi = image.normalizedDifference(['B3', 'B6']).rename('NDWI');
  return image.addBands(ndvi).addBands(ndbi).addBands(ndwi);
}
  // var m1=['01','02','04'],m2=['12','04','12'],year='2004';
function getNBUimage(year,geometry){
  var i1,i2,x,y=year;
  i1 = getImages(geom,y,'05',y,'08')
  i2 = getImages(geom,y,'01',y,'04')
  i1=addNDSVBands(i1);
  var b='B3'
  x = i1.select(b).subtract(i2.select(b)).divide(i1.select(b).add(i2.select(b)))//.divide(12)
  x=x.rename(['change'])
  x = x.expression(
    '(b>0.15||b<0.01)?1:0', {
      'b': x.select('change')
  });
  x = x.addBands(i1.select('NDBI'))
  x = x.expression(
    '(b>0||(ndbi>0.4||ndbi<0.01))?1:0', {
      'b': x.select('constant'),
      'ndbi': x.select('NDBI')
  });
  x=x.clip(geometry)
  return x
}
function getNBUpoints(year,geometry,num){
  var i1,i2,x,y=year,ff;
  i1 = getImages(geom,y,'05',y,'08')
  i2 = getImages(geom,y,'01',y,'04')
  ff = i1;
  ff = ff.addBands(i2);
  i1=addNDSVBands(i1);
  var b='B3'
  x = i1.select(b).subtract(i2.select(b)).divide(i1.select(b).add(i2.select(b)))//.divide(12)
  x=x.rename(['change'])
  ff=ff.addBands(x)
  x = x.expression(
    '(b>0.15||b<0.01)?1:0', {
      'b': x.select('change')
  });
  x = x.addBands(i1.select('NDBI'))
  x = x.expression(
    '(b>0||(ndbi>0.4||ndbi<0.01))?1:0', {
      'b': x.select('constant'),
      'ndbi': x.select('NDBI')
  });
  // x = x.expression(
  //   '(b>0)?0:1', {
  //     'b': x.select('constant')
  // });
  x=x.clip(geometry)
  ff=ff.addBands(x)
  // print(ff)
  var rp = ff.stratifiedSample({numPoints:0,classBand:'constant',region:geometry,scale:30,classValues:[0],classPoints:[num]});
  return rp
}
function getBVal(x,pt){
  return (x.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: pt,
  scale: 30}).get('constant'))
}
function getBUpoints(year,geometry,num){
  var i1,i2,x,y=year,ff;
  i1 = getImages(geom,y,'05',y,'08')
  i2 = getImages(geom,y,'01',y,'04')
  ff = i1;
  ff = ff.addBands(i2);
  i1=addNDSVBands(i1);
  var b='B3'
  x = i1.select(b).subtract(i2.select(b)).divide(i1.select(b).add(i2.select(b)))//.divide(12)
  x=x.rename(['change'])
  ff=ff.addBands(x)
  x = x.expression(
    '(b>0.11||b<0.08)?0:1', {
      'b': x.select('change')
  });
  x = x.addBands(i1.select('NDBI'))
  x = x.expression(
    '(b>0&&(ndbi<0.3&&ndbi>0.05))?1:0', {
      'b': x.select('constant'),
      'ndbi': x.select('NDBI')
  });
  var nl = 'stable_lights'
  var im2005=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152005').select('stable_lights');
  x = x.addBands(im2005);
  x = x.expression(
    '(b<1||nl<10)?0:1', {
      'b': x.select('constant'),
      'nl': x.select(nl)
  });
  x=x.clip(geometry)
  Map.addLayer(x);
  print(x)
  ff=ff.addBands(x)
  // print(ff)
  var rp = ff.stratifiedSample({numPoints:0,classBand:'constant',region:geometry,scale:30,classValues:[1],classPoints:[num]});
  return rp
  }
function getBUimage(year,geometry){
  var i1,i2,x,y=year;
  i1 = getImages(geom,y,'05',y,'08')
  i2 = getImages(geom,y,'01',y,'04')
  i1=addNDSVBands(i1);
  var b='B3'
  x = i1.select(b).subtract(i2.select(b)).divide(i1.select(b).add(i2.select(b)))//.divide(12)
  x=x.rename(['change'])
  x = x.expression(
    '(b>0.11||b<0.08)?0:1', {
      'b': x.select('change')
  });
  x = x.addBands(i1.select('NDBI'))
  x = x.expression(
    '(b>0&&(ndbi<0.3&&ndbi>0.05))?1:0', {
      'b': x.select('constant'),
      'ndbi': x.select('NDBI')
  });
  var nl = 'stable_lights'
  var im2005=ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152005').select('stable_lights');
  x = x.addBands(im2005);
  x = x.expression(
    '(b<1||nl<10)?0:1', {
      'b': x.select('constant'),
      'nl': x.select(nl)
  });
  x=x.clip(geometry)
  // Map.addLayer(x);
  print(x)
  return x
  }
  var year = '2014', nbu_num=10000, bu_num=2000, bands=["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","BQA","B1_1","B2_1","B3_1","B4_1","B5_1","B6_1","B7_1","B8_1","B9_1","B10_1","B11_1","BQA_1","change"];
  var bu_im = getBUimage(year,bihar)
  function addBU(feature){
    return feature.set('bu',getBVal(bu_im,feature.geometry()))
  }
  var bu_pts = ee.FeatureCollection([])
  for(var i=0;i<4;i++){
  var pts = ee.FeatureCollection.randomPoints(nl_geo,10000,i)
  pts = pts.map(addBU)
  pts = pts.filter(ee.Filter.eq('bu',1))
  bu_pts = bu_pts.merge(pts)
  }
  // print(bu_pts)
  Export.table.toDrive(bu_pts)
// var nbu = getNBUpoints(year,bihar,nbu_num)
// var bu = getBUpoints(year,bihar,nbu_num)
// var training = nbu.merge(bu)
// var trained = ee.Classifier.svm().train(training, 'constant', bands);
// var i1,i2,x,y=year,ff;
// i1 = getImages(geom,y,'05',y,'08')
// i2 = getImages(geom,y,'01',y,'04')
// ff = i1;
// ff = ff.addBands(i2);
// var fc = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
// var patna = fc.filter(ee.Filter.eq('name','Patna'));
// var b='B3'
// x = i1.select(b).subtract(i2.select(b)).divide(i1.select(b).add(i2.select(b)))//.divide(12)
// x=x.rename(['change'])
// ff=ff.addBands(x)
// ff=ff.clip(patna)
// var classified = ff.select(bands).classify(trained);
// classified = classified.expression('b<1?0:1', {'b': classified.select('classification')})
// var nbu_im = getNBUimage(year,patna)
// classified = classified.expression('(n<1||b<1)?0:1', {'b': classified.select('constant'),'n':nbu_im.select('constant')})
// classified = classified.clip(patna)
// print(classified)
// Map.addLayer(classified)
