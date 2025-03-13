
// @ts-ignore
import config from './aws-export';
Amplify.configure(config as any);
import { Amplify } from 'aws-amplify';
import { generateClient } from "aws-amplify/api";
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private client: any;
  constructor() {
    this.client = generateClient();
  }

  fetchBuckLite = async (SN: string) => {
    console.log('fetchSingle svc');
    const response: any = await this.client.graphql({
      query: `
            query getBuckLite($SN: String!) {
              getBuckLite(SN: $SN) {
                SN
                CDT
                isFW
              }
            }
          `,
      variables: {
        "SN": SN
      }
    });
    return response.data.getBuckLite;
  }

  fetchBuckLites = async () => {
    console.log('fetchBuckLites svc');
    const response: any = await this.client.graphql({
      query: `
          query listBuckLites {
            listBuckLites {
              items {
                SN
                CDT
                isFW
              }
            }
          }
        `,
    });
    let tmp = response.data.listBuckLites.items;
    tmp.forEach((buck: any, index: number) => {
      buck.index = index;
    });
    return tmp;
  }
}
