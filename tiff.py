from libtiff import TIFF
import numpy as np
import math
im = TIFF.open('244121.tif')
imArray = im.read_image()
imArray = np.reshape(imArray,(37*60,9))
imArray2 = []

c = 0
f = 0
for i in xrange(0,len(imArray)):
    if not math.isnan(imArray[i][0]):
        imArray2.append(imArray[i])

imArray = np.array(imArray2)
print(imArray.shape)