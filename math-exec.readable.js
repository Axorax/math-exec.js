const operators = {
    '**': {
        p: 2,
        a: 'right',
        fn: (a, b) => Math.pow(a, b)
    },
    '+': {
        p: 1,
        a: 'left',
        fn: (a, b) => a + b
    },
    '-': {
        p: 1,
        a: 'left',
        fn: (a, b) => a - b
    },
    '*': {
        p: 2,
        a: 'left',
        fn: (a, b) => a * b
    },
    '/': {
        p: 2,
        a: 'left',
        fn: (a, b) => a / b
    },
    '%': {
        p: 2,
        a: 'left',
        fn: (a, b) => a % b
    },
    '^': {
        p: 2,
        a: 'right',
        fn: (a, b) => Math.pow(a, b)
    },
    '//': {
        p: 2,
        a: 'left',
        fn: (a, b) => Math.floor(a / b)
    },
    'log': {
        p: 4,
        a: 'left',
        fn: (a, b) => Math.log(b) / Math.log(a || Math.E)
    },
    'log10': {
        p: 4,
        a: 'left',
        fn: (a) => Math.log10(a)
    },
    'min': {
        p: 1,
        a: 'left',
        fn: (...args) => args.length ? Math.min(...args) : NaN
    },
    'max': {
        p: 1,
        a: 'left',
        fn: (...args) => args.length ? Math.max(...args) : NaN
    },
    'random': {
        p: 4,
        a: 'left',
        fn: (min, max) => Math.floor(Math.random() * (max - min)) + min
    },
    'sqrt': {
        p: 4,
        a: 'left',
        fn: (a) => Math.sqrt(a)
    },
    'abs': {
        p: 4,
        a: 'left',
        fn: (a) => Math.abs(a)
    },
    'round': {
        p: 4,
        a: 'left',
        fn: (a) => Math.round(a)
    },
    'ceil': {
        p: 4,
        a: 'left',
        fn: (a) => Math.ceil(a)
    },
    'floor': {
        p: 4,
        a: 'left',
        fn: (a) => Math.floor(a)
    },
    'sin': {
        p: 4,
        a: 'left',
        fn: (a) => Math.sin(a)
    },
    'cos': {
        p: 4,
        a: 'left',
        fn: (a) => Math.cos(a)
    },
    'tan': {
        p: 4,
        a: 'left',
        fn: (a) => Math.tan(a)
    },
    'asin': {
        p: 4,
        a: 'left',
        fn: (a) => Math.asin(a)
    },
    'acos': {
        p: 4,
        a: 'left',
        fn: (a) => Math.acos(a)
    },
    'atan': {
        p: 4,
        a: 'left',
        fn: (a) => Math.atan(a)
    },
    'exp': {
        p: 4,
        a: 'left',
        fn: (a) => Math.exp(a)
    },
    'floorDiv': {
        p: 2,
        a: 'left',
        fn: (a, b) => Math.floor(a / b)
    },
    'mod': {
        p: 2,
        a: 'left',
        fn: (a, b) => ((a % b) + b) % b
    },
    'roundTo': {
        p: 2,
        a: 'left',
        fn: (a, b) => Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
    },
    'cbrt': {
        p: 4,
        a: 'left',
        fn: (a) => Math.cbrt(a)
    },
    'expm1': {
        p: 4,
        a: 'left',
        fn: (a) => Math.expm1(a)
    },
    'hypot': {
        p: 1,
        a: 'left',
        fn: (...args) => Math.hypot(...args)
    },
    'sign': {
        p: 4,
        a: 'left',
        fn: (a) => Math.sign(a)
    },
    'trunc': {
        p: 4,
        a: 'left',
        fn: (a) => Math.trunc(a)
    },
};

function mathExec(expression) {
    const tokenize = expression => expression.match(/-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?|[a-zA-Z]+|[+\-*/%^()]+|\*\*/g).filter(token => !/^\s+$/.test(token));
    const isNumber = token => /^-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/i.test(token);
    const toPostfix = tokens => {
        const output = [];
        const stack = [];
        for (const token of tokens) {
            if (isNumber(token)) {
                output.push(token);
            } else if (token in operators) {
                while (stack.length && stack[stack.length - 1] in operators && ((operators[token].a === 'left' && operators[token].p <= operators[stack[stack.length - 1]].p) || (operators[token].a === 'right' && operators[token].p < operators[stack[stack.length - 1]].p))) {
                    output.push(stack.pop());
                }
                stack.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                while (stack.length && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop());
                }
                stack.pop();
            }
        }
        return output.concat(stack.reverse());
    };
    const evaluatePostfix = postfix => {
        const stack = [];
        for (const token of postfix) {
            if (isNumber(token)) {
                stack.push(parseFloat(token));
            } else if (token in operators) {
                const operator = operators[token];
                const numArgs = operator.fn.length;
                if (numArgs === Infinity) {
                    const operands = stack.splice(-stack.length);
                    stack.push(operator.fn(...operands));
                } else {
                    const operands = stack.slice(-numArgs);
                    stack.splice(-numArgs);
                    stack.push(operator.fn(...operands));
                }
            }
        }
        return stack.pop();
    };

    return evaluatePostfix(toPostfix(tokenize(expression)));
}