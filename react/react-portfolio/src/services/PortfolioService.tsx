
// @ts-ignore
import config from '../aws-exports';
Amplify.configure(config as any);
import { Amplify } from 'aws-amplify';  
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const fetchBuckLite = async (SN: string) => {
    console.log('fetchSingle svc');
    const response: any = await client.graphql({
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

export const fetchBuckLites = async () => {
    console.log('fetchBuckLites svc');
    const response: any = await client.graphql({
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

import { useState, useEffect } from 'react';

export const useBreakpoint = () => {
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};