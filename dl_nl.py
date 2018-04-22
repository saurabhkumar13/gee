# Import the Earth Engine Python Package
import ee
import sys
import time
# Initialize the Earth Engine object, using the authentication credentials.
ee.Initialize()

def getImageM(geom):
    nl = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG').filterBounds(geom).median().select('avg_rad')
    nl = nl.expression('int(a)', {'a': nl.select('avg_rad')})
    return nl.clip(geom)

fc = ee.FeatureCollection('ft:13YnFNSd-d1x6IRiirVUw8sPLZhtMRAjFTS7s1LTr','geometry')
# fc = (ee.FeatureCollection('ft:1VisMLgHDmzUGr8tqWQWeBRqNL0_3qlF3Ugv24UKB','geometry'))
# fc = (ee.FeatureCollection('ft:1KDh7t6ZOVKpr5Ld_P7v0mG8u0LPFvitRJDsitXuN','geometry'))
# fc = (ee.FeatureCollection('ft:184ug09lm7AW1V1To4WmC1o0zJW3s7bYW2Gy82uo1','geometry'))
# fc = (ee.FeatureCollection('ft:1SIxgO4fa60X6NhyFeVHp5TXPaJ_mU7_8jqqwsVup','geometry'))
# fc = (ee.FeatureCollection('ft:12C0095JAOOrJyL9K-RI_ePuSPfe5XwED-ZIvfGnE','geometry'))
# fc = (ee.FeatureCollection('ft:14l1RMzq8K2X96uRlslLAIbY5A8vgw_R_f-LhV0j_','geometry'))
# fc = (ee.FeatureCollection('ft:1eQuoCyedBnQtLmCyJhwQd4FuuQfm2qaIYqwsTsF7','geometry'))
# fc = (ee.FeatureCollection('ft:1pz45NG8YC0SNwFxU4rOYzrz62Vb-RqB4bwMODbWA','geometry'))
# fc = (ee.FeatureCollection('ft:16ln9k64V3OOBHocn1LySXnYN6LwfMy8zII-CwFkw','geometry'))

villages_list = fc.toList(200000).getInfo()
for i in xrange(254,len(villages_list)):
    while(1):
        # try:
        village = (ee.Feature)(villages_list[i])
        name = str(village.get('DISTRICT').getInfo())
        print(name)
        if village.get('DISTRICT').getInfo() == None:
            continue
        im = getImageM(village.geometry())
        # print(im)
        task_config = {
            'scale': 1000,
            'description': 'meh2',
            'driveFolder': 'ee/nlI/'
            # 'region' : village.geometry()
        }
        # print(village.geometry())
        task = ee.batch.Export.image(im, name, task_config)
        task.start()
        break
        # except:
        #     sys.stdout.write('.')
        #     time.sleep(5)
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
