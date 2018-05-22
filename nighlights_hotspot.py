import numpy as np
import gdal
import sys
import csv
import matplotlib.pyplot as plt
# import resource, \
import sys
# resource.setrlimit(resource.RLIMIT_STACK, (2**29,-1))
sys.setrecursionlimit(10**6)

lrx = ulx = lx = lry = uly = ly = ulx = 0
a = b = []

def getLatLong(i, j):
    return (ulx + (lrx - ulx) * (j) / lx), (lry + (uly - lry) * (ly - i) / ly)


def getLatLongS(i, j):
    return str(ulx + (lrx - ulx) * (j) / lx) + ',' + str(lry + (uly - lry) * (ly - i) / ly)


def light(i, j):
    if (i >= 0 and j >= 0 and i < ly and j < lx):
        return a[i][j]
    else:
        return 0


def paint(i, j):
    m = max(light(i + 1, j), light(i, j + 1), light(i - 1, j), light(i, j - 1))
    if (m < light(i, j) and m > 4):
        b[i][j] = 1
        return


def paintT(i, j, dT, T, label):
    if (light(i, j) < T or b[i][j] != 0):
        return
    b[i][j] = label
    for di in xrange(-1, 2):
        for dj in xrange(-1, 2):
            if (dj != 0 or di != 0) and abs(light(i + di, j + dj) - light(i, j)) > dT:
                paintT(i + di, j + dj, dT, T, label)

def isSafe(b,v,i,j):
    if(b[i][j]==0 or v[i][j]):
        return False
    return True

def isValid(i,j,ly,lx):
    if (i >= 0 and j >= 0 and i < ly and j < lx):
        return True
    return False

def getSpots(img_name):
    dataset = gdal.Open(img_name)
    global a, b, lx, ly
    a = np.array(dataset.ReadAsArray())

    lx = len(a[0])
    ly = len(a)
    b = np.zeros(a.shape)

    global ulx, uly, lrx, lry
    ulx, xres, xskew, uly, yskew, yres  = dataset.GetGeoTransform()
    lrx = ulx + (dataset.RasterXSize * xres)
    lry = uly + (dataset.RasterYSize * yres)

    for i in xrange(0,ly):
        for j in xrange(0,lx):
            paintT(i,j,1,2,lx*i+j)

    clusters = {}
    for i in xrange(0,ly):
        for j in xrange(0,lx):
            if b[i][j] != 0:
                if b[i][j] in clusters:
                    clusters[b[i][j]]['num'] = a[i][j] + clusters[b[i][j]]['num']
                    clusters[b[i][j]]['size'] = 1 + clusters[b[i][j]]['size']
                    if i > clusters[b[i][j]]['max_i']:
                        clusters[b[i][j]]['max_i'] = i
                    if j > clusters[b[i][j]]['max_j']:
                        clusters[b[i][j]]['max_j'] = j
                    if i < clusters[b[i][j]]['min_i']:
                        clusters[b[i][j]]['min_i'] = i
                        clusters[b[i][j]]['min_ij'] = j
                    if j < clusters[b[i][j]]['min_j']:
                        clusters[b[i][j]]['min_j'] = j
                else:
                    clusters[b[i][j]] = {'num':a[i][j],'min_i':i,'min_ij':j,'min_j':j,'max_i':i,'max_j':j,'size':1}

    list_spots = []

    for key, value in sorted(clusters.iteritems(), key=lambda (k,v): (v,k)):
        # if value['size']<5:
        #     continue
        b2 = np.zeros((len(b)+2,len(b[0])+2))
        for i in xrange(0, ly):
            for j in xrange(0, lx):
                f = 0
                for i1 in xrange(-1, 2):
                    for j1 in xrange(-1, 2):
                        if b[i][j]==key and (i + i1 >= 0 and j + j1 >= 0 and i + i1 < ly and j + j1 < lx) and b[i + i1][j + j1] != b[i][j]:
                            f = 1
                if f == 1:
                    b2[i+1][j+1] = 1
        b2[value['min_i']+1][value['min_ij']+1] = 1
        i = value['min_i']+1
        j = value['min_ij']+1
        d = 0
        # print i,j
        perimeter = [[i-1,j-1]]
        directions = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]
        for count in xrange(2,value['size']):
            for k in xrange(8):
                kk = (d + k + 1)%8
                # print kk, i, j, b2[i+directions[kk][0]][j+directions[kk][1]], directions[kk]
                if(b2[i+directions[kk][0]][j+directions[kk][1]]==1):
                    # b2[i+directions[kk][0]][j+directions[kk][1]] = count
                    i += directions[kk][0]
                    j += directions[kk][1]
                    perimeter.append([i-1,j-1])
                    d = kk+4
                    break

            if i == value['min_i']+1 and j == value['min_ij']+1:
                break
        value['perimeter'] = perimeter
        # print key
        # for i in xrange(0, ly):
        #     for j in xrange(0, lx):
        #         sys.stdout.write(str(int(b2[i][j])) + ' ')
        #     print ''
    # list_spots.append(value['num'])
    #     if value['num'] > 100:
    #         print key, value
    # list_spots = sorted(list_spots, reverse=True)[:10]
    # return list_spots, clusters
    return clusters
    # print(list_spots)
    # plt.plot(list_spots)
    # plt.ylabel('some numbers')
    # plt.show()
    # for key, value in sorted(clusters.iteritems(), key=lambda (k,v): (v,k)):
    #     if value['num'] > 100:
    #         print '['+getLatLongS(value['min_i'],value['min_j'])+','
    #         print getLatLongS(value['max_i'],value['min_j'])+','
    #         print getLatLongS(value['max_i'],value['max_j'])+','
    #         print getLatLongS(value['min_i'],value['max_j'])+','
    #         print getLatLongS(value['min_i'],value['min_j'])+'],'

from os import listdir
from os.path import isfile, join

onlyfiles = [f for f in listdir('nl') if isfile(join('nl', f))]
f = open('spots.csv','w')
f.write('Index,SOL,Size,geometry\n')
index = 0
for file in  onlyfiles:
    # f.write(file[:-4])
    print(file[:-4])
    clusters = getSpots('nl/'+file)
    # for i in xrange(0,len(l)):
    #     f.write(str(","+str(l[i])))
    for key, value in sorted(clusters.iteritems(), key=lambda (k,v): (v,k)):
        if value['num'] > 0:
            index += 1
            peri = value['perimeter']
            f.write(str(index) + ',' + str(value['num']) + ',' + str(value['size']) + ',"<Polygon><outerBoundaryIs><LinearRing><coordinates>')
            # f.write(getLatLongS(value['min_i'],value['min_j'])+' ')
            # f.write(getLatLongS(value['max_i'],value['min_j'])+' ')
            # f.write(getLatLongS(value['max_i'],value['max_j'])+' ')
            # f.write(getLatLongS(value['min_i'],value['max_j'])+' ')
            # f.write(getLatLongS(value['min_i'],value['min_j'])+' ')
            for i in xrange(len(peri)):
                f.write(getLatLongS(peri[i][0],peri[i][1])+' ')
            f.write(getLatLongS(peri[0][0], peri[0][1]) + ' ')
            f.write('</coordinates></LinearRing></outerBoundaryIs></Polygon>"\n')
    # break

f.close()
