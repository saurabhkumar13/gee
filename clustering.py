import csv
import numpy as np
from sklearn.metrics import confusion_matrix
from sklearn import cluster
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics
from sklearn.preprocessing import normalize
import matplotlib.pyplot as plt

v_codes = []
x = []
y = []
ded = 0
with open('b_vill_stuff_Village_Level.csv') as f:
    reader = csv.reader(f)
    rownum = 0
    for row in reader:
        if rownum == 0:
            header = row
        else:
            xx = []
            if row[1] == '' or row[7] == '':# or (float(row[1])<2e-1 and float(row[2])<2e-1):
                ded += 1
                continue
            for i in xrange(1,5):
                if row[i]!='':
                    xx.append(float(row[i]))
                else:
                    xx.append(0)
            x.append(xx)
            v_codes.append(row[0])
            yy = []
            for i in xrange(7, 12):
                yy.append(int(row[i]))
            y.append(yy)
        rownum += 1
X = np.array(x)
X2 = X
X = X[:,:4]
X = normalize(X,norm='l2',axis=0)
print X[1]
print header
print X.shape

db = cluster.KMeans(n_clusters = 4, random_state=0).fit(X)
# db = cluster.DBSCAN(eps=0.0008, min_samples=10).fit(X)
labels = db.labels_

# Number of clusters in labels, ignoring noise if present.
n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)
data_to_plot = [[[] for j in xrange(n_clusters_)] for i in xrange(4)]
sets = [set([]) for i in xrange(n_clusters_)]
o = []
l = 2
print labels
conf = [[0 for i in xrange(4)] for i in xrange(n_clusters_)]
for i in xrange(len(labels)):
    for j in xrange(4):
        data_to_plot[j][labels[i]].append(X[i][j])
    sets[labels[i]].add(v_codes[i])
    conf[labels[i]][y[i][l]-11] += 1
    if labels[i] == 2 and y[i][l] == 11:
        print v_codes[i]

for i in xrange(n_clusters_):
    print i,len(data_to_plot[0][i])
print "ded villages ", ded
print('Estimated number of clusters: %d' % n_clusters_)
# print("Silhouette Coefficient: %0.3f"
#       % metrics.silhouette_score(X, labels))
conf = np.array(conf)
print(conf)
fig = plt.figure(1, figsize=(9, 6))
for i in xrange(4):
    ax = fig.add_subplot(221+i)
    bp = ax.boxplot(data_to_plot[i])
fig.show()
# print(ds1)
# data_to_plot = ds2
# fig.show()

f = open('clusters.csv','wb')
f.write('v_vode,label\n')
for i in xrange(4):
    for item in (sets[i]):
        f.write(str(item)+','+str(i+1)+'\n')
f.close()