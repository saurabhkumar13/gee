import csv
import numpy as np
xx = []
x = []
y = []
yy = []
with open('Merge of out and vill2 (1).csv','rb') as f:
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
label = [i for i in xrange(6,11)]

for i in xrange(0,len(feat)):
    print i, header[feat[i]]


for i in xrange(len(xx)):
    # if xx[i][label[0]] == '' or xx[i][1] == '':
    #     continue
    if xx[i][feat[0]] == '':
        continue
    xxx = []
    yyy = []
    for k in feat:
        xxx.append(float(xx[i][k]))
    x.append(xxx)
    for k in label:
        yyy.append(int(xx[i][k][:1]))
    yy.append(yyy)

x = np.array(x)
yy = np.array(yy)
label_id = 2
y=yy[:,label_id-1:label_id]
y=y.reshape(len(x))
print y.shape
print x.shape
#
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.metrics import f1_score
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
# importances = clf.feature_importances_
# std = np.std([tree.feature_importances_ for tree in clf.estimators_],
#              axis=0)
# indices = np.argsort(importances)[::-1]
#
# print("Feature ranking:")
#
# for f in range(len(feat)):
#     print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))
#
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
