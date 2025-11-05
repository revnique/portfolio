# Console.log Report

## Summary
Found **48 console.log statements** across **15 files** in the portfolio codebase.

---

## Detailed Report

### 1. apps/angular-portfolio/src/app/components-page/components-page.component.ts

**Line 41:**
```typescript
  
  updateValueBarPositiveHeight(value: number) {
    console.log(value);
    this.valueBarPositiveHeight = value;
    this.valueBarNegativeHeight = 100 - value;
```

**Line 44:**
```typescript
    this.valueBarPositiveHeight = value;
    this.valueBarNegativeHeight = 100 - value;
    console.log(this.valueBarPositiveHeight, this.valueBarNegativeHeight);
  }
}
```

---

### 2. apps/react-portfolio/src/BuckLite/BuckLitePage.tsx

**Line 70:**
```typescript

    const save = async () => {
        console.log('save');
        const CDT = createDate;
        const isFW = isFortWorth;
```

**Line 98:**
```typescript
          match: initialMatch,
        });
        console.log(error);
      }
    }
```

**Line 111:**
```typescript
            const CDT = createDate;
            const isFW = isFortWorth
            console.log('this is the new bucklite', newBuckLite);
            const response: any = await client.graphql({
                query: `
```

**Line 149:**
```typescript
        // If the mutation fails, use the context we returned above
        onError: (err, newBuckLite, context) => {
            console.log('this is the error', err, newBuckLite);
            queryClient.setQueryData(
                ['addBuckLite', context?.newBuckLite.SN],
```

**Line 169:**
```typescript
        const CDT = createDate;
        const isFW = isFortWorth;
        console.log('update', CDT);
        const response: any = await client.graphql({
            query: `
```

**Line 188:**
```typescript
            }
        });
        console.log(response);
    }

```

**Line 219:**
```typescript

    const setMatches = (match: Match) => {
        console.log('setMatches', match);
    }
  
```

**Line 229:**
```typescript
    }
    const selectBuck = (buck: BuckLite) => {
        console.log('selectBuck', buck);
        serialNumberChange(buck.SN);
        setSelectedBuck(buck);
```

**Line 237:**
```typescript
    }
    const onKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
        console.log('onKeyDown', event);
        if (event.key === 'ArrowDown' ) {
            if (selectedBuck) {
```

---

### 3. apps/react-portfolio/src/EventsCalendar/EventsCalendar.tsx

**Line 17:**
```typescript
    }
    const deleteEvent = (event: CalendarEvent) => {
        console.log('deleteEvent', event);
    }
    const saveEvent = () => {
```

---

### 4. apps/react-portfolio/src/store/PortfolioStore/portfolio.reducer.tsx

**Line 9:**
```typescript

const portfolioReducer = (state = initialPortfolioState, action:any) => {
    console.log('portfolio action', action);
    switch (action.type) {
        case LoadBuckLites:
```

**Line 75:**
```typescript
            };
        case LoadCalendarEventsSuccess:
            console.log('LoadCalendarEventsSuccess', action.payload);
            let redDays = action.payload.filter((event: CalendarEvent) => event.eventColor === 'red').map((event: CalendarEvent) => {
                const evt = JSON.parse(JSON.stringify(event));
```

---

### 5. apps/react-portfolio/src/services/CalendarService.tsx

**Line 39:**
```typescript
    }
  );
  console.log("addCalendarEvent", response);
}

```

**Line 43:**
```typescript

export const deleteCalendarEvent = async (id: string) => {
  console.log("deleteCalendarEvent", id);
  const response: any = await client.graphql({
    query: `
```

**Line 58:**
```typescript
    }
  });
  console.log("deleteCalendarEvent", response);
}

```

**Line 62:**
```typescript

export const fetchCalendarEvents = async () => {
  console.log("fetchCalendarEvents");
  const response: any = await client.graphql({
      query: `
```

---

### 6. apps/react-portfolio/src/RevniqueCalendar/RevniqueCalendar.tsx

**Line 40:**
```typescript
    const generateCalendar = (d: Date) => {
        calInfo.currentDate = d;
        console.log("generateCalendar", d);
        calInfo.currentJSMonthNumber = d.getMonth();
        calInfo.currentMonthName = d.getMonthName();
```

**Line 67:**
```typescript
        var paddingDayCount = paddingDays;
        var paddingDayNumber = paddingDayNumbers;
        console.log('calInfo', calInfo);
        setCalInfoState({...calInfo});

```

**Line 71:**
```typescript

        let todayDt = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
        console.log("todayDt", todayDt);
        for (let index = 1; index <= total; index++) {
            let dayNumber = index;
```

---

### 7. apps/angular-portfolio/src/store/portfolio-store/portfolio.reducer.ts

**Line 28:**
```typescript
    }),
    on(PortfolioActions.loadBuckLiteSuccess, (state, action) => {
        console.log('loadBuckLiteSuccess', action, state);
        let buckLite = JSON.parse(JSON.stringify(action.buckLite));
        if (buckLite) {
```

**Line 49:**
```typescript
    })),
    on(PortfolioActions.loadCalendarEventsSuccess, (state, action) => {
        console.log("loadCalendarEventsSuccess", action.events);
        let redDays = action.events.filter(event => event.eventColor === 'red').map(event => {
            const evt = JSON.parse(JSON.stringify(event));
```

**Line 76:**
```typescript
            return evt;
        });
        console.log("redDays", redDays);
        return {
            ...state,
```

---

### 8. apps/angular-portfolio/src/app/events-calendar/events-calendar.component.ts

**Line 52:**
```typescript

  deleteEvent(selectedEvent: CalendarEvent){
    console.log("deleteEvent", selectedEvent.id);
    this.store.dispatch(PortfolioActions.deleteCalendarEvent({
      id: selectedEvent.id
```

---

### 9. apps/angular-portfolio/src/services/calendar.service.ts

**Line 19:**
```typescript
    const eventDate = new Date(event.eventDate);
    eventDate.setHours(eventDate.getHours() + 6);
    console.log("eventDate", eventDate, eventDate.toISOString().slice(0, 10));
    const response: any = await this.calendarClient.graphql({
      query: `
```

**Line 39:**
```typescript
      }
    );
    console.log("addCalendarEvent", response);
  }

```

**Line 43:**
```typescript

  deleteCalendarEvent = async (id: string) => {
    console.log("deleteCalendarEvent", id);
    const response: any = await this.calendarClient.graphql({
      query: `
```

**Line 58:**
```typescript
      }
    });
    console.log("deleteCalendarEvent", response);
  }

```

**Line 62:**
```typescript

  fetchCalendarEvents = async () => {
    console.log("fetchCalendarEvents");
    const response: any = await this.calendarClient.graphql({
      query: `
```

---

### 10. apps/react-portfolio/src/services/PortfolioService.tsx

**Line 18:**
```typescript

export const fetchBuckLite = async (SN: string) => {
    console.log('fetchSingle svc');
    const response: any = await client.graphql({
        query: `
```

**Line 37:**
```typescript

export const fetchBuckLites = async () => {
    console.log('fetchBuckLites svc');
    const response: any = await client.graphql({
        query: `
```

---

### 11. apps/angular-portfolio/src/services/portfolio.service.ts

**Line 16:**
```typescript

  fetchBuckLite = async (SN: string) => {
    console.log('fetchSingle svc');
    const response: any = await this.client.graphql({
      query: `
```

**Line 35:**
```typescript

  fetchBuckLites = async () => {
    console.log('fetchBuckLites svc');
    const response: any = await this.client.graphql({
      query: `
```

---

### 12. apps/angular-portfolio/src/app/buck-lite/buck-lite.component.ts

**Line 71:**
```typescript
  ngOnInit(): void {
    this.setMediaBreakpoint();
    console.log('ngOnInit', this.state$);
    Amplify.configure(config as any);
    this.state$.subscribe((state: PortfolioState) => {
```

**Line 111:**
```typescript

  async save() {
    console.log(this.buckInputForm.value);
    const CDT = new Date(this.buckInputForm.get('createDate')?.value!).toISOString().slice(0, 10);
    const isFW = this.buckInputForm.get('isFortWorth')?.value!;
```

**Line 139:**
```typescript
        match: this.initialMatch,
      });
      console.log(error);
    }
  }
```

**Line 177:**
```typescript
    const CDT = new Date(this.buckInputForm.get('createDate')?.value!).toISOString().slice(0, 10);
    const isFW = this.buckInputForm.get('isFortWorth')?.value || false;
    console.log('update', CDT);
    const response:any = await this.client.graphql({
      query: `
```

**Line 231:**
```typescript
      const CDT = new Date(this.buckInputForm.get('createDate')?.value!).toISOString().slice(0, 10);
      const isFW = this.buckInputForm.get('isFortWorth')?.value!;
      console.log('this is the new bucklite', newBuckLite);
      const response:any = await this.client.graphql({
        query: `
```

**Line 269:**
```typescript
    // If the mutation fails, use the context we returned above
    onError: (err, newBuckLite, context) => {
      console.log('this is the error', err);
      this.queryClient.setQueryData(
        ['addBuckLite', context?.newBuckLite.SN],
```

**Line 300:**
```typescript

  onKeyDown(event: KeyboardEvent) {
    console.log('onKeyDown', event.key);
    if (event.key === 'ArrowDown' ) {
      if (this.selectedBuck) {
```

---

### 13. apps/react-portfolio/src/RevniqueCalendar/date.ts

**Line 198:** (Commented out)
```typescript
    };

    //console.log("rtn", rtn);
    return rtn;
};
```

---

### 14. apps/angular-portfolio/src/app/revnique-calendar/date.ts

**Line 198:** (Commented out)
```typescript
    };

    //console.log("rtn", rtn);
    return rtn;
};
```

---

### 15. apps/angular-portfolio/src/app/buck-lite/buck-helper.ts

**Line 256:** (Commented out)
```typescript
        }
    }
    //console.log(`winner ${winner}, winnerCount ${rtn}`);
    return rtn > 1 ? rtn + 1 : rtn;
}
```

---

### 16. apps/react-portfolio/src/store/root.reducer.tsx

**Line 7:**
```typescript

const reducer = (state = initialRootState, action:any) => {
    console.log('root action', action);
    switch (action.type) {
        case ToggleSideBarSuccess:
```

---

### 17. apps/angular-portfolio/src/app/app.config.ts

**Line 16:** (Comment)
```typescript
import portfolioReducer from '../store/portfolio-store/portfolio.reducer';
import rootReducer from '../store/root.reducer';
// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
```

**Line 19:**
```typescript
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

```

**Line 20:**
```typescript
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
```

---

## Analysis

### By File Type:
- **TypeScript Component Files (.ts/.tsx)**: 41 console.logs
- **Service Files**: 10 console.logs
- **Reducer Files**: 5 console.logs
- **Helper/Utility Files**: 3 console.logs (commented out)

### By Framework:
- **Angular Portfolio**: 25 console.logs
- **React Portfolio**: 23 console.logs

### Categories:
1. **Debugging statements**: Most console.logs are used for debugging purposes
2. **Action/State logging**: Several in reducers for tracking state changes
3. **Service call logging**: Multiple in service files tracking API calls
4. **Event handling**: Several in event handlers and user interactions
5. **Commented out**: 3 console.logs are commented out

### Recommendations:
1. Consider removing or replacing console.logs in production code
2. Use a proper logging library for production environments
3. Replace debug console.logs with conditional logging based on environment
4. Clean up commented-out console.logs
5. Consider using a logger service that can be configured per environment

# MCP Servers

### using https://github.com/jbchouinard/mcp-document-reader
### https://github.com/eyalzh/browser-control-mcp?tab=readme-ov-file#installation