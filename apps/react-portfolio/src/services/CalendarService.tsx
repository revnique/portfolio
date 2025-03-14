import { CalendarEvent } from '../store/PortfolioStore/portfolio.state';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://igrvr4i6vjb6teheuevaxzzfsq.appsync-api.us-east-2.amazonaws.com/graphql',
      region: 'us-east-2',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-l4lmpncptncfvlicve3743ux54'
    }
  }
});
import { Amplify } from 'aws-amplify';  
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const addCalendarEvent = async (event: CalendarEvent) => {
  const eventDate = new Date(event.eventDate);
  eventDate.setHours(eventDate.getHours() + 5);
  const response: any = await client.graphql({
    query: `
      mutation createCalendarEvent($createcalendareventinput: CreateCalendarEventInput!) {
        createCalendarEvent(input: $createcalendareventinput) {
          title
          eventDate
          eventColor
        }
      }
    `,
    variables: {
        "createcalendareventinput": {
        "title": event.title,
        "eventDate": eventDate.toISOString().split('T')[0],
        "eventColor": event.eventColor
      }
    }
    }
  );
  console.log("addCalendarEvent", response);
}

export const deleteCalendarEvent = async (id: string) => {
  console.log("deleteCalendarEvent", id);
  const response: any = await client.graphql({
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

export const fetchCalendarEvents = async () => {
  console.log("fetchCalendarEvents");
  const response: any = await client.graphql({
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
      `,
  });
  return response.data.listCalendarEvents.items;
}

//"Validation error of type FieldUndefined: Field 'listCalendarEvents' in type 'Query' is undefined @ 'listCalendarEvents'"