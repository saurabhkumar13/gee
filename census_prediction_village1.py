import csv
import numpy as np
xx = []
x = []
y = []
yy = []
with open('b_vill_stuff_EMP_Village_Level.csv','rb') as f:
    reader = csv.reader(f)
    rownum = 0
    for row in reader:
        if rownum == 0:
            header = row
            rownum += 1
        else:
            xx.append(row)
print header

for i in range(len(header)):
    print(i,header[i])
feat = [i for i in xrange(1,5)]
label = [7]

# #
for i in xrange(0,len(feat)):
    print i, header[feat[i]]
#
for i in xrange(len(xx)):
    if xx[i][label[0]] == '' or xx[i][1] == '':
        continue
    xxx = []
    yyy = []
    for k in feat:
        xxx.append(float(xx[i][k]))
    x.append(xxx)
    for k in label:
        yyy.append(int(xx[i][k]))
    yy.append(yyy)
x = np.array(x)
yy = np.array(yy)
label_id = 1
y=yy[:,label_id-1:label_id]
y=y.reshape(len(x))
print y.shape
print x.shape
#
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.model_selection import cross_val_predict
clf = ExtraTreesClassifier()
clf.fit(x,y)
y_pred = cross_val_predict(clf,x,y,cv=5)
print(confusion_matrix(y,y_pred))
print(accuracy_score(y,y_pred))
importances = clf.feature_importances_
std = np.std([tree.feature_importances_ for tree in clf.estimators_],
             axis=0)
indices = np.argsort(importances)[::-1]

print("Feature ranking:")

for f in range(len(feat)):
    print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))

import matplotlib.pyplot as plt

plt.figure()
plt.title("Feature importances")
plt.bar(range(x.shape[1]), importances[indices],
       color="r", yerr=std[indices], align="center")
plt.xticks(range(x.shape[1]), indices)
plt.xlim([-1, x.shape[1]])
plt.savefig(header[label[label_id-1]])
print(header[label[label_id-1]])
plt.show()
