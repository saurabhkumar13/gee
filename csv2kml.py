import csv
g = open('gee_bihar.kml','w')
g.write('<?xml version="1.0" encoding="UTF-8"?>\n'+
        '<kml xmlns="http://www.opengis.net/kml/2.2">\n')

def map(polygon):
    k = ''
    for a in polygon:
        if a==' ':
            k+=','
        elif a==',':
            k+=' '
        else:
            k+=a
    return k

with open('gee_bihar.csv','rb') as f:
    reader = csv.reader(f)
    rownum = 0
    for row in reader:
        if rownum == 0:
            header = row
        else:
            g.write('<Placemark>\n')
            g.write('<ExtendedData>\n')
            for i in xrange(1):
                g.write('<Data name="'+header[i]+'"><Value>'+row[i]+'</Value></Data>\n')
            g.write('</ExtendedData>\n')
            g.write((row[1]))
            g.write('</Placemark>\n')
        rownum += 1
g.write('</kml>')
g.close()