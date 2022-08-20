import logging

#Creating and Configuring Logger

class log:
    _Log_Format = "%(levelname)s %(asctime)s - %(message)s"
    logging.basicConfig(filename = "socket.log",
                        filemode = "w",
                        format = _Log_Format, 
                        level = 40)
    logger = logging.getLogger()
    _handler = logging.FileHandler('./log/socket.log')
    logger.addHandler(_handler)

    @staticmethod
    def writeLog(message):
        log.logger.error(message)

if __name__ == '__main__':
    log.writeLog('ewfwefwef')