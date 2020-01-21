import re
import requests
from bs4 import BeautifulSoup


SPEETTO_MAIN_URL = 'https://dhlottery.co.kr/common.do?method=main'
SPEETTO_REGEX = {
    '1000': [r'1등 5억(.*)매', r'2등 2천(.*)매', r'3등 10만(.*)매', r'출고율(.*)\%'],
    '2000': [r'1등 10억(.*)매', r'2등 1억(.*)매', r'3등 천백(.*)매', r'출고율(.*)\%']
}
SPEETTO_STRUCTURE = {
    '1000': {
        'total': 20000000,
        'first': {
            'full': 4,
            'prize': 500000000
        },
        'second': {
            'full': 20,
            'prize': 20000000
        },
        'third': {
            'full': 11000,
            'prize': 100000
        }
    },
    '2000': {
        'total': 20000000,
        'first': {
            'full': 4,
            'prize': 1000000000
        },
        'second': {
            'full': 12,
            'prize': 100000000
        },
        'third': {
            'full': 100,
            'prize': 11000000
        }
    }
}


def parse_speetto(speetto_res):
    if type(speetto_res) is not list or len(speetto_res) != 6:
        return None
    
    parse_left = lambda regex, left_string: int(re.split(regex, left_string)[1])
    parse_ratio = lambda regex, left_string: float(re.split(regex, left_string)[1])
    
    if '스피또 1000' in speetto_res[0]:
        speetto_type = '1000'
    elif '스피또 2000' in speetto_res[0]:
        speetto_type = '2000'
    else:
        return None
        
    return dict(
        type=speetto_type,
        title=speetto_res[0],
        first_left=parse_left(SPEETTO_REGEX[speetto_type][0], speetto_res[2]),
        second_left=parse_left(SPEETTO_REGEX[speetto_type][1], speetto_res[3]),
        third_left=parse_left(SPEETTO_REGEX[speetto_type][2], speetto_res[4]),
        publish_rate=parse_ratio(SPEETTO_REGEX[speetto_type][3], speetto_res[5])
    )

def _get_speetto_data():
    res = requests.get(SPEETTO_MAIN_URL)
    if not res.ok:
        return None
    
    html_doc = res.text
    soup = BeautifulSoup(html_doc)
    
    speetto_result_list = soup.find_all("div", "speetto-result")
    
    parsing_speetto_result = lambda m_soup: [ token for token in m_soup.get_text().split('\n') if token ]
    
    return [parse_speetto(parsing_speetto_result(speetto_res)) for speetto_res in speetto_result_list]

def _speetto_data_to_res(data):
    if data is None:
        return None

    speetto_type = data['type']

    return dict(
        title=data['title'],
        first=dict(**SPEETTO_STRUCTURE[speetto_type]['first'], left=data['first_left']),
        second=dict(**SPEETTO_STRUCTURE[speetto_type]['second'], left=data['second_left']),
        third=dict(**SPEETTO_STRUCTURE[speetto_type]['third'], left=data['third_left']),
        total=SPEETTO_STRUCTURE[speetto_type]['total'],
        publishRate=data['publish_rate']
    )

def get_speetto_data():
    datas = _get_speetto_data()
    return [_speetto_data_to_res(data) for data in datas if data is not None]
