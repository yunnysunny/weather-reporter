#coding: utf-8
'''
Created on 2013-12-06

@author: xuechong
'''

import urllib2
from urllib2 import URLError, HTTPError

def getWeather(cityId):
    header ={'User-Agent':'mozilla/5.0 (windows; U; windows NT 5.1; zh-cn)'}
    req=urllib2.Request(u"http://m.weather.com.cn/data/" + cityId +u".html",None,header)
    try:
        response = urllib2.urlopen(req)
    except HTTPError,he:
        print('HttpError')
        print('status code: ', he.code)
        return '[]'
    except URLError, ue:
        if hasattr(ue, 'reason'):
            print 'Reason: ', ue.reason
        if hasattr(ue, 'code'):
            print 'Error code: ', ue.code
        return '[]'
    return response.read()

if __name__=="__main__":
    print (getWeather("1010101001"))
    pass