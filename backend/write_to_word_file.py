import sys,os,stat
sys.path.append('/Users/admin/Downloads/code/dajia/backend/package')
from package.docx.enum.text import WD_ALIGN_PARAGRAPH,WD_TAB_ALIGNMENT
import package.docx as docx
from package.docx.oxml.ns import qn
from package.docx.shared import Pt
from dotenv import load_dotenv
from toPDF import convert_file
import asyncio
load_dotenv()
word_storage_path=os.getenv('WORD_STORAGE_PATH')
word_demo_path=os.getenv('WORD_DEMO_PATH')
doc=docx.Document(word_demo_path)
table=doc.tables
table=table[0]

#table.rows=>表格的列
#table.cell(row,col).text=>指定表格位置的文字
#table.cell(row,col).vertical_alignment=WD_ALIGN_PARAGRAPH.CENTER   =>垂直居中
#table.cell(row,col).paragraphs[0].paragraph_format.alignment=WD_TAB_ALIGNMENT.CENTER  =>水平居中

def goal_text(goal_list):
    #goal_list=[goal 1..... , goal 2..... , goal 3.....]
    text1='1、	紀錄繳交 依規定完成  遲交  未完成\n'
    text2='2、	方案執行 依規定完成  遲交  未完成\n'    
    text3='3、	個人目標\n'                               
    text=text1+text2+text3
    maxlen=0
    for goal in goal_list:
        #拿到最大長度
        if len(goal)>maxlen:
            maxlen=len(goal)
    for goal in goal_list:
        #如果小於最大長度就填補空格

        diff=maxlen-len(goal)
        text+='     '+goal+' '*diff+'     '+'已完成  目標持續中\n'


    return text
def performance_text(performance_list):
    #performance_list =>[professional,efficiency,attitude,be_late,day_off_not_on_rule,describes]
    arr=['專業績效:','行政效率:','工作態度:','遲到:','未衣規定請假:','\n績效描述: ']
    text=''
    for i in range(0,len(performance_list)):
        if i==3:
            text+='\n出勤狀況=>'
        text+=arr[i]+str(performance_list[i])+'    '
    return text



def table_cell(row,col):
    return table.cell(row,col).text
def table_horizen_center(row,col):
    #表格字體水瓶致中
    table.cell(row,col).paragraphs[0].paragraph_format.alignment=WD_TAB_ALIGNMENT.CENTER
    return table.cell(row,col)
def table_vertical_center(row,col):
    #表格字體垂直致中
    table.cell(row,col).vertical_alignment=WD_ALIGN_PARAGRAPH.CENTER
    return table.cell(row,col)
def table_horizen_left(row,col):
    #表格字體水平靠左
    table.cell(row,col).paragraphs[0].paragraph_format.alignment=WD_TAB_ALIGNMENT.LEFT
    return table.cell(row,col)
def font_style(style):
    #設定字體
    doc.styles['Normal'].font.name = style
    doc.styles['Normal']._element.rPr.rFonts.set(qn('w:eastAsia'), style)
    return doc


def write_in(date,name,goal_list,performance_list):
    font_style(u'BiauKai')#設定font_style

    table.cell(0,2).text=date
    table.cell(0,4).text=name

    table.cell(1,1).text=goal_text(goal_list)
    table.cell(2,1).text=performance_text(performance_list)

    table_horizen_center(0,2)
    table_horizen_center(0,4)
    table_horizen_left(1,1)#設定靠左
    table_horizen_left(2,1)#設定靠右
    doc.save(word_storage_path+f'{name}_{date}.pdf')

    #os.chmod(word_storage_path,stat.S_IRWXU)

    #convert_file(word_storage_path+f'{name}_{date}.docx',word_storage_path+f'{name}_{date}.pdf')




if __name__=='__main__':
    goal_list=['1.usijwejfi','2.ewfiiwejfoje','3.wafjoiwjefieofjij']
    performance_list=[8,10,7,0,0,'you are very good']

    print(table_cell(0,1),table_cell(0,2),table_cell(0,3),table_cell(0,4))
    print('\n')
    for i in range(1,len(table.rows)):

        result=table.cell(i,0).text+"\n"+table.cell(i,1).text
        print(result,'\n')
    for i in range(1,13):
        write_in(f'101-{i}','jack',goal_list,performance_list)
    print(os.path.dirname(os.path.abspath(__file__)))

    

