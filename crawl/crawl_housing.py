import urllib2
import re
import requests

url_base = 'http://censusindia.gov.in/pca/pcadata/'
url_housing = 'pca.html'
cont = urllib2.urlopen(url_base+url_housing).read()
urls = re.findall(r'href =[\'"]?([^\'" >]+)', cont)
urls = ['Houselisting-housing-BR.html']
i = 0
for url in urls:
    # if i == 0:
    #     i=1
    #     continue
    cont = urllib2.urlopen(url_base+url).read()
    urls_xls = re.findall(r'href=[\'"]?([^\'">]+)', cont)
    print urls_xls
    for url in urls_xls:
        if(url[-4:-1]!='xls'):
            continue
        url = url.replace(" ","%20")
        resp = requests.get(url_base+url)
        output = open(url[:-17]+'.xlsx', 'wb')
        output.write(resp.content)
        output.close()
        # print 'getting ', url[:]
