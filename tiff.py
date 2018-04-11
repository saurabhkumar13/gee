import numpy as np
import math
import csv
import statistics

class_files = ['c_bu.csv','c_crops.csv','c_forest.csv','c_river.csv']

def stats(a):
    a=np.transpose(a)
    b = []
    for i in xrange(0,len(a)-1):
        aa = a[i]
        # b.append(min(aa))
        # b.append(max(aa))
        b.append(statistics.mean(aa))
        # b.append(statistics.median(aa))
    return np.array(b)

def getArr(i):
    x = []
    with open(class_files[i],'rb') as f:
        reader = csv.reader(f)
        rownum = -1
        for row in reader:
            if rownum != -1:
                xx = []
                rows = row[1].split('], [')
                for j in xrange(1,len(rows)):
                    r = rows[j]
                    xxx = np.fromstring(r, dtype=float, sep=',')
                    if xxx[11] == 2720:
                        xx.append(xxx)
                x.append(stats(np.array(xx)))
            rownum += 1
    x = np.array(x)
    return x


def getTest():
    x = []
    y = []
    with open('20k.csv','rb') as f:
        reader = csv.reader(f)
        rownum = -1
        for row in reader:
            if rownum != -1:
                xx = []
                rows = row[2].split('], [')
                for j in xrange(1,len(rows)):
                    r = rows[j]
                    xxx = np.fromstring(r, dtype=float, sep=',')
                    if xxx[11] == 2720:
                        xx.append(xxx)
                xx = stats(np.array(xx))
                if len(xx)==11:
                    x.append(xx)
                    y.append(int(float(row[3])))
            rownum += 1
    x = np.array(x)
    y = np.array(y)
    return x,y

X_test,Y_test = getTest()

# 8981,9029,8962,8974
# f = open('x1.txt','rb')
# x1 = np.load(f)
x1 = getArr(0)
# np.save(f,x1)
# f = open('x2.txt','rb')
# x2 = np.load(f)
x2 = getArr(1)
# np.save(f,x2)
# f = open('x3.txt','rb')
# x3 = np.load(f)
x3 = getArr(2)
# np.save(f,x3)
# f = open('x4.txt','rb')
# x4 = np.load(f)
x4 = getArr(3)
# np.save(f,x4)
x = np.concatenate((x1,x2,x3,x4))
print(x.shape)
print(X_test.shape)
y = [1 for i in xrange(len(x1))]
y.extend([2 for i in xrange(len(x2))])
y.extend([2 for i in xrange(len(x3))])
y.extend([2 for i in xrange(len(x4))])
y = np.array(y)
from sklearn.ensemble.forest import RandomForestClassifier
x,X_test = X_test,x
y,Y_test = Y_test,y
clf = RandomForestClassifier(random_state=0)
clf.fit(x, y)
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import confusion_matrix
from sklearn.metrics import f1_score
# y_pred = cross_val_predict(clf,x,y,cv=10)
y_pred = clf.predict(X_test)
conf_mat = confusion_matrix(Y_test,y_pred)
# conf_mat = confusion_matrix(y,y_pred)
print(conf_mat)
print(f1_score(y_pred,Y_test))
