var fc = ee.FeatureCollection('ft:144copRdjlkKMR6PuYBXN-sLIE1U4vqn-NUCHLjlZ','geometry')
fc = fc.merge(ee.FeatureCollection('ft:1VisMLgHDmzUGr8tqWQWeBRqNL0_3qlF3Ugv24UKB','geometry'))
fc = fc.merge(ee.FeatureCollection('ft:1KDh7t6ZOVKpr5Ld_P7v0mG8u0LPFvitRJDsitXuN','geometry'))
fc = fc.merge(ee.FeatureCollection('ft:184ug09lm7AW1V1To4WmC1o0zJW3s7bYW2Gy82uo1','geometry'))
fc = fc.merge(ee.FeatureCollection('ft:1SIxgO4fa60X6NhyFeVHp5TXPaJ_mU7_8jqqwsVup','geometry'))
fc = fc.merge(ee.FeatureCollection('ft:12C0095JAOOrJyL9K-RI_ePuSPfe5XwED-ZIvfGnE','geometry'))
fc = fc.merge(ee.FeatureCollection('ft:14l1RMzq8K2X96uRlslLAIbY5A8vgw_R_f-LhV0j_','geometry'))
fc = fc.merge(ee.FeatureCollection('ft:1eQuoCyedBnQtLmCyJhwQd4FuuQfm2qaIYqwsTsF7','geometry'))
fc = fc.merge(ee.FeatureCollection('ft:1pz45NG8YC0SNwFxU4rOYzrz62Vb-RqB4bwMODbWA','geometry'))
fc = fc.merge(ee.FeatureCollection('ft:16ln9k64V3OOBHocn1LySXnYN6LwfMy8zII-CwFkw','geometry'))

// var ft = fc.first()
// var dx =  0.06
// var dy = 0.06
// function mew(ft){
//   var geo = ft.geometry()
//   var x = ee.Number(geo.centroid().coordinates().get(0))
//   var y = ee.Number(geo.centroid().coordinates().get(1))
//   var geo2 = ee.Geometry.Polygon(
//     [[x.subtract(dx),y.subtract(dy)],
//     [x.add(dx),y.subtract(dy)],
//     [x.add(dx),y.add(dy)],
//     [x.subtract(dx),y.add(dy)],
//     [x.subtract(dx),y.subtract(dy)]])
//   var geoInt = geo2.intersection(geo)
//   var res = ee.Feature(null)
//   res = res.set('geo',geo.area())
//   res = res.set('intersection',geoInt.area())
//   res = res.set('square',geo2.area())
//   return res
// }
// function mew2(ft){
//   var res = ee.Feature(ft.geometry())
//   res = res.set('village_code_2011',ft.get('village_code_2011'))
//   return res
// }

// // print(mew2(fc.first()))
// Export.table.toDrive(fc.map(mew2))

// Map.addLayer(fc)