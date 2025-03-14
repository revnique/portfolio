
const configCalendar =  {
  API: {
      GraphQL: {
        endpoint: 'https://wbykhutk2rhepf5ovfe42wy4au.appsync-api.us-east-2.amazonaws.com/graphql',
        region: 'us-east-2',
        defaultAuthMode: 'apiKey',
        apiKey: 'da2-cncecdr7gzdkpc64ldn7ndbm7e'
      },
  }
};

export default configCalendar;
// --> extend: aws appsync update-api-key --api-id c3m5rksdibdjreb3v2m3pdnymu --id da2-cncecdr7gzdkpc64ldn7ndbm7e --expires 1768175999
// https://www.epochconverter.com/ 1768175999 = Sunday, January 11, 2026 11:59:59 PM
