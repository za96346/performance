from asyncio import protocols
import json
import redis
import os
from package.dotenv import load_dotenv
import subprocess

redisUserList = 'user'

class redisdb(redis.Redis):
    def __init__(self, host, port, db):
        super().__init__(host, port, db, decode_responses = True)
        self.arr = ['jack', 'json', 'mike','']
        self.dic = {
            'add': 'j',
            'ijief': 90,
        }
        self._test()
        subprocess.run(["redis-cli", "flushall"])#run command to cleer redis DB when this class be instanced everyTime

    def _test(self):
        self.set('foo', 'bar')
        print('\n---------------------------------------Redis test------------------------------------')
        print(self.get('foo'))
        for item in self.arr:
            self.lpush('test', item)
        self.hmset('dic', self.dic)
        print('arr len => ', self.lpop('test', self.llen('test')))
        print('dic => ', self.hgetall('dic'))

    def saveUser(self, data):
        isDuplication, duplicateIndex = self.storeDeduplication(data, self.lrange(redisUserList, 0, -1))
        if isDuplication:
            #update the duplication user"s sid
            self.lset(redisUserList, duplicateIndex, self.jen(data))
        else:
            #not duplicate then insert
            self.rpush(redisUserList, self.jen(data))
        self.persist(redisUserList)
        self.Deduplication(redisUserList, 0, -1)

    def leaveRoom(self, sid):
        listDb = self.lrange(redisUserList, 0, -1)
        for item in listDb:
            if self.jde(item)['sid'] == sid:
                self.lrem(redisUserList, 1,item)
        

    def selectUserAll():
        pass

    def selectUserSelf(sid):
        pass

    def storeDeduplication(self, storeData, target):
        #please give the origin of target takes json dumps
        for item in target:
            if self.jde(item)['user'] == storeData['user']:
                return True, target.index(item)
        
        return False, -1
    
    def Deduplication(self, dbName, start, end):
        data = self.lrange(redisUserList, start, end)
        temp = []
        for item in data:
            if self.jde(item) not in temp:
                temp.append(self.jde(item))
        #print('user list => ', temp)
        print('房間總人數 => ', self.llen(redisUserList))
        return temp


    def jen(self, data):
        #json encode
        return json.dumps(data)

    def jde(self, data):
        if type(data) is list:
            temp = []
            for  item in data:
               temp.append(json.loads(item)) 
            return temp
        #json decode
        return json.loads(data)


if __name__ == '__main__':
    load_dotenv()
    host = os.getenv('REDIS_DB_HOST')
    port = int(os.getenv('REDIS_DB_PORT'))
    r = redisdb(host, port, db=0)
    r.saveUser({'id': 'bitch', 3: 6})

