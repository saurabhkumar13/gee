# Import the Earth Engine Python Package
import ee
import sys
import time
# Initialize the Earth Engine object, using the authentication credentials.
ee.Initialize()

bands = ['B1','B2','B3','B4','B5','B6','B7','B8','B9']

def getImageM(geom,y):
    return (ee.Image)(ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterBounds(geom).filterDate(str(y)+'-01-01',str(y)+'-12-01').filter(ee.Filter.lt('CLOUD_COVER',10)).median()).clip(geom).select(bands)

# fc = ee.FeatureCollection('ft:144copRdjlkKMR6PuYBXN-sLIE1U4vqn-NUCHLjlZ','geometry')
fc = (ee.FeatureCollection('ft:1VisMLgHDmzUGr8tqWQWeBRqNL0_3qlF3Ugv24UKB','geometry'))
# fc = (ee.FeatureCollection('ft:1KDh7t6ZOVKpr5Ld_P7v0mG8u0LPFvitRJDsitXuN','geometry'))
# fc = (ee.FeatureCollection('ft:184ug09lm7AW1V1To4WmC1o0zJW3s7bYW2Gy82uo1','geometry'))
# fc = (ee.FeatureCollection('ft:1SIxgO4fa60X6NhyFeVHp5TXPaJ_mU7_8jqqwsVup','geometry'))
# fc = (ee.FeatureCollection('ft:12C0095JAOOrJyL9K-RI_ePuSPfe5XwED-ZIvfGnE','geometry'))
# fc = (ee.FeatureCollection('ft:14l1RMzq8K2X96uRlslLAIbY5A8vgw_R_f-LhV0j_','geometry'))
# fc = (ee.FeatureCollection('ft:1eQuoCyedBnQtLmCyJhwQd4FuuQfm2qaIYqwsTsF7','geometry'))
# fc = (ee.FeatureCollection('ft:1pz45NG8YC0SNwFxU4rOYzrz62Vb-RqB4bwMODbWA','geometry'))
# fc = (ee.FeatureCollection('ft:16ln9k64V3OOBHocn1LySXnYN6LwfMy8zII-CwFkw','geometry'))

j = 18
villages_list = fc.toList(200000).getInfo()
for i in xrange(j*1000+283,(j+1)*1000):
    while(1):
        try:
            village = (ee.Feature)(villages_list[i])
            if village.get('village_code_2011').getInfo() == None:
                continue
            im = getImageM(village.geometry(), 2014)
            task_config = {
                'scale': 30,
                'description': 'meh',
                'driveFolder': 'ee/landsat/'
            }
            name = str(int(village.get('village_code_2011').getInfo()))
            task = ee.batch.Export.image(im, name, task_config)
            task.start()
            break
        except:
            sys.stdout.write('.')
            time.sleep(5)
    print i

# import time
#
# while(1):
#     print task.status()
#     time.sleep(1)
# print task.getInfo()

    # time.sleep(5)
    # print 'waiting?'
# print (areas(villages_list.get(k)).getInfo())
# import sys
# k=int(sys.argv[1])
# print('pixels representing loss: ', classified.pixelArea(), 'pixels')
# Display the input and the classification.
#Map.centerObject(mfp, 10)


#
