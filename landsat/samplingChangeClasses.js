/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var bu = /* color: #d63000 */ee.Geometry.MultiPolygon(
        [[[[85.21828651428223, 25.60031547524391],
           [85.2178144454956, 25.59365848556612],
           [85.2233076095581, 25.59063949604714],
           [85.22399425506592, 25.599309209878676]]],
         [[[85.22665500640869, 25.598032014721657],
           [85.22781372070312, 25.589362208315652],
           [85.2354097366333, 25.59458739008982]]],
         [[[85.16258239746094, 25.594122938729672],
           [85.17077922821045, 25.59493572742645],
           [85.17120838165283, 25.601089519763057],
           [85.16266822814941, 25.60190226111573]]],
         [[[85.14206886291504, 25.592729573828972],
           [85.14284133911133, 25.585994748024397],
           [85.16756057739258, 25.586497937768765],
           [85.16730308532715, 25.59141360318698]]],
         [[[85.14588832855225, 25.593735894551966],
           [85.14653205871582, 25.601360434161077],
           [85.14039516448975, 25.5995414257145],
           [85.14009475708008, 25.592961802439508]]],
         [[[85.09357452392578, 25.63154419280648],
           [85.10018348693848, 25.61776896156347],
           [85.11537551879883, 25.616608054902056],
           [85.11975288391113, 25.627752293230348]]],
         [[[85.07623672485352, 25.615834110862025],
           [85.07512092590332, 25.61026156581261],
           [85.08370399475098, 25.61049376037704],
           [85.08370399475098, 25.61560192667259]]],
         [[[85.08773803710938, 25.620090741049964],
           [85.08773803710938, 25.616530660723623],
           [85.09151458740234, 25.616453266495043],
           [85.0920295715332, 25.620477699911373]]],
         [[[85.09280204772949, 25.62210291344327],
           [85.09469032287598, 25.61614368907954],
           [85.09846687316895, 25.61699502504235],
           [85.09597778320312, 25.623650715299917]]]]),
    river = /* color: #98ff00 */ee.Geometry.MultiPolygon(
        [[[[85.23373603820801, 25.60345032460058],
           [85.24558067321777, 25.617381993929506],
           [85.23004531860352, 25.623108986931214],
           [85.22111892700195, 25.610416362238997]]],
         [[[84.61270809173584, 25.71029558727138],
           [84.60691452026367, 25.714664842541453],
           [84.6016788482666, 25.710334253950855],
           [84.60652828216553, 25.70538481686091]]],
         [[[84.62908029556274, 25.763991487481686],
           [84.62545394897461, 25.767856346657684],
           [84.61858749389648, 25.76658095704098],
           [84.62358713150024, 25.761846436340754]]],
         [[[84.58253860473633, 25.819131107622077],
           [84.58528518676758, 25.82260786919061],
           [84.56562995910645, 25.839681149559613],
           [84.55987930297852, 25.835277869507365]]],
         [[[84.4475269317627, 25.70325804238861],
           [84.4577407836914, 25.710682253500668],
           [84.45559501647949, 25.71346621326069],
           [84.44649696350098, 25.70689287027788],
           [84.43551063537598, 25.709058246894493],
           [84.42358016967773, 25.720580481139944],
           [84.4192886352539, 25.71655942548515],
           [84.43096160888672, 25.707124876799874]]],
         [[[84.47302064624023, 25.70248466043175],
           [84.4779109954834, 25.697689580153913],
           [84.48125839233398, 25.7000871444345],
           [84.47705468859863, 25.702639337225083]]]]),
    crops = /* color: #0b4a8b */ee.Geometry.MultiPolygon(
        [[[[84.15475845336914, 26.11039837724274],
           [84.15295600891113, 26.101843130972455],
           [84.15686130523682, 26.09941517679338],
           [84.16033744812012, 26.106737425055922]]],
         [[[84.16003704071045, 26.08060645955912],
           [84.15737628936768, 26.08342025095502],
           [84.14433002471924, 26.08022100341537],
           [84.14287090301514, 26.0749786738531]]],
         [[[84.13651943206787, 26.076404919111056],
           [84.14231300354004, 26.081570094365436],
           [84.13510322570801, 26.084036963319086]]],
         [[[84.12248611450195, 26.162487076145442],
           [84.123215675354, 26.159559629695565],
           [84.12772178649902, 26.16214040869058],
           [84.1269063949585, 26.16992091913785],
           [84.12209987640381, 26.16537593153099],
           [84.1179370880127, 26.165607036870473]]],
         [[[84.11433219909668, 26.16267966873069],
           [84.11808729171753, 26.166839590946086],
           [84.11257266998291, 26.168572848073282]]],
         [[[83.93962383270264, 26.0394711341286],
           [83.94134044647217, 26.02782571188186],
           [83.95297050476074, 26.03511387640512]]],
         [[[83.92829418182373, 26.01884020869683],
           [83.9249038696289, 26.010008292767125],
           [83.93885135650635, 26.011011076482355],
           [83.9372205734253, 26.02404648536206]]],
         [[[83.98713111877441, 26.078293703657828],
           [83.99030685424805, 26.08353588477081],
           [83.98627281188965, 26.081917000953663],
           [83.98550033569336, 26.085694361695072],
           [83.98361206054688, 26.08422968526642],
           [83.98129463195801, 26.088777831099527],
           [83.98249626159668, 26.07821661100753]]],
         [[[83.9910364151001, 26.106197906620885],
           [83.9866590499878, 26.099029782605815],
           [84.00060653686523, 26.091090379831726],
           [84.00747299194336, 26.1009952796851]]],
         [[[84.0173864364624, 26.08369006301413],
           [84.0230941772461, 26.08746736653019],
           [84.01936054229736, 26.09344142418681],
           [84.01146411895752, 26.085771449420395]]],
         [[[84.01824474334717, 26.072126131216624],
           [84.01459693908691, 26.073822246024765],
           [84.01197910308838, 26.072203227877242],
           [84.02695655822754, 26.065110122634007],
           [84.02897357940674, 26.068194134220033],
           [84.02365207672119, 26.068502530912397],
           [84.02116298675537, 26.07285854744314]]]]),
    forest = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[84.49790954589844, 24.56273686820862],
          [84.51130113330078, 24.547747764591858],
          [84.54477310180664, 24.571635800654565],
          [84.53550338745117, 24.58147072762409]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var india = ee.FeatureCollection('ft:1UDdgOCf8DoRJ9bVm-UVbR6CqxtkJToLQjTFd0r0Z','geometry').filter(ee.Filter.eq('Name','India')).geometry();
function getImage(geom,y1,m1,y2,m2){
return (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01').sort('CLOUD_COVER').first());
}
function getImages(geom,y1,m1,y2,m2){
return (ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
.filterBounds(geom).filterDate(y1+'-'+m1+'-01',y2+'-'+m2+'-01'));
}
  var i1,i2,x,y='2015',im,ge = india,ims,iml;
// im=getImages(ge,y,'01',y,'12').toArray()
im=getImages(ge,y,'01',y,'12').toArray()
// var im_min = im.min()
var ft = ee.FeatureCollection('ft:1fWY4IyYiV-BA5HsAKi2V9LdoQgsbFtKK2BoQiHb0');
// print(im_min)
var sampling = function(feature){
  var bands = im.sample({region:feature.geometry(),scale:30,numPixels:1})
  if(bands.size()===0||feature===null)
    return null;
  var ff = bands.first().set('class',feature.get('class'));
  return  ff
}
// var tb=ft.map(sampling,true)
// print(vills.first().geometry().area())
// Export.table.toDrive(tb)
print(sampling((ee.Feature)(ft.first())))
// // Export.table.toDrive(im.sample({region:ge,scale:30,numPixels:9000}));