from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

from app import app

app.debug = True

app.run()
# http_server = HTTPServer(WSGIContainer(app))
# http_server.listen(3000)
# IOLoop.instance().start()
