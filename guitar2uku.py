class Notes:
    A2, B2, C2, D2, E2, F2, G2, \
    A21, B21, C21, D21, E21, F21, G21, \
    A3, B3, C3, D3, E3, F3, G3, \
    A31, B31, C31, D31, E31, F31, G31, \
    A4, B4, C4, D4, E4, F4, G4, \
    A41, B41, C41, D41, E41, F41, G41, \
    A5,B5,C5,D5,E5,F5,G5,\
    A51,B51,C51,D51,E51,F51,G51 = range(56)
    @classmethod
    def tostring(cls, val):
        for k,v in vars(cls).iteritems():
            if v == val:
                return k

uku = [
    [Notes.G4,Notes.G41,Notes.A4,Notes.B41,Notes.B4,Notes.C5,Notes.C51,Notes.D5,Notes.E51,Notes.E5,Notes.F5,Notes.F51,Notes.G5],
    [Notes.C4,Notes.C41,Notes.D4,Notes.E41,Notes.E4,Notes.F4,Notes.F41,Notes.G4,Notes.G41,Notes.A4,Notes.B41,Notes.B4,Notes.C5],
    [Notes.E4,Notes.F4,Notes.F41,Notes.G4,Notes.G41,Notes.A4,Notes.B41,Notes.B4,Notes.C5,Notes.C51,Notes.D5,Notes.E51,Notes.E5],
    [Notes.A4,Notes.B41,Notes.B4,Notes.C5,Notes.C51,Notes.D5,Notes.E51,Notes.E5,Notes.F5,Notes.F51,Notes.G5,Notes.G51,Notes.A5]]

guitar = [
    [Notes.E2,Notes.F2,Notes.F21,Notes.G2,Notes.G21,Notes.A2,Notes.B21,Notes.B2,Notes.C3,Notes.C31,Notes.D3,Notes.E31,Notes.E3],
    [Notes.A2,Notes.B21,Notes.B2,Notes.C3,Notes.C31,Notes.D3,Notes.E31,Notes.E3,Notes.F3,Notes.F31,Notes.G3,Notes.G31,Notes.A3],
    [Notes.D3,Notes.E31,Notes.E3,Notes.F3,Notes.F31,Notes.G3,Notes.G31,Notes.A3,Notes.B31,Notes.B3,Notes.C4,Notes.C41,Notes.D4],
    [Notes.G3,Notes.G31,Notes.A3,Notes.B31,Notes.B3,Notes.C4,Notes.C41,Notes.D4,Notes.E41,Notes.E4,Notes.F4,Notes.F41,Notes.G4,Notes.G41,Notes.A4,Notes.B41,Notes.B4,Notes.C5],
    [Notes.B3,Notes.C4,Notes.C41,Notes.D4,Notes.E41,Notes.E4,Notes.F4,Notes.F41,Notes.G4,Notes.G41,Notes.A4,Notes.B41,Notes.B4,Notes.C5,Notes.C51,Notes.D5,Notes.E51,Notes.E5],
    [Notes.E4,Notes.F4,Notes.F41,Notes.G4,Notes.G41,Notes.A4,Notes.B41,Notes.B4,Notes.C5,Notes.C51,Notes.D5,Notes.E51,Notes.E5,Notes.F5,Notes.F51,Notes.G5,Notes.G51,Notes.A5]]

def getUku(note):

    for x in xrange(0,4):
        for y in xrange(0,13):
            if(uku[x][y]==note):
                print (x+1),"string,",y,"fret;"

        print "---------------"
def seq(s,down):
    for note in s:
        note += 14*down
        print Notes.tostring(note)
        getUku(note)

l_theme = [guitar[5][9],guitar[5][12],guitar[4][9],guitar[4][8],guitar[4][1]]

seq(l_theme, 0 )

