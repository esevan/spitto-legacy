import logging
import sys


class AppLogger(object):

    def __init__(self, logger_name, logger_path=None):
        self._create_logger(logger_name, logger_path)

    def _create_logger(self, logger_name, logger_path):
        if logger_path is None:
            logger_path = '/tmp/{}.log'.format(logger_name)

        file_handler = logging.FileHandler(filename=logger_path)
        stdout_handler = logging.StreamHandler(sys.stdout)
        handlers = [file_handler, stdout_handler]

        logging.basicConfig(
            level=logging.DEBUG,
            format='[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s',
            handlers=handlers
        )

        logger = logging.getLogger(logger_name)
        self.logger = logger

    def get_logger(self):
        return self.logger
