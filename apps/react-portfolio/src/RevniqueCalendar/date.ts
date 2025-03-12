declare global {
    interface Date {
        addMilliseconds(m: number): Date;
        addSeconds(s: number): Date;
        addMinutes(m: number): Date;
        addHours(h: number): Date;
        addDays(d: number): Date;
        formatSmallDateTime(useSlashNotation: boolean): string;
        formatSmallDate(useSlashNotation: boolean): string;
        formatTime(): string;
        formatAMPM(): string;
        getMonthName(): string;
        dateDiff(endDateObject:Date):any; 
    }
}

Date.prototype.addMilliseconds = function(m: number): Date {
    const seconds = this.getSeconds();
    if (seconds !== undefined) {
        this.setMilliseconds(seconds + m);
    }
    return this;
};
Date.prototype.addSeconds = function (s:number) {
    this.setMilliseconds(this.getSeconds() + (s*1000));
    return this;
};
Date.prototype.addMinutes = function (m:number) {
    this.setMinutes(this.getMinutes() + m);
    return this;
};

Date.prototype.addHours = function (h:number) {
    this.setHours(this.getHours() + h);
    return this;
};

Date.prototype.addDays = function (d:number) {
    this.setHours(this.getHours() + (d * 24));
    return this;
};
Date.prototype.formatSmallDateTime = function (useSlashNotation:boolean) {
    function addZero(number:any) {
        var rtn = "";
        if (number < 10) {
            rtn = "0" + number;
        } else {
            rtn = number;
        }
        return rtn;
    };

    var dayNumber = this.getDate(); // yields dayofmonth
    let day = addZero(dayNumber);
    var monthNumber = this.getMonth() + 1; // yields month
    let month = addZero(monthNumber);
    var year = this.getFullYear(); // yields year
    var hourNumber = this.getHours(); // yields hours
    let hour = addZero(hourNumber);
    var minuteNumber = this.getMinutes(); // yields minutes
    let minute = addZero(minuteNumber);
    var secondNumber = this.getSeconds(); // yields seconds
    let second = addZero(secondNumber);


    hour = addZero(hour);
    minute = addZero(minute);
    second = addZero(second);

    var rtn = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    if (useSlashNotation) {
        rtn = month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second;
    }
    // After this construct a string with the above results as below
    return rtn;
};
Date.prototype.formatSmallDate = function (useSlashNotation:boolean) {
    function addZero(number:any) {
        var rtn = "";
        if (number < 10) {
            rtn = "0" + number;
        } else {
            rtn = number;
        }
        return rtn;
    };

    var dayNumber = this.getDate(); // yields dayofmonth
    let day = addZero(dayNumber);
    var monthNumber = this.getMonth() + 1; // yields month
    let month = addZero(monthNumber);
    var year = this.getFullYear(); // yields year

    var rtn = year + "-" + month + "-" + day;
    if (useSlashNotation) {
        rtn = month + "/" + day + "/" + year;
    }
    // After this construct a string with the above results as below
    return rtn;
};

Date.prototype.formatTime = function () {
    function addZero(number:any) {
        var rtn = "";
        if (number < 10) {
            rtn = "0" + number;
        } else {
            rtn = number;
        }
        return rtn;
    };

    let hourNumber = this.getHours(); // yields hours
    let hour = addZero(hourNumber);
    let minuteNumber = this.getMinutes(); // yields minutes
    let minute = addZero(minuteNumber);
    let secondNumber = this.getSeconds(); // yields seconds
    let second = addZero(secondNumber);

    hour = addZero(hour);
    minute = addZero(minute);
    second = addZero(second);

    var rtn = hour + ":" + minute + ":" + second;
    // After this construct a string with the above results as below
    return rtn;
};



Date.prototype.dateDiff = function (endDateObject:Date) {

    var addZero = function (i:any) {
        if (i < 10) {
            i = "0" + i;
        }; // add zero in front of numbers < 10
        return i;
    }
    var days, hours, minutes, seconds, totalMilliseconds, displayString = "", numberDisplayString = "", hoursMinSec = "";

    totalMilliseconds = (endDateObject.getTime() - this.getTime());
    days = Math.floor(totalMilliseconds / 86400000); // days
    hours = Math.floor((totalMilliseconds % 86400000) / 3600000); // hours

    minutes = Math.floor((totalMilliseconds % 3600000) / 60000); // minutes
    seconds = Math.floor((totalMilliseconds % 60000) / 1000); // secs

    if (days > 0) {
        displayString = days + " days";
        numberDisplayString = addZero(days) + "";
    }
    if (hours > 0 || days > 0) {
        if (displayString !== "") {
            displayString += ", ";
            numberDisplayString += ":";
        }
        displayString += hours + " hours";
        numberDisplayString += addZero(hours);
    }
    if (minutes > 0 || days > 0 || hours > 0) {
        if (displayString !== "") {
            displayString += ", ";
            numberDisplayString += ":";
        }
        displayString += minutes + " minutes";
        numberDisplayString += addZero(minutes);
    }
    if (seconds > 0 || days > 0 || hours > 0 || minutes > 0) {
        if (displayString !== "") {
            displayString += ", ";
            numberDisplayString += ":";
        }
        displayString += seconds + " seconds";
        numberDisplayString += addZero(seconds);
    }
    if (seconds === 0) {
        if (displayString === "") {
            displayString = "less than 1 second";
            numberDisplayString = "00";
        }
    }

    if (seconds > 0 || hours > 0 || minutes > 0) {
        hoursMinSec = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    }

    var rtn = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        totalMilliseconds: totalMilliseconds,
        displayString: displayString,
        numberDisplayString: numberDisplayString,
        hoursMinSec: hoursMinSec
    };

    //console.log("rtn", rtn);
    return rtn;
};

Date.prototype.formatAMPM = function () {
    let hoursNumber = this.getHours();
    let minutesNumber = this.getMinutes();
    let ampm = hoursNumber >= 12 ? 'pm' : 'am';
    hoursNumber = hoursNumber % 12;
    hoursNumber = hoursNumber ? hoursNumber : 12; // the hour '0' should be '12'
    let minutes = minutesNumber < 10 ? '0' + minutesNumber : minutesNumber;
    let strTime = hoursNumber + ':' + minutes + ' ' + ampm;
    return strTime;
};

Date.prototype.getMonthName = function(): string {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[this.getMonth()];
};

declare global {
    interface Date {
        getMonthName(): string;
    }
}

export {};
