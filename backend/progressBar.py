import time

def bar(progressName,i,n):


    one_percent=round(n/100,2)#每個百分比為多少
    present_percent=int(i/one_percent)+1#目前的百分比
    #time.sleep(0.01)
    present_percent=min(present_percent,100)
    
    if int(i%one_percent)==0:
        print(f'\r{progressName}: [{"#"*present_percent}{" "*(100-present_percent)}] {present_percent}%', end='')   # 輸出不換行的內容
    if i==n-1:
        print(f'\r{progressName}: [{"#"*100}{" "*(100-100)}] {100}%', end='') 
        print()