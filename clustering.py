import csv
import numpy as np
from sklearn import cluster
from sklearn import metrics
from sklearn.preprocessing import normalize
import matplotlib.pyplot as plt

v_codes = []
x = []
ded = 0
with open('b_vill_stuff.csv') as f:
    reader = csv.reader(f)
    rownum = 0
    for row in reader:
        if rownum == 0:
            header = row
        else:
            xx = []
            if row[1] == '' or (float(row[1])<2e-1 and float(row[2])<2e-1):
                ded += 1
                continue
            for i in xrange(1,5):
                if row[i]!='':
                    xx.append(float(row[i]))
                else:
                    xx.append(0)
            x.append(xx)
            v_codes.append(row[5])
        rownum += 1
X = np.array(x)
X2 = X
X = X[:,:1]
X = normalize(X,norm='l2',axis=0)
print X[1]
print header
print X.shape

db = cluster.DBSCAN(eps=0.0008, min_samples=10).fit(X)
core_samples_mask = np.zeros_like(db.labels_, dtype=bool)
core_samples_mask[db.core_sample_indices_] = True
labels = db.labels_

# Number of clusters in labels, ignoring noise if present.
n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)
ds1 = [[] for i in xrange(n_clusters_)]
ds2 = [[] for i in xrange(n_clusters_)]
o = []
print labels
for i in xrange(len(labels)):
    ds1[labels[i]].append(X2[i][0])
    ds2[labels[i]].append(X2[i][1])
    if labels[i] == 1:
        print "\t",v_codes[i]
for i in xrange(n_clusters_):
    print i,len(ds1[i])
print "ded villages ", ded
print('Estimated number of clusters: %d' % n_clusters_)
print("Silhouette Coefficient: %0.3f"
      % metrics.silhouette_score(X, labels))

fig = plt.figure(1, figsize=(9, 6))
data_to_plot = ds1
fig.show()
data_to_plot = ds2
fig.show()

