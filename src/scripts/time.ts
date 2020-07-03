//天干序數：1（甲），2（乙），……
export const __TianGan = ['', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
//地支序數：1（寅），2（卯），……
export const __NianZhi = ['', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '醜'];
//月的地支序數：寅月為正月，……
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
//時干支
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
/**
 * 獲取年干。公式：年干=年份個位數-3。適用於任何西元年，個位數小於3時，借10
 * @param {Object} year
 */
export function getNianGanIndex(year) {
    //年干=年份個位數-3，個位數小於2，借10
    var index = Number(year.toString().slice(-1, year.length));
    index <= 3 && (index += 10);
    index -= 3;
    return index;
}
/**
 * 獲取年支。公式：年支=(年份+7)/12取余數。整除余0即12，為醜。
 * @param {Object} year
 */
export function getNianZhiIndex(year) {
    return (Number(year) + 7) % 12 || 12;
}
/**
 * 獲取月干。公式：月干=年干*2+月支
 * @param {Object} nianGanIndex
 * @param {Object} lMonth
 */
export function getYueGanIndex(nianGanIndex, lMonth) {
    var index = Number(nianGanIndex) * 2 + Number(lMonth);
    index %= 10;
    return index;
}
/**
 * 獲取月支。公式：月支=農歷月份
 * @param {Object} lMonth
 */
export function getYueZhiIndex(lMonth) {
    return Number(lMonth);
}
/**
 * 獲取時支。公式：時支=小時/2 - 1（小時為偶數時），時支=(小時+1)/2 - 1（小時為奇數時）
 * @param {Object} hour
 */
export function getShiZhiIndex(hour) {
    hour = Number(hour);
    if (hour % 2 === 0) {
        return hour / 2 - 1;
    } else {
        return (hour + 1) / 2 - 1;
    }
}
/**
 * 獲取時干。公式：時干=日干*2 + 時支
 * @param {Object} riGanIndex
 * @param {Object} shiZhiIndex
 */
export function getShiGanIndex(riGanIndex, shiZhiIndex) {
    var index = (riGanIndex * 2 + shiZhiIndex) % 10;
    index === 0 && (index = 10);
    return index;
}
/**
 * 判斷是否閏年
 * @param {Object} year
 */
export function isRunnian(year) {
    year = Number(year);
    if (year % 100 === 0) {
        return year % 400 === 0;
    } else {
        return year % 4 === 0;
    }
}
/**
 * 獲取月份基數
 * | 月份	| 1 | 2  | 3  | 4  | 5 | 6  | 7 | 8  | 9 | 10 | 11 | 12 |
 * | 月基數	| 0 | 31 | -1 | 30 | 0 | 31 | 1 | 32 | 3 | 33 | 4  | 34 |
 * @param {Object} month
 */
export function getMonthBase(month) {
    month = Number(month);
    var base = [undefined, 0, 31, -1, 30, 0, 31, 1, 32, 3, 33, 4, 34];
    return base[month];
}
/**
 * 獲取指定年份所屬的世紀
 * @param {Object} year
 */
export function getCenturyByYear(year) {
    year = Number(year);
    if (year % 100 === 0) {
        return year / 100;
    }
    return parseInt((year / 100).toString(), 10) + 1;
}
/**
 * 根據世紀，計算該世紀常數。公式：X = 44*(C-17) + (C-17)/4 + 3。C：世紀，X：世紀常數
 * @param {Object} century
 */
export function getCenturyConst(century) {
    century = Number(century);
    return (44 * (century - 17) + parseInt(`${((century - 17) / 4) + 3} `, 10)) % 60;
}
/**
 * 根據高氏日柱公式，獲取指定日期的天幹地支。
 * 公式：r = s/4*6 + 5*(s/4*3+u)+m+d+x。
 * r：日柱的母數，r除以60取余，即時日柱的幹支序列數。
 * s：公元年數後兩位減1，s/4取整數部分。
 * u：s除以4的余數
 * m：月基數
 * d：日期數
 * x：世紀常數
 * @param {Object} year
 * @param {Object} month
 * @param {Object} date
 */
export function getRiGan(year, month, date) {
    year = Number(year);
    var s = year % 100 - 1,
        u = s % 4,
        m = getMonthBase(month),
        d = date,
        x = getCenturyConst(getCenturyByYear(year));
    // console.log('s:%s,u:%s,m:%s,d:%s,x:%s', s, u, m, d, x);
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
    if (m != 0) h += 1;

    let offset = parseInt(`${h / 2}`, 10);

    if (offset >= 12) offset = 0;
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

    //年支=(年份+7)除以12的余数。
    nianZhiIndex = getNianZhiIndex(date.cYear);
    y2 = __NianZhi[nianZhiIndex];
    __bazi.year += y2;

    //月干=年干*2 + 月支，和超过10，直接取个位数
    yueGanIndex = getYueGanIndex(nianGanIndex, date.lMonth);
    y1 = __TianGan[yueGanIndex];
    __bazi.month = y1;

    //月支=农历月份
    yueZhiIndex = getYueZhiIndex(date.lMonth);
    y2 = __YueZhi[yueZhiIndex];
    __bazi.month += y2;

    //日干及日支。采用高氏日柱公式，得到日期在甲子表中的序号
    serial = getRiGan(date.cYear, date.cMonth, date.cDay);
    riGan = __JiaZi[serial];
    riGanIndex = __TianGan.indexOf(riGan.slice(0, 1));
    __bazi.date = riGan;

    //时支
    shiZhiIndex = getShiZhiIndex(date.hour);
    __bazi.hour = __ShiGanZhi[shiZhiIndex];
    //时干
    shiGanIndex = getShiGanIndex(riGanIndex, shiZhiIndex);
    __bazi.hour = __TianGan[shiGanIndex] + __bazi.hour;

    return __bazi;

};