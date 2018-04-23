import pandas as pd
from os import listdir
from os.path import isfile, join

onlyfiles = [f for f in listdir('xls') if isfile(join('xls', f))]

for file in onlyfiles:
    data_xls = pd.read_excel('xls/'+file, 'EB-'+file[7:11], index_col=None)
    data_xls.to_csv(file[7:11]+'.csv', encoding='utf-8')