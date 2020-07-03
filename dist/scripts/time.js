export const __TianGan = ['', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const __NianZhi = ['', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '醜'];
export const __YueZhi = ['', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '醜'];
export const __WuXing = {
    '甲': '木',
    '乙': '木',
    '丙': '火',
    '丁': '火',
    '戊': '土',
    '己': '土',
    '庚': '金',
    '辛': '金',
    '壬': '水',
    '癸': '水',
    '寅': '木',
    '卯': '木',
    '辰': '土',
    '巳': '火',
    '午': '火',
    '未': '土',
    '申': '金',
    '酉': '金',
    '戌': '土',
    '亥': '水',
    '子': '水',
    '醜': '土'
};
export const __JiaZi = [undefined,
    '甲子', '乙醜', '丙寅', '丁卯', '戊辰', '已巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥',
    '丙子', '丁醜', '戊寅', '已卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥',
    '戊子', '己醜', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '已亥',
    '庚子', '辛醜', '壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '已酉', '庚戌', '辛亥',
    '壬子', '癸醜', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '已未', '庚申', '辛酉', '壬戌', '癸亥'
];
export const __ShiGanZhi = {
    '-1': '子',
    '0': '醜',
    '1': '寅',
    '2': '卯',
    '3': '辰',
    '4': '巳',
    '5': '午',
    '6': '未',
    '7': '申',
    '8': '酉',
    '9': '戌',
    '10': '亥',
    '11': '子'
};
export function getNianGanIndex(year) {
    var index = Number(year.toString().slice(-1, year.length));
    index <= 3 && (index += 10);
    index -= 3;
    return index;
}
export function getNianZhiIndex(year) {
    return (Number(year) + 7) % 12 || 12;
}
export function getYueGanIndex(nianGanIndex, lMonth) {
    var index = Number(nianGanIndex) * 2 + Number(lMonth);
    index %= 10;
    return index;
}
export function getYueZhiIndex(lMonth) {
    return Number(lMonth);
}
export function getShiZhiIndex(hour) {
    hour = Number(hour);
    if (hour % 2 === 0) {
        return hour / 2 - 1;
    }
    else {
        return (hour + 1) / 2 - 1;
    }
}
export function getShiGanIndex(riGanIndex, shiZhiIndex) {
    var index = (riGanIndex * 2 + shiZhiIndex) % 10;
    index === 0 && (index = 10);
    return index;
}
export function isRunnian(year) {
    year = Number(year);
    if (year % 100 === 0) {
        return year % 400 === 0;
    }
    else {
        return year % 4 === 0;
    }
}
export function getMonthBase(month) {
    month = Number(month);
    var base = [undefined, 0, 31, -1, 30, 0, 31, 1, 32, 3, 33, 4, 34];
    return base[month];
}
export function getCenturyByYear(year) {
    year = Number(year);
    if (year % 100 === 0) {
        return year / 100;
    }
    return parseInt((year / 100).toString(), 10) + 1;
}
export function getCenturyConst(century) {
    century = Number(century);
    return (44 * (century - 17) + parseInt(`${((century - 17) / 4) + 3} `, 10)) % 60;
}
export function getRiGan(year, month, date) {
    year = Number(year);
    var s = year % 100 - 1, u = s % 4, m = getMonthBase(month), d = date, x = getCenturyConst(getCenturyByYear(year));
    var r = parseInt((s / 4).toString()) * 6 + 5 * (parseInt((s / 4).toString()) * 3 + u) + m + d + x;
    if (isRunnian(year) && month > 2) {
        r += 1;
    }
    r %= 60;
    r === 0 && (r = 60);
    return r;
}
export function getCurrentShiZhi() {
    let h = new Date().getHours();
    const m = new Date().getMinutes();
    if (m != 0)
        h += 1;
    let offset = parseInt(`${h / 2}`, 10);
    if (offset >= 12)
        offset = 0;
    return offset + 1;
}
export function getResultfunction(date) {
    var __bazi = {
        year: '',
        month: '',
        date: '',
        hour: ''
    };
    var nianGanIndex = -1, nianZhiIndex = -1, yueGanIndex = -1, yueZhiIndex = -1, riGanIndex = -1, shiZhiIndex = -1, shiGanIndex = -1;
    var y1 = '', y2 = '', m1 = '', m2 = '';
    var serial, riGan = '';
    nianGanIndex = getNianGanIndex(date.cYear);
    y1 = __TianGan[nianGanIndex];
    __bazi.year = y1;
    nianZhiIndex = getNianZhiIndex(date.cYear);
    y2 = __NianZhi[nianZhiIndex];
    __bazi.year += y2;
    yueGanIndex = getYueGanIndex(nianGanIndex, date.lMonth);
    y1 = __TianGan[yueGanIndex];
    __bazi.month = y1;
    yueZhiIndex = getYueZhiIndex(date.lMonth);
    y2 = __YueZhi[yueZhiIndex];
    __bazi.month += y2;
    serial = getRiGan(date.cYear, date.cMonth, date.cDay);
    riGan = __JiaZi[serial];
    riGanIndex = __TianGan.indexOf(riGan.slice(0, 1));
    __bazi.date = riGan;
    shiZhiIndex = getShiZhiIndex(date.hour);
    __bazi.hour = __ShiGanZhi[shiZhiIndex];
    shiGanIndex = getShiGanIndex(riGanIndex, shiZhiIndex);
    __bazi.hour = __TianGan[shiGanIndex] + __bazi.hour;
    return __bazi;
}
;
