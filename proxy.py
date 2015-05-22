# simple proxy
import sys
import os
import mimetypes
import ssl
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from httplib import HTTPConnection, HTTPSConnection

REMOTE_HOST = '127.0.0.1:8087'


class TrafficManagerUIProxy(BaseHTTPRequestHandler):

    def __api_forward(self, method):
	"""
        print '@@@@ V', sys.version_info
        if sys.version_info.micro >= 9:
            conn = HTTPSConnection(REMOTE_HOST, context = ssl._create_unverified_context())
        else:
            conn = HTTPSConnection(REMOTE_HOST)#, context = ssl._create_unverified_context())
	"""
	conn = HTTPConnection(REMOTE_HOST)
        body = None
        length = int(self.headers.get('Content-Length', 0))
        print method, length
        if length > 0:
            body = self.rfile.read(length)
        headers = {}
        for k, v in self.headers.items():
            headers[k] = v
        print '@@@', self.path, body
        conn.request(method, self.path, body, headers)
        res = conn.getresponse()
        self.send_response(res.status)
        for k, v in res.getheaders():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(res.read())

    def do_GET(self):
        if self.path.startswith('/api'):
            self.__api_forward('GET')
        else:
            try:
                filename = os.path.join(os.curdir, self.path[1:])
                with open(filename) as fp:
                    mime = mimetypes.guess_type(self.path)
                    self.send_response(200)
                    self.send_header('Content-Length', os.path.getsize(filename))
                    self.send_header('Content-Type', mime[0])
                    self.end_headers()
                    self.wfile.write(fp.read())
            except Exception as e:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(str(e))

    def do_PUT(self):
        self.__api_forward('PUT')

    def do_DELETE(self):
        self.__api_forward('DELETE')

if __name__ == '__main__':
    mimetypes.init()
    httpd = HTTPServer(('', 8000), TrafficManagerUIProxy)
    httpd.serve_forever()
