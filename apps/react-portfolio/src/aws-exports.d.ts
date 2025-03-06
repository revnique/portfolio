declare module '../aws-exports' {
    const config: {
        aws_project_region: string;
        aws_appsync_graphqlEndpoint: string;
        aws_appsync_region: string;
        aws_appsync_authenticationType: string;
        [key: string]: any;
    };
    export default config;
} 