from flask import Flask, jsonify, render_template
from flasgger import Swagger, swag_from

from services.logger import AppLogger

from speetto import get_speetto_data

app = Flask(__name__)
swagger = Swagger(app)
logger = AppLogger('myapp', 'app.log').get_logger()


@app.route('/api/speetto')
@swag_from('./apidocs/speetto.yml')
def get_speetto():
    speetto_data = [x for x in get_speetto_data() if x is not None]
    logger.info('speetto data: {}'.format(speetto_data))
    return jsonify({"data": speetto_data})
