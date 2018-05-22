import csv
import numpy as np
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
# for i in xrange(0,len(header)):
#     print i, header[i]

feat = []
feat.extend(i for i in xrange(1,5))
feat.extend(i for i in xrange(7,20))
feat.extend(i for i in xrange(22,28))
label = [i for i in xrange(47,53)]
for i in xrange(0,len(feat)):
    print i, feat[i], header[feat[i]]
# for i in xrange(0,len(feat)):
#     print i+len(feat), header[feat[i]]
# confu1 = [301,1002,303,703,1803,905,1105,1806,2006,208,308,1808,2108,2208,2408,2508,2808,3308,909,111,411,112,512,812,912,1612,413,513,813,1013,1113,114,414,115,215,315,515,615,715,117,417,517,2020,2021,722,922,1022,1222,1322,1422,1722,1822,623,1523,1623,1723,1823,1923,2023,2123,2223,2323,2423,3023,3723,3823,4423,4723,4823,4923,5023,2624,127,227,327,427,527,627,727,827,927,1027,1227,1427,1527,1627,1727,1827,1927,2827,2927,3027,3227,3427,1028,1828,1928,2028,2128,2228,229,529,629,729,929,1629,2629,833,2533]
# print xx
for i in xrange(len(xx)):
    xxx = []
    yyy = []
    # if int(xx[i][3]) not in confu1:
    #     continue
    # if int(xx[i][label[0]])==14:
    #     continue
    # if int(xx[i][label[0]])==11:
    #     continue
    # states = [0 for k in xrange(100)]
    # states[int(xx[i][7])] = 1
    # state.append(states)
    for k in feat:
        xxx.append(float(xx[i][k]))
    x.append(xxx)
    for k in label:
        yyy.append(int(xx[i][k][:1]))
    yy.append(yyy)
x = np.array(x)

# x2 = normalize(x,axis=1)
# x = np.concatenate((x,x2),axis=1)
# x = np.concatenate((x,state),axis=1)
# x = x2

# x = np.random.random_integers(0,10000,558)
# x=x.reshape((len(x),1))
yy = np.array(yy)
label_id = 1

y=yy[:,label_id-1:label_id]
y=y.reshape(len(x))
# for i in xrange(len(y)):
#     if y[i]<13:
#         y[i]=2
#     else:
#         y[i]=1

print y.shape
print x.shape
from sklearn.svm import SVC
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import f1_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.model_selection import cross_val_predict
from matplotlib import pyplot as plt
import itertools
# clf = SVC()
# clf = RandomForestClassifier()

def plot_confusion_matrix(cm, classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    """
    This function prints and plots the confusion matrix.
    Normalization can be applied by setting `normalize=True`.
    """
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        print("Normalized confusion matrix")
    else:
        print('Confusion matrix, without normalization')

    print(cm)

    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')


clf = ExtraTreesClassifier(random_state=1, n_estimators=200)
header[label[0]] = 'Source of Lighting'
header[label[1]] = 'Source of Water'
header[label[5]] = 'Employment'
for i in [0,1,5]:
    label_id = i+1
    y = yy[:, label_id - 1:label_id]
    y = y.reshape(len(x))
    clf.fit(x,y)
    # y_pred = clf.predict(x)
    y_pred = cross_val_predict(clf,x,y,cv=5)
    print(header[label[label_id-1]])
    print(confusion_matrix(y,y_pred))
    print(accuracy_score(y,y_pred))
    plt.figure()
    classes = ['Under','Moderate','High']
    plot_confusion_matrix(confusion_matrix(y,y_pred), classes=classes, normalize=True,
                          title=header[label[label_id-1]])
    plt.show()
    # print(f1_score(y,y_pred,average='macro'))
import sys
# for i in xrange(len(y)):
#     if y[i]==11 and y_pred[i]==14:
#         print xx[i]
# # for i in xrange(len(y)):
# #     if y[i]!=y_pred[i]:
# #         sys.stdout.write(xx[i][3]+',')
#
# importances = clf.feature_importances_
# std = np.std([tree.feature_importances_ for tree in clf.estimators_],
#              axis=0)
# indices = np.argsort(importances)[::-1]
#
# print("Feature ranking:")
#
# for f in range(20):
#     print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))
# import matplotlib.pyplot as plt
#
# plt.figure()
# plt.title("Feature importances")
# plt.bar(range(x.shape[1]), importances[indices],
#        color="r", yerr=std[indices], align="center")
# plt.xticks(range(x.shape[1]), indices)
# plt.xlim([-1, x.shape[1]])
# plt.savefig(header[label[label_id-1]])
# plt.show()
#
