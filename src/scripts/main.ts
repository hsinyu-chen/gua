import { gua64Map } from "./gua64.js";
import { __JiaZi, __ShiGanZhi, getCurrentShiZhi, getResultfunction } from "./time.js";
import { calendar } from "./calendar.js";
var types = [];
var gua64dataMap = {};
let takeNumberMethod = localStorage.getItem('takeNumberMethod') || '1';

let theme = localStorage.getItem('theme') || '0';
(async () => {
    const viewContainer = document.querySelector<HTMLElement>('#view');
    updateNow();
    setTheme(theme);
    setTakeNumberMethod(takeNumberMethod);
    document.querySelector('#theme').addEventListener('click', () => {
        let next = +theme + 1;
        if (next >= 3) {
            next = 0;
        }
        theme = next.toFixed();
        setTheme(theme);
    });
    await initData();
    const guas = ['#a1', '#b1', '#a2', '#b2', '#c', '#e', '#d1', '#d2', '#cd1', '#cd2', '#f'];
    const elements = guas.map(x => {
        const e = document.querySelector<HTMLElement>(x);
        if (!e) console.warn(x);
        return e;
    });
    const { itime, inumber, nInputs, nDispalys, inumberd, itimed } = getElements();
    function reset() {
        viewContainer.style.display = 'none';
        itime.value = '-1';
        inumber.value = '';
        inumberd.textContent = '';
        itimed.textContent = '';
        nInputs.forEach(x => x.value = '');
        nDispalys.forEach(x => x.textContent = '');
        elements.forEach(x => x.removeAttribute('gua'));
        document.querySelectorAll('.clear').forEach(e => e.textContent = '');
    }
    document.querySelector('#reset').addEventListener('click', reset);
    setupAuDialog();
    setupSettingDialog(reset);
    const takeNumberMethods = {
        1: () => {
            const bn = nextN(8, inumber.value);
            const b = bn.n;
            inumberd.textContent = bn.o.toFixed();
            let time = parseInt(itime.options[itime.selectedIndex].value, 10);
            if (time === -1) {
                time = getCurrentShiZhi();
            }
            const tn = nextN(8, `${bn.o + time}`);
            const t = tn.n;
            itimed.textContent = `${itime.querySelector(`[value="${time}"]`).textContent}`;
            const c = getSafe(bn.o + time, 6);
            return { b: b, t: t, c: c };
        },
        2: () => {
            const ms = new Date().getMilliseconds().toFixed().padStart(3, '0');
            const numbers = nInputs.map((x, i) => parseInt(x.value || ms[i], 10));
            numbers.forEach((x, i) => {
                nDispalys[i].textContent = x.toFixed();
            });
            return { b: getSafe(numbers[0], 8), t: getSafe(numbers[1], 8), c: getSafe(numbers[2], 6) };
        }
    }
    document.querySelector('#go').addEventListener('click', () => {
        runTakeNumber(takeNumberMethods[takeNumberMethod], elements, viewContainer);
    });
    document.querySelectorAll('.gua').forEach(view => {
        bindShowDetail(view);
    });
    setupDetailDialog();
})();



function setupSettingDialog(reset: () => void) {
    const setting = document.querySelector('#setting');
    const settingDialog = document.querySelector<HTMLElement>('.setting');
    const closeSetting = document.querySelector('#closeSetting');
    setting.addEventListener('click', () => {
        settingDialog.style.display = '';
    });
    closeSetting.addEventListener('click', () => {
        settingDialog.style.display = 'none';
    });
    document.querySelectorAll('[setTakeNumberMethod]').forEach(ste => {
        ste.addEventListener('click', ev => {
            const btn = ev.target as HTMLButtonElement;
            takeNumberMethod = btn.getAttribute('setTakeNumberMethod');
            setTakeNumberMethod(takeNumberMethod);
            settingDialog.style.display = 'none';
            reset();
        });
    });
}

function getElements() {
    const itime = document.querySelector<HTMLSelectElement>('#itime'),
        inumber = document.querySelector<HTMLInputElement>('#inumber');
    const itimed = document.querySelector<HTMLElement>('#itimed'),
        inumberd = document.querySelector<HTMLElement>('#inumberd');

    const nInputs = [document.querySelector<HTMLInputElement>('#inumber1'),
    document.querySelector<HTMLInputElement>('#inumber2'),
    document.querySelector<HTMLInputElement>('#inumber3')];
    const nDispalys = [document.querySelector<HTMLElement>('#inumber1d'),
    document.querySelector<HTMLElement>('#inumber2d'),
    document.querySelector<HTMLElement>('#inumber3d')];
    return { itime, inumber, nInputs, nDispalys, inumberd, itimed };
}

function setupAuDialog() {
    const au = document.querySelector<HTMLElement>('.au');
    document.querySelector('#au').addEventListener('click', () => {
        au.style.display = '';
    });
    document.querySelector('#closeAu').addEventListener('click', () => {
        au.style.display = 'none';
    });
}

function updateNow() {
    if (new Date().getFullYear() <= 2100) {
        const result = getResultfunction(calendar.solar2lunar(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()));
        document.querySelector('#now').textContent = `今日農曆干支:${result.year}年 ${result.month}月 ${result.date}日`;
    }
}
function setTheme(theme: string) {
    document.body.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
}
function getSafe(r: number, mod: number) {
    const v = r > mod ? (r % mod) : r;
    const n = v === 0 ? mod : v;
    return n;
}
function nextN(mod: number, input: string = undefined): { n: number, o: number } {
    const r = (input === undefined || input === null || input === '') ? new Date().getMilliseconds() : parseInt(input, 10);
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
function setTakeNumberMethod(n: string) {
    document.querySelectorAll<HTMLElement>('[takeNumberMethod]').forEach(tme => {
        tme.style.display = tme.getAttribute('takeNumberMethod') === n.toString() ? '' : 'none';
    });
    localStorage.setItem('takeNumberMethod', n);
}


async function initData() {
    var gua64data: { type: string; name: string; text: string; }[] = await fetch('data.json').then(x => x.json());
    gua64data.forEach(x => {
        if (!types.includes(x.type)) {
            types.push(x.type);
        }
        gua64dataMap[`${x.type}_${x.name}`] = x.text;
    });
}

function setupDetailDialog() {
    const detail = document.querySelector<HTMLDivElement>('.detail');
    const nav = detail.querySelector('#nav');
    const tabs = detail.querySelector('#tabs')
    document.querySelectorAll('.open-detail').forEach(e => {
        e.addEventListener('click', ce => {
            const tar = ce.target as HTMLElement;
            if (tar.textContent) {
                nav.innerHTML = '';
                tabs.innerHTML = '';
                let any = false;
                for (const t of types) {
                    const text = gua64dataMap[`${t}_${tar.textContent}`];
                    if (text) {
                        any = true;
                        const tab = document.createElement('div');
                        tab.classList.add('flex');
                        tab.classList.add('tab');
                        tabs.classList.add('w100');
                        tab.textContent = text;
                        tabs.append(tab);
                        const n = document.createElement('button');
                        n.setAttribute('type', 'button');
                        n.classList.add('flex');
                        n.textContent = t;
                        n.addEventListener('click', () => {
                            tabs.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', false));
                            nav.querySelectorAll('button').forEach(tab => tab.classList.toggle('active', false));
                            tab.classList.toggle('active', true);
                            n.classList.toggle('active', true);
                        });
                        nav.append(n);
                    }
                }
                if (any) {
                    detail.style.display = '';
                    tabs.querySelector('.tab').classList.add('active');
                    nav.querySelector('button').classList.add('active');
                    const close = document.createElement('button');
                    close.textContent = '關閉';
                    close.addEventListener('click', () => detail.style.display = 'none');
                    nav.append(close);
                }
            }
        });
    });
}

function bindShowDetail(view: Element) {
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
}

function runTakeNumber(takeNumberMethod: () => { b: number; t: number; c: number; }, elements: HTMLElement[], viewContainer: HTMLElement) {
    const numbers = takeNumberMethod();
    const c = numbers.c;
    const b = numbers.b;
    const t = numbers.t;
    elements.forEach(x => x.removeAttribute('gua'));
    updateNow();
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
    viewContainer.style.display = '';
    requestAnimationFrame(() => {
        const metaViewport = document.querySelector('meta[name = viewport]');
        metaViewport.setAttribute('content', `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,height=${window.innerHeight}px`);
    });
}

