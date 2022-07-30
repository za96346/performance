from backend import app 
import sys,os
sys.path.append(os.path.dirname(os.path.abspath(__file__))+'/package')
sys.path.append(os.path.dirname(os.path.abspath(__file__))+'\package')
from package.dotenv import load_dotenv
#from package.gevent import monkey
#monkey.patch_all()
import multiprocessing

load_dotenv()

curProjectRootPath = os.getcwd()


#連接等待的最大上限
backlog=2048

# 並行工作進程數
workers = multiprocessing.cpu_count() * 2 + 1 

# 指定每個工作者的線程數
threads = multiprocessing.cpu_count()*2
# 端口 5000
bind = os.getenv('BACKEND_HOST') + ':' + os.getenv('BACKEND_PORT')
# 設置守護進程,將進程交給supervisor管理


print('workers',workers)
print('threads',threads)
print('total',workers*threads)

daemon = 'false'
# 工作模式協程
worker_class = 'gevent'
# 設置最大併發量
worker_connections = 2000
# 設置進程文件目錄
pidfile = 'log/gunicorn.pid'
# 設置訪問日誌和錯誤信息日誌路徑
accesslog = "log/gunicorn_access.log"
errorlog = "log/gunicorn_error.log"
access_log_format='%(h)s %(l)s %(u)s %(t)s'
loglevel = "debug"
# 設置日誌記錄水平
loglevel = 'warning'

limit_request_fields=1000



#x_forwarded_for_header = 'X-FORWARDED-FOR'


#gunicorn --config gunicorn.conf.py backend:app


#worker_class {
#   sync 底層實作是每個請求都由一個 process 處理。
#   gthread 則是每個請求都由一個 thread 處理。
#   eventlet、gevent、tarnado 底層則是利用非同步 IO 讓一個 process 在等待 IO 回應時繼續處理下個請求。
# }
