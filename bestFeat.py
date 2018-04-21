import csv
import numpy as np
x = []
y = []
ffs=24
with open('trainingB25.csv','rb') as f:
    reader = csv.reader(f)
    rownum = 0
    for row in reader:
        if rownum == 0:
            header = row
            rownum+=1
        else:
            xx = []
            for i in xrange(1,ffs+1):
                xx.append(row[i])
            x.append(xx)
            y.append(row[25])


def ndsv(a,b):
    return (a-b)/(a+b)

l=ffs
for j in xrange(0, ffs):
    for k in xrange(j + 1, ffs):
        print str(j)+", "+str(k)+": "+str(l)
        l+=1


for i in xrange(len(x)):
    for j in xrange(0,ffs):
        for k in xrange(j+1, ffs):
            x[i].append(ndsv((float)(x[i][j]),(float)(x[i][k])))

x = np.array(x)
y = np.array(y)
print x.shape, y.shape



from sklearn.ensemble import ExtraTreesClassifier
clf = ExtraTreesClassifier()
clf.fit(x,y)
importances = clf.feature_importances_
std = np.std([tree.feature_importances_ for tree in clf.estimators_],
             axis=0)
indices = np.argsort(importances)[::-1]

print("Feature ranking:")

for f in range(20):
    print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))
import matplotlib.pyplot as plt

plt.figure()
plt.title("Feature importances")
plt.bar(range(x.shape[1]), importances[indices],
       color="r", yerr=std[indices], align="center")
plt.xticks(range(x.shape[1]), indices)
plt.xlim([-1, x.shape[1]])
plt.show()