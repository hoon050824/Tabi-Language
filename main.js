// From https://github.com/yf-dev/syusuk/blob/master/main.js

var it_bf_map = {
    '아': '>',
    '라': '<',
    '하': '+',
    '시': '-',
    '뿡': '.',
    '빵': ',',
    '타': '[',
    '비': ']',
};

var bf_it_map = {};
for (var key in it_bf_map) {
    bf_it_map[it_bf_map[key]] = key;
}

var output = document.getElementById('output');
var input = document.getElementById('input');
var run_button = document.getElementById('run');

function set_output_dotdotdot() {
    output.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /><line x1="12" y1="12" x2="12" y2="12.01" /><line x1="8" y1="12" x2="8" y2="12.01" /><line x1="16" y1="12" x2="16" y2="12.01" /></svg>';
}
function set_output_off() {
    output.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="3" y1="3" x2="21" y2="21" /><path d="M8.585 4.581c3.225 -1.181 7.032 -.616 9.66 1.626c2.983 2.543 3.602 6.525 1.634 9.662m-1.908 2.108c-2.786 2.19 -6.89 2.665 -10.271 1.023l-4.7 1l1.3 -3.9c-2.237 -3.308 -1.489 -7.54 1.714 -10.084" /></svg>';
}

function run(code) {
    set_output_dotdotdot();
    var is_written = false;
    var program = new Brainfuck(code);
    var output_text = '';
    program.write = function (charCode) {
        if (!is_written) {
            output.innerText = '';
            is_written = true;
        }
        output_text = output_text + String.fromCharCode(charCode);
        try {
            output.innerText = decodeURIComponent(escape(output_text));
        } catch (e) {
            if (e instanceof URIError) {
                // do nothing
            } else {
                throw e;
            }
        }
    };
    program.read = function () {
        return parseInt(prompt('입력 (UTF-8 인코딩하여 1byte씩 16진수로)'), 16);
    };
    program.run();
    if (output.innerText == '') {
        set_output_off();
    }
}

function it_to_bf(code) {
    var re = /(?:아|라|하|시|뿡|빵|타|비)/gi;
    var bf_code = '';
    while ((it_keywords = re.exec(code)) !== null) {
        var it_keyword = it_keywords[0];
        var bf_keyword = it_bf_map[it_keyword];
        bf_code += bf_keyword;
    }
    return bf_code;
}

function bf_to_it(code) {
    var re = /[><+-.,\[\]]/gi;
    var it_code = '';
    while ((bf_keywords = re.exec(code)) !== null) {
        var bf_keyword = bf_keywords[0];
        var it_keyword = bf_it_map[bf_keyword];
        it_code += it_keyword;
    }
    return it_code;
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

run_button.addEventListener('click', function () {
    run(it_to_bf(input.value));
});
input.addEventListener('input', function (e) {
    auto_grow(e.target);
});
input.addEventListener('keypress', function(e) {
    if(e.ctrlKey && e.code === 'Enter') {
        run(it_to_bf(input.value));
    }
})
auto_grow(input);
