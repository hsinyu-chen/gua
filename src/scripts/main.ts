import { gua64Map } from "./gua64.js";
import { __JiaZi, __ShiGanZhi, getCurrentShiZhi, getResultfunction } from "./time.js";
import { calendar } from "./calendar.js";

(async () => {
    const itime = document.querySelector<HTMLSelectElement>('#itime'),
        inumber = document.querySelector<HTMLInputElement>('#inumber')
    const itimed = document.querySelector<HTMLElement>('#itimed'),
        inumberd = document.querySelector<HTMLElement>('#inumberd')
    function getSafe(r: number, mod: number) {
        const v = r > mod ? (r % mod) : r;
        const n = v === 0 ? mod : v;
        return n;
    }
    let theme = localStorage.getItem('theme') || '0';
    setTheme(theme);
    document.querySelector('#theme').addEventListener('click', () => {
        let next = +theme + 1;
        if (next >= 3) {
            next = 0;
        }
        theme = next.toFixed();
        setTheme(theme);
    });
    var gua64data: { type: string, name: string, text: string }[] = await fetch('data.json').then(x => x.json());
    var types = [];
    var gua64dataMap = {};
    gua64data.forEach(x => {
        if (!types.includes(x.type)) {
            types.push(x.type);
        }
        gua64dataMap[`${x.type}_${x.name}`] = x.text;
    });
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
            time = getCurrentShiZhi();
        }
        const tn = nextN(8, `${bn.o + time}`);
        const t = tn.n;
        if (new Date().getFullYear() <= 2100) {
            const result = getResultfunction(calendar.solar2lunar(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()));
            document.querySelector('#now').textContent = `今日農曆干支:${result.year}年 ${result.month}月 ${result.date}日`;
        }
        itimed.textContent = `${itime.querySelector(`[value="${time}"]`).textContent}`;
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
        requestAnimationFrame(() => {
            const metaViewport = document.querySelector('meta[name = viewport]')
            metaViewport.setAttribute('content', `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,height=${window.innerHeight}px`)
        });
    });
    document.querySelectorAll('.gua').forEach(view => {
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
    });
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
})();




function setTheme(theme: string) {
    document.body.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
}

