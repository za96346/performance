import os
import glob
from dotenv import load_dotenv
load_dotenv()
word_storage_path=os.getenv('WORD_STORAGE_PATH')
word_demo_path=os.getenv('WORD_DEMO_PATH')
from pathlib import Path
import sys
sys.path.append('/Users/admin/Downloads/code/dajia/backend/package')
from package.docx2pdf import convert

def convert_file(origin_file_path,output_pdf_path):
    convert(origin_file_path,output_pdf_path)


if __name__=='__main__':
    convert(word_demo_path,word_storage_path)