import csv

ar = []
with open('gee_bihar.csv','rb') as f:
    reader = csv.reader(f)
    rownum = 0
    for row in reader:
        if rownum == 0:
            header = row
        else:
            ar2 = []
            for i in xrange(10,85):
                if row[i]!='':
                    ar2.append(float(row[i]))
                else:
                    ar2.append(0)
            ar.append(ar2)
        rownum+=1
def normalize(v):
    norm=np.linalg.norm(v)
    if norm==0:
       return v
    return v/norm

import numpy as np
for i in xrange(10,85):
    print np.corrcoef(ar[84],ar[i])[0][1        ]
