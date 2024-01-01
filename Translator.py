Dict = {'>': '아',
    '<': '라',
    '+': '하',
    '-': '시',
    '.': '뿡',
    ',': '빵',
    '[': '타',
    ']': '비',}

def bf_to_it(t):
    return t.replace('>', '아').replace('<', '라').replace('+', '하').replace('-', '시').replace('.', '뿡').replace(',', '빵').replace('[', '타').replace(']', '비')

def it_to_bf(t):
    return t.replace('아', '>').replace('라', '<').replace('하', '+').replace('시', '-').replace('뿡', '.').replace('빵', ',').replace('타', '[').replace('비', ']')

while True:
    code = input()

    if '>' in code or '<' in code or '+' in code or '-' in code or '.' in code or ',' in code or '[' in code or ']' in code:
        print(bf_to_it(code))
    elif '아' in code or '라' in code or '하' in code or '시' in code or '뿡' in code or '빵' in code or '타' in code or '비' in code:
        print(it_to_bf(code))

#++++[++++>---<]>+.>--[-->+++<]>-.>+[--->++<]>++.[-->+++++<]>.--[-->+++++<]>-.[--->++<]>.+[->+++<]>+.[-->+<]>--.+[->+++<]>++.--[--->+<]>-.[->+++++++<]>+.>+++[->+++++++<]>.
