import ee

ee.Initialize()

bs = 9
bands = ee.List(['B1','B2','B3','B4','B5','B6','B7','B8','B9'])

india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
bihar = ee.FeatureCollection('ft:14pZs4KV5iXBztlvcqXQ3ODNRjJfF8hAOYZO8ENHp','geometry').filter(ee.Filter.eq('Name','Bihar')).geometry();
fcc = ee.FeatureCollection('ft:13YnFNSd-d1x6IRiirVUw8sPLZhtMRAjFTS7s1LTr','geometry')
# fcc = fcc.filter(ee.Filter.inList('ST_NM',['Bihar']))#,'Haryana','NCT of Delhi','Punjab','Uttar Pradesh']))
fc = ee.FeatureCollection('ft:1PA2zwArj8EsplrX9eMxJ2H_TICyyx855KPnbJhC1','geometry')
district = fc.filter(ee.Filter.eq('name','Patna'));#.merge(fc.filter(ee.Filter.eq('name','Patna')))
bihar=india

india_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(bands)
.filterBounds(india).filterDate('2014-01-01','2014-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).median())
# india_image = addBands(india_image);
  # Map.addLayer(india_image, {bands: ['B3', 'B2', 'B1'], max: 0.4}, 'i');
bands_c = bands.add('class')
# ft_nbu = ee.FeatureCollection('ft:11w_QkE5HjUzUJxz3Bn1Lb6ZUcO2xmcTIezSQibc1').select(bands_c)
# .limit(50000);
# ft_bu = ee.FeatureCollection('ft:13pHXFjug3k2uVQYwVbGqzx1QrthG9PS7VYzL52dL').select(bands_c)
# .limit(60000);
ftt = ee.FeatureCollection('ft:1HABUR_nXX3oswF85QtZNamxckzUzGrcjPbpaZgUm').select(bands_c)
ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0').limit(1);
training = india_image.sampleRegions(ft,['class'],30);
# training = training.merge(ft_bu)
# training = training.merge(ft_nbu)
training = training.merge(ftt)
# print(training.size())
def getImageMin(geom,y1,m1,y2,m2):
    # c1 = ee.ImageCollection('LANDSAT/LT5_L1T_TOA').select(['B7'])
    # .filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
    c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7']).filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
    # c1 = (ee.ImageCollection)(c1.merge(c2))
    return  (ee.Image)(c2.min())
# }

def getImageMax(geom,y1,m1,y2,m2):
    c2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(['B7']).filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').filter(ee.Filter.lt('CLOUD_COVER',2))
    # c1 = (ee.ImageCollection)(c1.merge(c2))
    return  (ee.Image)(c2.max())
# }

# trained = ee.Classifier.cart().train(training, 'class', bands);
trained = ee.Classifier.randomForest().train(training, 'class', bands);
# trained = ee.Classifier.randomForest({numberOfTrees:10}).train(training, 'class', new_bands);
# print(trained)
i1 = getImageMax(bihar,'2010','01','2020','12')
i2 = getImageMin(bihar,'2010','01','2020','12')
b='B7'
x = i1.expression('(a-b)/(a+b)',{'a':i1.select(b),'b':i2.select(b)})
y = '2014'
bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(india)
.filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).median())
def numImages(y,district):
  return ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds((ee.Feature)(district).geometry()).filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).size()
# }
def getCinput(y,geom):
  y = str(y)
  bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(geom).filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2)).median())
  return bihar_image.select(bands);
# }
def getCinput1(y,geom):
  y = str(y)
  bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(geom).filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',3)).median())
  return bihar_image.select(bands);
# }
def getCinput2(y,geom):
  y = str(y)
  bihar_image = (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(geom).filterDate(y+'-01-01',y+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',2.5)).median())
  return bihar_image.select(bands);
# }
def getCImage(input):
    input = input.classify(trained);
    input = input.expression('LC==1?1:0',{'LC':input.select('classification')});
    ff = input
    ff = ff.expression('a>0&&b<0.35?1:0',{'a':ff.select('constant'),'b':x.select(b)})
    return ff
# }
def getFImage(y,geom):
    ff11 = getCImage(getCinput(y,geom))
    ff12 = getCImage(getCinput1(y,geom))
    ff13 = getCImage(getCinput2(y,geom))
    ff11 = ff11.expression('a+b+c>2?1:0',{'a':ff11.select('constant'),'b':ff12.select('constant'),'c':ff13.select('constant')})
    return ff11
# }
nights = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
nights = nights.filterBounds(india)
fn1 = nights.filterDate('2014-01-01','2014-12-01').median()
fn2 = nights.filterDate('2015-01-01','2015-12-01').median()
fn3 = nights.filterDate('2016-01-01','2016-12-01').median()
fn4 = nights.filterDate('2017-01-01','2017-12-01').median()
# fn1 = fn1.expression('a>10?1:0',{'a':fn1.select('avg_rad')})
def getAA(im,district,scale,prop):
    ss = im.reduceRegion(reducer=ee.Reducer.sum(),
                         geometry=district.geometry(),
                         scale=scale,
                         maxPixels=1e9
                         )
    return (ss.get(prop))
# }
def getAM(im,district,scale,prop):
    ss = im.reduceRegion(reducer=ee.Reducer.mean(),
                         geometry=district.geometry(),
                         scale=scale,
                         maxPixels=1e9
                         )
    return (ss.get(prop))


def getFF(district):
    res = ee.Feature({ "type": "Point", "coordinates": [0,0]})
    # res = ee.Feature(null,{})
    res = res.set('censuscode',district.get('censuscode'))
    print(district.get('censuscode').getInfo())
    res = res.set('name',district.get('DISTRICT'))
    # for(yy=2014;yy<2018;yy++) res = res.set('num'+String(yy),numImages(yy,district));
    # # res = res.set('num',numImages(yy,district))
    india = district.geometry()
    ff1 = getFImage(2014,india)
    ff2 = getFImage(2015,india)
    ff3 = getFImage(2016,india)
    ff4 = getFImage(2017,india)
    ff1 = ff1.expression('a>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
    ff2 = ff2.expression('b>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
    ff3 = ff3.expression('c>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
    ff4 = ff4.expression('d>0&&a+b+c+d>2?1:0',{'a':ff1.select('constant'),'b':ff2.select('constant'),'c':ff3.select('constant'),'d':ff4.select('constant')})
    # res = res.set('b2014',getAA(ff1,district,100,'constant'))
    print('bs2015',getAA(ff2,district,100,'constant').getInfo())
    print('bm2015',getAM(ff2,district,100,'constant').getInfo())
    fnn = ff2.expression('a>0?b:0',{'a':ff2.select('constant'),'b':fn2.select('avg_rad')})
    print('ns2015',getAA(fnn,district,100,'constant').getInfo())
    print('nm2015',getAM(fnn,district,100,'constant').getInfo())
    # res = res.set('b2016',getAA(ff3,district,100,'constant'))
    # res = res.set('b2017',getAA(ff4,district,100,'constant'))
    # res = res.set('n2014',getAA(fn1,district,500,'avg_rad'))
    print('n2015',getAA(fn2,district,500,'avg_rad').getInfo())
    # res = res.set('n2016',getAA(fn3,district,500,'avg_rad'))
    # res = res.set('n2017',getAA(fn4,district,500,'avg_rad'))
    return res
# }

# print(fcc.first())
villages_list = fcc.toList(200000).getInfo()
j = 0
print(len(villages_list))
for i in xrange(j*50,j*50+50):
    village = (ee.Feature)(villages_list[i])
    print(str(i) + '========================')
    getFF(village)
# Export.table.toDrive(fcc.map(getFF))
# Map.addLayer(ff1.clip(india))
# Map.addLayer(ff2.clip(india))
# Map.addLayer(ff3.clip(india))
# Map.addLayer(ff4.clip(india))
# Export.image.toAsset(getCImage(2014,bihar))
# ft_bu = ft.filter(ee.Filter.eq('class',1));
# mew = x_nbu.sampleRegions(ft_bu)
# rp = ff.stratifiedSample({numPoints:0,classBand:'constant',region:india,scale:30,classValues:[1],classPoints:[100000]});
# Export.table.toDrive(rp)
# Export.table.toDrive(mew)
