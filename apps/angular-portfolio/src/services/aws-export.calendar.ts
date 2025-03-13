
const configCalendar =  {
  API: {
      GraphQL: {
        endpoint: 'https://pxqza7hxefg2ndtfngcur74mda.appsync-api.us-east-2.amazonaws.com/graphql',
        region: 'us-east-2',
        defaultAuthMode: 'apiKey',
        apiKey: 'da2-jdj4wh2itvgfxdpyh6frgp75te'
      },
  }
};

export default configCalendar;
// --> extend: aws appsync update-api-key --api-id 5urou4fqurdqdo35m6drtmqviy --id da2-jdj4wh2itvgfxdpyh6frgp75te --expires 1768175999
// https://www.epochconverter.com/ 1768175999 = Sunday, January 11, 2026 11:59:59 PM
