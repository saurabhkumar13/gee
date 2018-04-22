import numpy as np
import gdal

dataset = gdal.Open('patna_nl.tif')
a=np.array(dataset.ReadAsArray())

lx = len(a[0])
ly = len(a)
b = np.zeros(a.shape)

ulx, xres, xskew, uly, yskew, yres  = dataset.GetGeoTransform()
lrx = ulx + (dataset.RasterXSize * xres)
lry = uly + (dataset.RasterYSize * yres)

def getLatLong(i,j):
    return (ulx+(lrx-ulx)*(j)/lx),(lry+(uly-lry)*(ly-i)/ly)

def light(i,j):
    if( i>=0 and j>=0 and i<ly and j<lx):
        return a[i][j]
    else:
        return 0

def paint(i,j):
    m = max(light(i+1,j),light(i,j+1),light(i-1,j),light(i,j-1))
    if(m<light(i,j) and m>4):
        b[i][j]=1
        return

def paintT(i,j,T,dT,id):
    if(light(i,j)<T or b[i][j]!=0):
        return
    b[i][j] = id
    for di in xrange(-1,2):
        for dj in xrange(-1,2):
            if(abs(light(i,j) - light(i+di,j+dj))<dT):
                paintT(i+di,j+dj,T,dT,id)

for i in xrange(0,ly):
    for j in xrange(0,lx):
        paintT(i,j,5,1,i*ly+j)

for i in xrange(0,ly):
    for j in xrange(0,lx):
        if(b[i][j]==1):
            x,y = getLatLong(i,j)
            print '['+str(x)+','+str(y)+'],'
# print(gdal.)
# print(np.max(b))