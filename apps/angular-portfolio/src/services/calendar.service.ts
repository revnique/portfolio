
// @ts-ignore
import configCalendar from './aws-export.calendar';
Amplify.configure(configCalendar as any);
import { Amplify } from 'aws-amplify';
import { generateClient } from "aws-amplify/api";
import { Injectable } from '@angular/core';
import { CalendarEvent } from '../store/portfolio-store/portfolio.state';
@Injectable({ providedIn: 'root' })
export class CalendarService {
  private calendarClient: any;
  constructor() {
    this.calendarClient = generateClient(configCalendar as any);
  }

  addCalendarEvent = async (event: CalendarEvent) => {
    const eventDate = new Date(event.eventDate);
    eventDate.setHours(eventDate.getHours() + 5);
    const response: any = await this.calendarClient.graphql({
      query: `
        mutation createCalendarEvent($createcalendareventinput: CreateCalendarEventInput!) {
          createCalendarEvent(input: $createcalendareventinput) {
            id
            title
            eventDate
            eventColor
          }
        }
      `,
      variables: {
          "createcalendareventinput": {
          "id": `${Date.now()}`,
          "title": event.title,
          "eventDate": eventDate.toISOString(),
          "eventColor": event.eventColor
        }
      }
      }
    );
    console.log("addCalendarEvent", response);
  }

  deleteCalendarEvent = async (id: string) => {
    console.log("deleteCalendarEvent", id);
    const response: any = await this.calendarClient.graphql({
      query: `
        mutation deleteCalendarEvent($deletecalendareventinput: DeleteCalendarEventInput!) {
          deleteCalendarEvent(input: $deletecalendareventinput) {
            id
          }
        }
      `,
      variables: {
        "deletecalendareventinput": {
          "id": id
        }
      }
    });
    console.log("deleteCalendarEvent", response);
  }

  fetchCalendarEvents = async () => {
    console.log("fetchCalendarEvents");
    const response: any = await this.calendarClient.graphql({
      query: `
        query listCalendarEvents {
          listCalendarEvents {
            items {
              id
              title
              eventDate
              eventColor
            }
          }
        }
      `
    });
    return response.data.listCalendarEvents.items;
  }
}
