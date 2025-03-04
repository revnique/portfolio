const HIGH_YEAR = '2200';
const LOW_YEAR = '1800';

export function getMatches(sn: string) {
    var rtn = new Match();
    const justDigitsSerialNumber = sn.substring(1, 9);
    const sx = sn.substring(9);
    var IsStarNote = sx == '*';
    rtn.IsStarNote = IsStarNote;
    checkMatches(justDigitsSerialNumber, rtn);
    return rtn;
}

function checkMatches(justDigitsSerialNumber: string, rtn: Match) {
    rtn.IsAllPairs2 = patternAllPairs2(justDigitsSerialNumber);
    rtn.IsAllPairs4 = patternAllPairs4(justDigitsSerialNumber);
    rtn.IsRepeatingPairs2 = patternRepeatingPairs2(justDigitsSerialNumber);
    rtn.IsRepeatingPairs4 = patternRepeatingPairs4(justDigitsSerialNumber);
    rtn.IsConsectutiveAscending = patternConsectutiveAscending(justDigitsSerialNumber);
    rtn.IsConsectutiveDescending = patternConsectutiveDescending(justDigitsSerialNumber);
    rtn.IsConsectutivePairAscending = patternConsectutivePairAscending(justDigitsSerialNumber);
    rtn.IsConsectutivePairDescending = patternConsectutivePairDescending(justDigitsSerialNumber);
    rtn.IsUniqueDigits = patternUniqueDigits(justDigitsSerialNumber);
    rtn.IsOneDigit = patternOneDigit(justDigitsSerialNumber);
    rtn.IsTwoDigits = patternTwoDigits(justDigitsSerialNumber);
    rtn.IsSixOrMoreSameDigit = patternSixOrMoreSameDigit(justDigitsSerialNumber);
    rtn.InARowCount = patternInARowCount(justDigitsSerialNumber);
    rtn.IsPalindrome = patternPalindrome(justDigitsSerialNumber);
    rtn.IsDate = patternIsDate(justDigitsSerialNumber);
    rtn.IsDateDate = getDate(justDigitsSerialNumber);
    rtn.IsEuroDate = patternIsEuroDate(justDigitsSerialNumber);
    rtn.IsEuroDateDate = getEuroDate(justDigitsSerialNumber);
    rtn.RatingValue = getBuckValue(rtn);
    return rtn;
}


// H22334499T
// H11887744T
// H22113355T
function patternAllPairs2(justDigitsSerialNumber: string) {
    var rtn = false;
    if (justDigitsSerialNumber.charAt(0) === justDigitsSerialNumber.charAt(1)
        && justDigitsSerialNumber.charAt(2) === justDigitsSerialNumber.charAt(3)
        && justDigitsSerialNumber.charAt(4) === justDigitsSerialNumber.charAt(5)
        && justDigitsSerialNumber.charAt(6) === justDigitsSerialNumber.charAt(7)
    ) {
        rtn = true;
    }
    return rtn;
}

// H33339999T
// H88887777T
// H22223333T
function patternAllPairs4(justDigitsSerialNumber: string) {
    var rtn = false;
    var m = patternAllPairs2(justDigitsSerialNumber);
    if (m && justDigitsSerialNumber.charAt(1) === justDigitsSerialNumber.charAt(2)
        && justDigitsSerialNumber.charAt(5) === justDigitsSerialNumber.charAt(6)
    ) {
        rtn = true;
    }
    return rtn;
}

// H27272727T
// H83838383T
// H25252525T
function patternRepeatingPairs2(justDigitsSerialNumber: string) {
    var rtn = false;
    const first = justDigitsSerialNumber.substring(0, 2);
    const second = justDigitsSerialNumber.substring(2, 4);
    const third = justDigitsSerialNumber.substring(4, 6);
    const fourth = justDigitsSerialNumber.substring(6, 8);
    if (first === second
        && second === third
        && third === fourth) {
        rtn = true;
    }
    return rtn;
}

// H54325432T
// H98769876T
// H09870987T
function patternRepeatingPairs4(justDigitsSerialNumber: string) {
    var rtn = false;
    const first = justDigitsSerialNumber.substring(0, 4);
    const second = justDigitsSerialNumber.substring(4, 8);
    if (first === second) {
        rtn = true;
    }
    return rtn;
}

// H12345678T
// H01234567T
// H23456789T
function patternConsectutiveAscending(justDigitsSerialNumber: string) {
    const digits = justDigitsSerialNumber.split("");
    var lastDigit = -1;
    for (let i = 0; i < digits.length; i++) {
        const dig = parseInt(digits[i]);
        if (dig > lastDigit) {
            lastDigit = dig;
        } else {
            return false;
        }
    }
    return true;
}

// H87654321T
// H76543210T
// H98765432T
function patternConsectutiveDescending(justDigitsSerialNumber: string) {
    const digits = justDigitsSerialNumber.split("");
    var lastDigit = 10;
    for (let i = 0; i < digits.length; i++) {
        const dig = parseInt(digits[i]);
        if (dig < lastDigit) {
            lastDigit = dig;
        } else {
            return false;
        }
    }
    return true;
}

// H10111213T
// H27282930T
// H89909192T
function patternConsectutivePairAscending(justDigitsSerialNumber: string) {
    const pairs = [justDigitsSerialNumber.substring(0, 2), justDigitsSerialNumber.substring(2, 4), justDigitsSerialNumber.substring(4, 6), justDigitsSerialNumber.substring(6)];
    var lastPair = +pairs[0] - 1;
    for (let i = 0; i < pairs.length; i++) {
        const pair = +pairs[i];
        if (pair === lastPair + 1) {
            lastPair = pair;
        } else {
            return false;
        }
    }

    return true;
}

// H99989796T
// H77767574T
// H14131211T
function patternConsectutivePairDescending(justDigitsSerialNumber: string) {
    const pairs = [justDigitsSerialNumber.substring(0, 2), justDigitsSerialNumber.substring(2, 4), justDigitsSerialNumber.substring(4, 6), justDigitsSerialNumber.substring(6)];
    var lastPair = +pairs[0] + 1;
    for (let i = 0; i < pairs.length; i++) {
        const pair = +pairs[i];
        if (pair === lastPair - 1) {
            lastPair = pair;
        } else {
            return false;
        }
    }

    return true;
}

// H79185632T
// H01758923T
// H01237954T
function patternUniqueDigits(justDigitsSerialNumber: string) {
    const digits = justDigitsSerialNumber.split("");
    var digitsObj:any = {};
    for (let i = 0; i < digits.length; i++) {
        const dig = digits[i];
        digitsObj[dig] = dig;
    }
    return Object.keys(digitsObj).length === 8;
}

// H55555555T
// H77777777T
// H11111111T
function patternOneDigit(justDigitsSerialNumber: string) {
    const digits = justDigitsSerialNumber.split("");
    var digitsObj:any = {};
    for (let i = 0; i < digits.length; i++) {
        const dig = digits[i];
        digitsObj[dig] = dig;
    }
    return Object.keys(digitsObj).length === 1;
}

// H77722772T
// H18881881T
// H33330330T
function patternTwoDigits(justDigitsSerialNumber: string) {
    const digits = justDigitsSerialNumber.split("");
    var digitsObj:any = {};
    for (let i = 0; i < digits.length; i++) {
        const dig = digits[i];
        digitsObj[dig] = dig;
    }
    return Object.keys(digitsObj).length === 2;
}

// H00090000T
// H77977717T
// H83333313T
function patternSixOrMoreSameDigit(justDigitsSerialNumber: string) {
    const digits = justDigitsSerialNumber.split("");
    var digitsObj:any = {};
    for (let i = 0; i < digits.length; i++) {
        const dig = digits[i];
        digitsObj[dig] = dig;
    }
    const keyCount = Object.keys(digitsObj).length;
    var highCount = 0;
    if (keyCount <= 3) {
        for (const key in digitsObj) {
            if (Object.hasOwnProperty.call(digitsObj, key)) {
                const element = digitsObj[key];
                let digCount = digits.filter(d => d === element).length;
                if (digCount > highCount) {
                    highCount = digCount;
                }
            }
        }
    }

    return highCount >= 6;
}

// H77772160T
// H70555557T
// H12222221T
function patternInARowCount(justDigitsSerialNumber: string) {
    const digits = justDigitsSerialNumber.split("");
    var digitsObj = {};
    var champion = '';
    var rtn = 0;
    var winCount = 0;
    var winner = '';
    for (let i = 0; i < digits.length; i++) {
        const challenger = digits[i].toString();
        if (challenger !== champion) {
            champion = challenger;
            winCount = 0;
        } else {
            winCount += 1;
            if (winCount > rtn) {
                winner = champion;
                rtn = winCount;
            }
        }
    }
    console.log(`winner ${winner}, winnerCount ${rtn}`);
    return rtn > 1 ? rtn + 1 : rtn;
}

// H75322357T
// H32411423T
// H98000089T
function patternPalindrome(justDigitsSerialNumber: string) {
    for (let i = 0; i < 8; i++) {
        if (justDigitsSerialNumber.charAt(i) !== justDigitsSerialNumber.charAt(7 - i)) {
            return false;
        }
    }
    return true;
}

// D07271945H
// D06031975H
function patternIsDate(justDigitsSerialNumber: string) {
    if (validateDateDigits(justDigitsSerialNumber, false)) {
        var testDate = `${justDigitsSerialNumber.substring(0, 2)}/${justDigitsSerialNumber.substring(2, 4)}/${justDigitsSerialNumber.substring(4)}`;
        var serialDate = Date.parse(testDate);
        var lowDate = Date.parse(`01/01/${LOW_YEAR}`);
        var highDate = Date.parse(`12/31/${HIGH_YEAR}`);
        if (!isNaN(serialDate)) {
            if (serialDate >= lowDate && serialDate <= highDate) {
                return true;
            }
        }
    }
    return false;
}

// D27071945H
// D03061975H
function patternIsEuroDate(justDigitsSerialNumber: string) {
    if (validateDateDigits(justDigitsSerialNumber, true)) {
        var testDate = `${justDigitsSerialNumber.substring(2, 4)}/${justDigitsSerialNumber.substring(0, 2)}/${justDigitsSerialNumber.substring(4)}`;
        var serialDate = Date.parse(testDate);
        var lowDate = Date.parse(`01/01/${LOW_YEAR}`);
        var highDate = Date.parse(`12/31/${HIGH_YEAR}`);
        if (!isNaN(serialDate)) {
            if (serialDate >= lowDate && serialDate <= highDate) {
                return true;
            }
        }
    }
    return false;
}

function getDate(justDigitsSerialNumber: string) {
    if (patternIsDate(justDigitsSerialNumber)) {
        var testDate = `${justDigitsSerialNumber.substring(0, 2)}/${justDigitsSerialNumber.substring(2, 4)}/${justDigitsSerialNumber.substring(4)}`;
        return new Date(testDate);
    } else {
        return null;
    }
}

function getEuroDate(justDigitsSerialNumber: string) {
    if (patternIsEuroDate(justDigitsSerialNumber)) {
        var testDate = `${justDigitsSerialNumber.substring(2, 4)}/${justDigitsSerialNumber.substring(0, 2)}/${justDigitsSerialNumber.substring(4)}`;
        return new Date(testDate);
    } else {
        return null;
    }
}

function validateDateDigits(justDigitsSerialNumber: string, isEuro: boolean) {
    var month = !isEuro ? justDigitsSerialNumber.substring(0, 2) : justDigitsSerialNumber.substring(2, 4);
    var dt = !isEuro ? justDigitsSerialNumber.substring(2, 4) : justDigitsSerialNumber.substring(0, 2);
    var year = justDigitsSerialNumber.substring(4);
    if (+year >= +LOW_YEAR && +year <= +HIGH_YEAR) {
        if (+month >= 1 && +month <= 12) {
            if (+dt >= 1 && +dt <= 31) {
                return true;
            }
        }
    }
    return false;
}

function getBuckValue(buckMatch: Match) {
    var rtn = 0;
    if (buckMatch.IsUniqueDigits) {
        //rarity = 1814400;
        rtn += 5;
    }
    if (buckMatch.IsDate) {
        //rarity = 109938;
        rtn += 5;
    }
    if (buckMatch.IsEuroDate) {
        //rarity = 109938;
        rtn += 5;
    }
    if (buckMatch.IsTwoDigits) {
        //rarity = 11430;
        rtn += 75;
    }
    if (buckMatch.IsRepeatingPairs4) {
        //rarity = 10000;
        rtn += 60;
    }
    if (buckMatch.IsAllPairs2) {
        //rarity = 10000;
        rtn += 60;
    }
    if (buckMatch.IsPalindrome) {
        //rarity = 10000;
        rtn += 80;
    }
    if (buckMatch.IsSixOrMoreSameDigit) {
        //rarity = 2800;
        rtn += 75;
    }
    if (buckMatch.IsRepeatingPairs2) {
        //rarity = 100;
        rtn += 75;
    }
    if (buckMatch.IsAllPairs4) {
        //rarity = 100;
        rtn += 75;
    }
    if (buckMatch.IsConsectutivePairDescending) {
        //rarity = 97;
        rtn += 85;
    }
    if (buckMatch.IsConsectutivePairAscending) {
        //rarity = 97;
        rtn += 85;
    }
    if (buckMatch.IsOneDigit) {
        //rarity = 10;
        rtn += 100;
    }
    if (buckMatch.IsConsectutiveAscending) {
        //rarity = 3;
        rtn += 100;
    }
    if (buckMatch.IsConsectutiveDescending) {
        //rarity = 3;
        rtn += 100;
    }
    if (buckMatch.IsStarNote) {
        //rarity = 1000000;
        //makes sure if it's only a star note that the value is only 5
        var isStarNoteValue = rtn == 0 ? 5 : 10;
        rtn += isStarNoteValue;
    }

    //can't be more than 100
    rtn = rtn > 100 ? 100 : rtn;

    //can't be less than 1
    rtn = rtn < 1 ? 1 : rtn;

    return rtn;
}

export class Match {
    IsAllPairs2: boolean = false;
    IsAllPairs4: boolean = false;
    IsRepeatingPairs2: boolean = false;
    IsRepeatingPairs4: boolean = false;
    IsConsectutiveAscending: boolean = false;
    IsConsectutiveDescending: boolean = false;
    IsConsectutivePairAscending: boolean = false;
    IsConsectutivePairDescending: boolean = false;
    IsUniqueDigits: boolean = false;
    IsOneDigit: boolean = false;
    IsTwoDigits: boolean = false;
    IsSixOrMoreSameDigit: boolean = false;
    InARowCount: number = 0;
    IsPalindrome: boolean = false;
    IsDate: boolean = false;
    IsDateDate: Date | null = null;
    IsEuroDate: boolean = false;
    IsEuroDateDate: Date | null = null;
    RatingValue: number = 0;
    IsStarNote: boolean = false;
}

export interface BuckLite {
    SN: string;
    CDT: string;
    isFW: boolean;
    index: number;
    match: Match;
}