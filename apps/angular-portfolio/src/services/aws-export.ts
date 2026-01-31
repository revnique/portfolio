const config =  {
    API: {
        GraphQL: {
          endpoint: 'https://igrvr4i6vjb6teheuevaxzzfsq.appsync-api.us-east-2.amazonaws.com/graphql',
          region: 'us-east-2',
          defaultAuthMode: 'apiKey',
          apiKey: 'da2-zdjehzbv6vbbjeksz3rcirruyi'
        },
    }
};

export default config;
// --> extend: aws appsync update-api-key --api-id zdahdw5q7rcvfkjz3fvzqk5lbu --id da2-zdjehzbv6vbbjeksz3rcirruyi --expires 1799711999 --region us-east-2
// https://www.epochconverter.com/ 1799711999 = Saturday, January 11, 2027 11:59:59 PM
