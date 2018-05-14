fw = open('Vill2.csv','wb')
with open('Vill.csv','rb') as fr:
    for l in fr:
        print l
        exit(0)
        l = l.split(',')
        try:
            l[42]=''
            fw.write(l[5]+","+l[31][:1]+","+l[33][:1]+","+l[35][:1]+","+l[37][:1]+","+l[39][:1]+","+l[41][:1]+'\n')
        except:
            print l