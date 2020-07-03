(async () => {
    const gua64Map = {
        11: {
            name: '乾為天'
        },
        12: {
            name: '天澤履'
        },
        13: {
            name: '天火同人'
        },
        14: {
            name: '天雷無妄'
        },
        15: {
            name: '天風姤'
        },
        16: {
            name: '天水訟'
        },
        17: {
            name: '天山遯'
        },
        18: {
            name: '天地否'
        },
        21: {
            name: '澤天夬'
        },
        22: {
            name: '兌為澤'
        },
        23: {
            name: '澤火革'
        },
        24: {
            name: '澤雷隨'
        },
        25: {
            name: '澤風大過'
        },
        26: {
            name: '澤水困'
        },
        27: {
            name: '澤山咸'
        },
        28: {
            name: '澤地萃'
        },
        31: {
            name: '火天大有'
        },
        32: {
            name: '火澤睽'
        },
        33: {
            name: '離為火'
        },
        34: {
            name: '火雷噬嗑'
        },
        35: {
            name: '火風鼎'
        },
        36: {
            name: '火水未濟'
        },
        37: {
            name: '火山旅'
        },
        38: {
            name: '火地晉'
        },
        41: {
            name: '雷天大壯'
        },
        42: {
            name: '雷澤歸妹'
        },
        43: {
            name: '雷火豐'
        },
        44: {
            name: '震為雷'
        },
        45: {
            name: '雷風恆'
        },
        46: {
            name: '雷水解'
        },
        47: {
            name: '雷山小過'
        },
        48: {
            name: '雷地豫'
        },
        51: {
            name: '風天小畜'
        },
        52: {
            name: '風澤中孚'
        },
        53: {
            name: '風火家人'
        },
        54: {
            name: '風雷益'
        },
        55: {
            name: '巽為風'
        },
        56: {
            name: '風水渙'
        },
        57: {
            name: '風山漸'
        },
        58: {
            name: '風地觀'
        },
        61: {
            name: '水天需'
        },
        62: {
            name: '水澤節'
        },
        63: {
            name: '水火既濟'
        },
        64: {
            name: '水雷屯'
        },
        65: {
            name: '水風井'
        },
        66: {
            name: '坎為水'
        },
        67: {
            name: '水山蹇'
        },
        68: {
            name: '水地比'
        },
        71: {
            name: '山天大畜'
        },
        72: {
            name: '山澤損'
        },
        73: {
            name: '山火賁'
        },
        74: {
            name: '山雷頤'
        },
        75: {
            name: '山風蠱'
        },
        76: {
            name: '山水蒙'
        },
        77: {
            name: '艮為山'
        },
        78: {
            name: '山地剝'
        },
        81: {
            name: '地天泰'
        },
        82: {
            name: '地澤臨'
        },
        83: {
            name: '地火明夷'
        },
        84: {
            name: '地雷復'
        },
        85: {
            name: '地風升'
        },
        86: {
            name: '地水師'
        },
        87: {
            name: '地山謙'
        },
        88: {
            name: '坤為地'
        }
    }
    const itime = document.querySelector<HTMLSelectElement>('#itime'),
        inumber = document.querySelector<HTMLInputElement>('#inumber')
    const itimed = document.querySelector<HTMLElement>('#itimed'),
        inumberd = document.querySelector<HTMLElement>('#inumberd')
    const minimum = 1, maximum = 10000;
    function next(maximum: number, minimum: number) {
        return (Math.random() * (maximum - minimum + 1)) << 0;
    }
    function getSafe(r: number, mod: number) {
        const v = r > mod ? (r % mod) : r;
        const n = v === 0 ? mod : v;
        return n;
    }

    function nextN(mod: number, input: string = undefined): { n: number, o: number } {
        const r = (input === undefined || input === null || input === '') ? next(maximum, minimum) : parseInt(input, 10);
        const n = getSafe(r, mod);
        return { n: n, o: r };
    }
    function setGua(element: HTMLElement, n: number) {
        element.setAttribute('gua', n.toFixed(0));
    }
    function getBinary(n: number) {
        const b = (n - 1).toString(2).padStart(3, '0');
        console.log(`${n} = ${b}`);
        return b;
    }
    function change(n: number, c: number) {
        let s = getBinary(n);
        const cs = s.split('').map((x, i) => {
            if (i === (c - 1)) {
                return x === '0' ? '1' : '0';
            }
            return x;
        }).join('');
        return parseInt(cs, 2) + 1;
    }
    function getHueGua(top: number, bottom: number): { top: number, bottom: number } {
        const b = getBinary(top).split('').reverse().join('') + getBinary(bottom).split('').reverse().join('');
        console.log(b);
        return {
            top: parseInt([b[1], b[2], b[3]].reverse().join(''), 2) + 1,
            bottom: parseInt([b[2], b[3], b[4]].reverse().join(''), 2) + 1
        }
    }
    document.querySelectorAll<HTMLElement>('[tab-nav]').forEach(e => {
        e.addEventListener('click', nav => {
            const tar = (nav.target as HTMLElement).getAttribute('tab-nav');
            document.querySelectorAll<HTMLElement>('[tab]').forEach(se => {
                if (tar === se.getAttribute('tab') && !se.hasAttribute('active')) {
                    se.setAttribute('active', '');
                } else if (tar !== se.getAttribute('tab') && se.hasAttribute('active')) {
                    se.removeAttribute('active');
                }
            });
        });
    });
    const guas = ['#a1', '#b1', '#a2', '#b2', '#c', '#e', '#d1', '#d2', '#cd1', '#cd2', '#f'];
    const elements = guas.map(x => {
        const e = document.querySelector<HTMLElement>(x);
        if (!e) console.warn(x);
        return e;
    });
    document.querySelector('#reset').addEventListener('click', () => {
        itime.value = '-1';
        inumber.value = '';
        elements.forEach(x => x.removeAttribute('gua'));
        document.querySelectorAll('.clear').forEach(e => e.textContent = '');
    });
    document.querySelector('#go').addEventListener('click', () => {
        elements.forEach(x => x.removeAttribute('gua'));
        const bn = nextN(8, inumber.value);
        const b = bn.n;
        inumberd.textContent = bn.o.toFixed();
        let time = parseInt(itime.options[itime.selectedIndex].value, 10);
        if (time === -1) {
            time = parseInt(`${new Date().getHours() / 2}`, 10) + 1;
        }
        const tn = nextN(8, `${bn.o + time}`);
        const t = tn.n;
        itimed.textContent = itime.querySelector(`[value="${time}"]`).textContent;
        const c = getSafe(bn.o + time, 6);
        document.querySelector('#g1').textContent = gua64Map[`${t}${b}`].name;
        document.querySelector('#change').textContent = `${c}爻變`;
        setGua(elements[0], t);
        setGua(elements[1], b);
        let cb = c <= 3 ? change(b, c) : b;
        let ct = c > 3 ? change(t, c - 3) : t;
        document.querySelector('#g2').textContent = gua64Map[`${ct}${cb}`].name;
        setGua(elements[2], ct);
        setGua(elements[3], cb);
        setGua(elements[4], c > 3 ? b : t);
        setGua(elements[5], c > 3 ? t : b);
        const hue = getHueGua(t, b);
        setGua(elements[6], hue.top);
        setGua(elements[7], hue.bottom);
        const chue = getHueGua(ct, cb);
        setGua(elements[8], chue.top);
        setGua(elements[9], chue.bottom);
        setGua(elements[10], c > 3 ? ct : cb);
    });
    const view = document.querySelector('.view');
    view.addEventListener('touchstart', (e) => {
        document.body.classList.toggle('show-detail', true);
    });
    view.addEventListener('mousedown', (e) => {
        document.body.classList.toggle('show-detail', true);
    });
    view.addEventListener('touchend', (e) => {
        document.body.classList.toggle('show-detail', false);
    });
    view.addEventListener('mouseup', (e) => {
        document.body.classList.toggle('show-detail', false);
    });
})();




