import csv
import numpy as np
from math import log
from sklearn.preprocessing import normalize
xx = []
x = []
y = []
yy = []
with open('diff_dist.csv','rb') as f:
   reader = csv.reader(f)
   rownum = 0
   for row in reader:
       if rownum == 0:
           header = row
           rownum += 1
       else:
           xx.append(row)
# for i in xrange(len(header)):
#     print i, header[i]
feat = [1,2,3,4]
# feat = [3,4]
# feat = [20,21]
label_id = 2
# feat.extend([i for i in xrange(1,5)])
# feat.extend([i for i in xrange(7,28)])
label = [i for i in xrange(27,47)]

for i in xrange(0,len(feat)):
   print i,feat[i], header[feat[i]]
#
# for i in xrange(0,len(label)):
#     print i, header[label[i]]

for i in xrange(len(xx)):
   xxx = []
   yyy = []
   for k in feat:
       xxx.append(log(1e-10+float(xx[i][k])))
   x.append(xxx)
   for k in label:
       yyy.append(log(1e-10+float(xx[i][k])))
   yy.append(yyy)

x = np.array(x)
yy = np.array(yy)
# x = normalize(x,axis=1)
# yy = normalize(yy,axis=1)
y=yy[:,label_id-1:label_id]
y=y.reshape(len(x))
print y.shape
print x.shape

from sklearn.ensemble import ExtraTreesRegressor
from sklearn.linear_model import Ridge
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import r2_score

# for label_id in xrange(len(label)):
y = yy[:, label_id:label_id+1]
clf = LinearRegression()
# clf = Ridge()
# clf = ExtraTreesRegressor()
clf.fit(x,y)
y_pred = clf.predict(x)
print(header[label[label_id]], r2_score(y,y_pred))
# y_pred = cross_val_predict(clf,x,y,cv=5)
# importances = clf.feature_importances_
# std = np.std([tree.feature_importances_ for tree in clf.estimators_],
#              axis=0)
# indices = np.argsort(importances)[::-1]
#
# print("Feature ranking:")
#
# # for f in range(20):
# #     print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))
# import matplotlib.pyplot as plt
#
# plt.figure()
# plt.title("Feature importances")
# plt.bar(range(x.shape[1]), importances[indices],
#        color="r", yerr=std[indices], align="center")
# plt.xticks(range(x.shape[1]), indices)
# plt.xlim([-1, x.shape[1]])
# plt.savefig(header[label[label_id-1]])
# print(header[label[label_id-1]])
# plt.show()