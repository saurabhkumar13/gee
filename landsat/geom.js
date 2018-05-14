var fcc = ee.FeatureCollection('ft:13YnFNSd-d1x6IRiirVUw8sPLZhtMRAjFTS7s1LTr','geometry')

function geom(ft){
  var res = ee.Feature(null,{})
  var box = (ee.List)(((ee.Feature)(ft).bounds()).geometry().coordinates().get(0))
  var min_c = (ee.List)(box.get(0))
  var max_c = (ee.List)(box.get(2))
  res = res.set('left longitude',min_c.get(0))
  res = res.set('right longitude',max_c.get(0))
  res = res.set('top latitude',max_c.get(1))
  res = res.set('bottom latitude',min_c.get(1))
  return res
}

print(geom(fcc.first()))
