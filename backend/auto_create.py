from database import insert_to_table_banch,select_user_banch,insert_to_table_user,insert_to_table_performance_per_month
import database_init 
import random
from progressBar import bar



banch_list=['保育組','公關組','社工組']
account_list=['personalBabysitter2','personalBabysitter1','managerBabysitter'
            ,'personalPublicRelations1','managerPublicRelations','personalPublicRelations2'
            ,'personalSocialWorker1','managerSocialWorker','personalSocialWorker2','admin1','admin2']
password='test0000'
goal_list=[''' 1.準時繳交記錄。
3.參與研習及課程，提昇專業能力。
2.方案交接、知會能確實，減少行政疏失。'''
,'''1、落實外賓、車輛、貨物管控。
2、出車零事故、提醒車輛保養定檢。
3、交付事項確時完成並積極幫助家園事務。 '''
,'''1、食物存放區，保持清潔。並分類管理
2、廚房自主管理
3、活動餐點主導。''',
'''1、落實外賓、車輛、貨物管控。
2、出車零事故、提醒車輛保養定檢。
3、交付事項確時完成並積極幫助家園事務。 '''
,'''1、外出必須告知辦公室人員。
2、出帳帳款無誤。
3、交班交接事項盡速處理。 '''
,'''1、外出需求提前告知
2、臨時交辦業務可準時完成
3.、已不加班為原則，準時交付會計作業。 '''
,'''1、進廚房及離開廚房詢問是否供餐有疑問
2、廚房自主管理 '''
,'''1、落實外賓、車輛、貨物管控。
2、出車零事故
3、交班交接事項，佈達無誤。 '''
            ]
describes_list=[
            '1.方案執行確實。2.季核銷效率待加強。',
            ' 工作認真負責,積極主動,能完全勝任本職工作',
            '平時積極，配合度較好，處處為公司考慮',
            '工作認真負責，積極主動，能完全勝任本職工作，責任心強。',
            '樂于助人，善于合作，配合意識佳。',
            '工作認真負責，愛崗敬業。建議：遇事要冷靜處理',
            '樂觀上進，工作認真負責，樂于助人',
            '工作認真勤奮，吃苦耐勞。建議多與其他夥伴接觸。',
            '工作認真勤奮。']




def dynamic_create_banch():
    i=0
    for banch in banch_list:
        insert_to_table_banch(banch)
        bar('新增部門組別',i,len(banch_list))
        i+=1

def dynamic_create_employee():

    i=0
    for account in range(0,len(account_list)):
        if account_list[account].find("admin")!=-1:
            permession='admin'
            position='管理員'
        elif account_list[account].find("personal")!=-1:
            permession='personal'
            position='一般職員'
        else:
            permession='manager'
            position='主管'

        if account_list[account]=='admin1':
            banch= 'admin'
        
        if account_list[account]=='admin2':
            banch= 'admin'
        elif account_list[account].find('Babysitter')!=-1:
            banch=banch_list[0]
        elif account_list[account].find('PublicRelations')!=-1:
            banch=banch_list[1]
        elif account_list[account].find('SocialWorker')!=-1:
            banch=banch_list[2]
        insert_to_table_user([account_list[account],password,account_list[account],banch,account,random.randint(90,100),position,'on'])
        bar('新增員工',i,len(account_list))
        i+=1



def dynamic_create_performance_per_month_and_attend_fettle():
    i=0
    for year in range(100,120):
        for account in range(0,len(account_list)-2):
            for month in range(1,13):
                
                random_int_a=random.randint(1,10)
                random_int_e=random.randint(1,10)
                random_int_p=random.randint(1,10)
                random_int_be_late=random.randint(1,3)
                random_int_day_off=random.randint(1,3)
                
                insert_to_table_performance_per_month(goal_list[random.randint(0,7)],year,month,account_list[account],select_user_banch(account_list[account]),random_int_a,random_int_e,random_int_p,describes_list[random.randint(0,len(describes_list)-1)],random_int_be_late,random_int_day_off)
                bar('新增每月績效和出席狀況',i,2160)
                i+=1




if __name__=='__main__':
    database_init.init()
    dynamic_create_banch()
    dynamic_create_employee()

    dynamic_create_performance_per_month_and_attend_fettle()