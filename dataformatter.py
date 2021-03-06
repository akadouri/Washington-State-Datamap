import re

fips = ["01", "03", "05", "07", "09", "11", "13", "15", "17", "19", "21", "23", "25", "27", "29", "31", "33", "35", "37",
        "39", "41", "43", "45", "47", "49", "51", "53", "55", "57", "59", "61", "63", "65", "67", "69", "71", "73", "75",
        "77"]

#2012 median income
data = ["42,354","41,703","62,739","47,265","41,887","56,054","39,461","42,752","48,050","37,548","56,221","45,187","45,021","40,354","55,091","46,651","68,313","57,155","43,098","44,825","41,208","45,690","48,804",
"35,848","38,018","37,755","57,162","55,025","56,443","52,401","64,033","48,265","41,643","62,009","45,624","46,147","51,268","32,570","42,162"]

def getcolor( str ):
   val = int(re.sub(',', '', str))
   if val > 65000:
       return "top1"
   elif val > 60000:
       return "top2"
   elif val > 55000:
       return "top3"
   elif val > 50000:
       return "top4"
   elif val > 45000:
       return "top5"
   elif val > 40000:
       return "top6"
   elif val > 35000:
       return "top7"
   elif val > 30000:
       return "top8"
# "01": {
#    turnout: '39.07%'
#  },
print "{"
for x in range(0,len(fips)):
    print "'" + fips[x] +  "' : {"
    print "income: " + "'" + data[x] + "',"
    print "fillKey: " + "'" + getcolor(data[x]) + "'"
    print "},"
