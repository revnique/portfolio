import { Component, OnInit } from '@angular/core';
import { Day } from './day.interface';
import { CommonModule } from '@angular/common';
import './date';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-revnique-calendar',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './revnique-calendar.component.html',
  styleUrl: './revnique-calendar.component.scss'
})
export class RevniqueCalendarComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  calInfo = {
    showTopRow: true,
    showBottomRow: true,
    currentDate: new Date(),
    currentJSMonthNumber: 0,
    currentMonthName: '',
    currentMonthDays: -1,
    currentYear: 0,
    prevMonthDays: 0,
    currentMonthFirstDayOfWeek: -1,
    currentMonthFirstDayOfWeekName: '',
    dayList: [] as Day[],
  }
  redDays = ['3/3/2025','3/8/2025','6/28/2025','6/29/2025','5/17/2025','5/28/2025','7/27/2025','7/11/2025'];
  yellowDays = ['6/2/2025','6/8/2025','3/18/2025','6/21/2025','5/7/2025','5/2/2025','7/7/2025','3/21/2025'];
  greenDays = ['6/1/2025','6/8/2025','6/19/2025','5/25/2025','3/30/2025','3/22/2025','7/2/2025','7/19/2025'];
  daysInMonth = (year:number, month:number) => new Date(year, month, 0).getDate();
  daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar(new Date());
  }
  
  generateCalendar(d: Date){ 
    this.calInfo.currentDate = d;
    console.log("generateCalendar", d);
    this.calInfo.currentJSMonthNumber = d.getMonth();
    this.calInfo.currentMonthName = d.getMonthName();

    this.calInfo.currentYear = d.getFullYear();
    this.calInfo.currentMonthDays = this.daysInMonth(this.calInfo.currentYear, this.calInfo.currentJSMonthNumber + 1);
    const prevMonth = new Date(this.calInfo.currentDate);
    prevMonth.setMonth(this.calInfo.currentJSMonthNumber - 1);
    this.calInfo.prevMonthDays = this.daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1);

    const nextMonth = new Date(this.calInfo.currentDate);
    nextMonth.setMonth(this.calInfo.currentJSMonthNumber + 1);

    const firstDate = new Date(this.calInfo.currentYear,this.calInfo.currentJSMonthNumber,1);
    this.calInfo.currentMonthFirstDayOfWeek = firstDate.getDay();
    this.calInfo.currentMonthFirstDayOfWeekName = this.daysOfWeek[this.calInfo.currentMonthFirstDayOfWeek];

    const total = 42;
    var paddingDays = 0;
    var paddingDayNumbers = 0;
    if(this.calInfo.currentMonthFirstDayOfWeek !== 0){
      paddingDays = this.calInfo.currentMonthFirstDayOfWeek;
      paddingDayNumbers =  (this.calInfo.prevMonthDays - paddingDays + 1);
    }

    var paddingDayCount = paddingDays;
    var paddingDayNumber = paddingDayNumbers;
    this.calInfo.dayList = [];

    let todayDt = `${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    console.log("todayDt", todayDt);
    for (let index = 1; index <= total; index++) {
      let dayNumber = index;
      let isPaddingDay = false;
      let dt = `${prevMonth.getMonth()+1}/${dayNumber}/${this.calInfo.currentYear}`;
      if(paddingDayCount > 0){
        dayNumber = paddingDayNumber;
        isPaddingDay = true;
        dt = `${prevMonth.getMonth()+1}/${paddingDayNumber}/${prevMonth.getFullYear()}`;
      } else {
        if(index > (paddingDays + this.calInfo.currentMonthDays)){
          dayNumber = index - (paddingDays + this.calInfo.currentMonthDays);
          isPaddingDay = true;
          dt = `${nextMonth.getMonth()+1}/${dayNumber}/${nextMonth.getFullYear()}`;
        } else {
          dayNumber = index - paddingDays;
          isPaddingDay = false;
          dt = `${this.calInfo.currentJSMonthNumber+1}/${dayNumber}/${this.calInfo.currentYear}`;
        }
      }
      let day:Day = {
        uId: index,
        dayNumber:dayNumber,
        isPaddingDay: isPaddingDay,
        dt: dt,
        fullDt: new Date(dt).toUTCString(),
        showOrange: false,
        showYellow: false,
        showRed: false,
        isToday: todayDt === dt
      }
      this.calInfo.dayList.push(day);
      paddingDayCount -= 1;
      paddingDayNumber +=1;
    }
    this.calInfo.dayList.forEach((dt)=>{
      if(!dt.isPaddingDay){
        dt.showOrange = this.greenDays.some((d)=>d === dt.dt);
        dt.showYellow = this.yellowDays.some((d)=>d === dt.dt);
        dt.showRed = this.redDays.some((d)=>d === dt.dt);
      }
    })
  }

  prevMonth() {
    const d = this.calInfo.currentDate;
    d.setMonth(this.calInfo.currentJSMonthNumber - 1);
    this.generateCalendar(d);
  }
  nextMonth() {
    const d = this.calInfo.currentDate;
    let newMonth = 0;
    if (this.calInfo.currentJSMonthNumber === 11) {
      newMonth = 0;
      d.setFullYear(this.calInfo.currentYear + 1);
    } else {
      newMonth = this.calInfo.currentJSMonthNumber + 1;
    }
    d.setMonth(newMonth);
    this.generateCalendar(d);
  }
}











// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { AuthState, initialAuthState } from '../../../../core/state/root/root.state';
// import { Store } from '@ngrx/store';
// import { AssociateDashboardActions } from '../../state/associate-dashboard.actions';
// import { selectAssociateDashboardState, selectDaysDataState } from '../../state/associate-dashboard.selector';
// import { Subject, takeUntil } from 'rxjs';
// import { formatDate } from '@angular/common';
// import { CalendarDay } from '../../models/user-projection.model';

// @Component({
//   selector: 'app-time-management',
//   templateUrl: './time-management.component.html',
//   styleUrl: './time-management.component.scss'
// })
// export class TimeManagementComponent implements OnInit, OnDestroy{
//   @Input() authState: AuthState = initialAuthState;
//   daysDataState$ = this.store.select(selectDaysDataState); //just the specific slice because higher up it will load anytime anything in that slice changes
//   associateDashboardState$ = this.store.select(selectAssociateDashboardState);
//   destroy$: Subject<boolean> = new Subject<boolean>();
//   calInfo = {
//     showTopRow: true,
//     showBottomRow: true,
//     currentDate: new Date(),
//     currentJSMonthNumber: 0,
//     currentMonthName: '',
//     currentMonthDays: -1,
//     currentYear: 0,
//     prevMonthDays: 0,
//     currentMonthFirstDayOfWeek: -1,
//     currentMonthFirstDayOfWeekName: '',
//     dayList: [{isPaddingDay:false, dt:'', showOrange: false, showRed:false, showBlue:false, dayNumber:0, fullDt:new Date().toUTCString()}],
//   }
  
//   // redDays = ['6/3/2025','6/8/2025','6/28/2025','6/29/2025','5/17/2025','5/28/2025','7/27/2025','7/11/2025'];
//   // blueDays = ['6/2/2025','6/8/2025','6/18/2025','6/21/2025','5/7/2025','5/2/2025','7/7/2025','7/21/2025'];
  
//   redDays = [''];
//   blueDays = [''];
//   orangeDays = [''];
//   daysInMonth = (year:number, month:number) => new Date(year, month, 0).getDate();
//   daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

//   constructor(private store: Store){}
//   ngOnInit(): void {
//     this.loadCalendar(new Date());
//     this.daysDataState$.pipe(takeUntil(this.destroy$)).subscribe((daysData)=>{
//       if(daysData && daysData.length !== undefined){
//         this.orangeDays = daysData.map((d:any)=> formatDate(new Date(d.dateOfEntry),'M/d/yyyy', 'en-US'));
//         this.generateCalendar(this.calInfo.currentDate);
//       }
//     });
//   }

//   loadCalendar(d:Date){
//     this.calInfo.currentDate = d;
//     const currentYear = d.getFullYear();
//     const currentJSMonthNumber = d.getMonth();
//     const currentMonthDays = this.daysInMonth(currentYear, currentJSMonthNumber + 1);
//     const firstDate = new Date(currentYear,currentJSMonthNumber,1);
//     const endDate = new Date(`${firstDate.getMonth()+1}/${currentMonthDays}/${currentYear}`);
//     this.store.dispatch(AssociateDashboardActions.loadCalendarData({userID:this.authState.currentUser!.userID, startDate:firstDate, endDate}));
//   }

//   generateCalendar(d: Date){ 
//     this.calInfo.currentJSMonthNumber = d.getMonth();
//     this.calInfo.currentMonthName = this.getMonthName(d);

//     this.calInfo.currentYear = d.getFullYear();
//     this.calInfo.currentMonthDays = this.daysInMonth(this.calInfo.currentYear, this.calInfo.currentJSMonthNumber + 1);
//     const prevMonth = new Date(this.calInfo.currentDate);
//     prevMonth.setMonth(this.calInfo.currentJSMonthNumber - 1);
//     this.calInfo.prevMonthDays = this.daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1);

//     const nextMonth = new Date(this.calInfo.currentDate);
//     nextMonth.setMonth(this.calInfo.currentJSMonthNumber + 1);

//     const firstDate = new Date(this.calInfo.currentYear,this.calInfo.currentJSMonthNumber,1);
//     this.calInfo.currentMonthFirstDayOfWeek = firstDate.getDay();
//     this.calInfo.currentMonthFirstDayOfWeekName = this.daysOfWeek[this.calInfo.currentMonthFirstDayOfWeek];

//     const total = 42;
//     var paddingDays = 0;
//     var paddingDayNumbers = 0;
//     if(this.calInfo.currentMonthFirstDayOfWeek !== 0){
//       paddingDays = this.calInfo.currentMonthFirstDayOfWeek;
//       paddingDayNumbers =  (this.calInfo.prevMonthDays - paddingDays + 1);
//     }

//     var paddingDayCount = paddingDays;
//     var paddingDayNumber = paddingDayNumbers;
//     this.calInfo.dayList = [];
//     for (let index = 1; index <= total; index++) {
//       let dayNumber = index;
//       let isPaddingDay = false;
//       let dt = `${prevMonth.getMonth()+1}/${dayNumber}/${this.calInfo.currentYear}`;
//       if(paddingDayCount > 0){
//         dayNumber = paddingDayNumber;
//         isPaddingDay = true;
//         dt = `${prevMonth.getMonth()+1}/${paddingDayNumber}/${prevMonth.getFullYear()}`;
//       } else {
//         if(index > (paddingDays + this.calInfo.currentMonthDays)){
//           dayNumber = index - (paddingDays + this.calInfo.currentMonthDays);
//           isPaddingDay = true;
//           dt = `${nextMonth.getMonth()+1}/${dayNumber}/${nextMonth.getFullYear()}`;
//         } else {
//           dayNumber = index - paddingDays;
//           isPaddingDay = false;
//           dt = `${this.calInfo.currentJSMonthNumber+1}/${dayNumber}/${this.calInfo.currentYear}`;
//         }
//       }
//       let day:CalendarDay = {
//         uId: index,
//         dayNumber:dayNumber,
//         isPaddingDay: isPaddingDay,
//         dt: dt,
//         fullDt: new Date(dt).toUTCString(),
//         showOrange: false,
//         showBlue: false,
//         showRed: false
//       }
//       this.calInfo.dayList.push(day);
//       paddingDayCount -= 1;
//       paddingDayNumber +=1;
//     }
//     this.calInfo.dayList.forEach((dt)=>{
//       if(!dt.isPaddingDay){
//         dt.showOrange = this.orangeDays.some((d)=>d === dt.dt);
//         dt.showBlue = this.blueDays.some((d)=>d === dt.dt);
//         dt.showRed = this.redDays.some((d)=>d === dt.dt);
//       }
//     })
//   }

//   prevMonth() {
//     const d = this.calInfo.currentDate;
//     d.setMonth(this.calInfo.currentJSMonthNumber - 1);
//     this.loadCalendar(d);
//   }

//   nextMonth() {
//     const d = this.calInfo.currentDate;
//     let newMonth = 0;
//     if (this.calInfo.currentJSMonthNumber === 11) {
//       newMonth = 0;
//       d.setFullYear(this.calInfo.currentYear + 1);
//     } else {
//       newMonth = this.calInfo.currentJSMonthNumber + 1;
//     }
//     d.setMonth(newMonth);
//     this.loadCalendar(d);
//   }

//   getMonthName = function (dt: Date) {
//     var m = dt.getMonth();
//     var rtn = "";
//     switch (m) {
//       case 0:
//         rtn = "January";
//         break;
//       case 1:
//         rtn = "February";
//         break;
//       case 2:
//         rtn = "March";
//         break;
//       case 3:
//         rtn = "April";
//         break;
//       case 4:
//         rtn = "May";
//         break;
//       case 5:
//         rtn = "June";
//         break;
//       case 6:
//         rtn = "July";
//         break;
//       case 7:
//         rtn = "August";
//         break;
//       case 8:
//         rtn = "September";
//         break;
//       case 9:
//         rtn = "October";
//         break;
//       case 10:
//         rtn = "November";
//         break;
//       case 11:
//         rtn = "December";
//         break;
//     }
//     return rtn;
//   };

//   ngOnDestroy(): void {
//     this.destroy$.next(true);
//     this.destroy$.unsubscribe();
//   }
// }