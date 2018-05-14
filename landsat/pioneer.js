/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageVisParam = {"opacity":1,"bands":["B2","B3","B4"],"gamma":1};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
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
function getImage(geom,y1,m1,y2,m2){
return (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').sort('CLOUD_COVER').first());
}
function nextY(y){return (parseInt(y)+1)+'';}

var y='2014', x;
var li = [],li1 = [], li2 = [];
var i=0;
for(i=0;i<geom.length;i++)
{
var  i1 = getImage(geom[i],y,'05',y,'06')
var  i2 = getImage(geom[i],y,'07',y,'11')
var b='B7'
x = i1.select(b).subtract(i2.select(b)).divide(i1.select(b).add(i2.select(b)))//.divide(12)
li1.push(i1)
li2.push(i2)
li.push(x)
}
x =  (ee.Image)(ee.ImageCollection(li).mosaic());
i1 =  (ee.Image)(ee.ImageCollection(li1).mosaic());
i2 =  (ee.Image)(ee.ImageCollection(li2).mosaic());
Map.addLayer(i1, {bands: ['B4', 'B3', 'B2'], max: 0.4}, 'TOA',false);
Map.addLayer(i2, {bands: ['B4', 'B3', 'B2'], max: 0.4}, 'TOA',false);

Map.addLayer(x,{},false,false)