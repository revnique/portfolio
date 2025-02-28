import './BuckLitePage.scss';
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getMatches } from './buck-helper';
import { format } from 'date-fns';
import { BuckLite, Match } from './buck-helper';
import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';  
import { generateClient } from "aws-amplify/api";

// @ts-ignore
import config from '../aws-exports';
Amplify.configure(config as any);


export default function BuckLitePage() {
    // const [valueBarNegativeHeight, setValueBarNegativeHeight] = useState(30);
    // const [valueBarPositiveHeight, setValueBarPositiveHeight] = useState(70);
    
    // const updateValueBarPositiveHeight = (height: number) => {
    //     setValueBarPositiveHeight(height);
    //     setValueBarNegativeHeight(100 - height);
    // }
    const [serialNumber, setSerialNumber] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [isFortWorth, setIsFortWorth] = useState(false);
    const [isStarNote, setIsStarNote] = useState(false);
    const [isPalindrome, setIsPalindrome] = useState(false);
    const [isAllPairs2, setIsAllPairs2] = useState(false);
    const [isAllPairs4, setIsAllPairs4] = useState(false);
    const [isRepeatingPairs2, setIsRepeatingPairs2] = useState(false);
    const [isRepeatingPairs4, setIsRepeatingPairs4] = useState(false);
    const [isUniqueDigits, setIsUniqueDigits] = useState(false);
    const [isOneDigit, setIsOneDigit] = useState(false);
    const [isTwoDigits, setIsTwoDigits] = useState(false);
    const [isSixOrMoreSameDigit, setIsSixOrMoreSameDigit] = useState(false);
    const [isDate, setIsDate] = useState(false);
    const [isEuroDate, setIsEuroDate] = useState(false);
    const [bucks, setBucks] = useState<BuckLite[]>([]);
    const [isPending, setIsPending] = useState(false);
    const client = generateClient();
    const queryClient = useQueryClient();
    const [selectedBuck, setSelectedBuck] = useState<BuckLite | null>(null);

    const handleIsFortWorthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFortWorth(event.target.checked);
    }
    const handleIsStarNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsStarNote(event.target.checked);
    }
    const handleIsPalindromeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPalindrome(event.target.checked);
    }
    const handleIsAllPairs2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAllPairs2(event.target.checked);
    }
    const handleIsAllPairs4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAllPairs4(event.target.checked);
    }
    const handleIsRepeatingPairs2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRepeatingPairs2(event.target.checked);
    }
    const handleIsRepeatingPairs4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRepeatingPairs4(event.target.checked);
    }
    const handleIsUniqueDigitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUniqueDigits(event.target.checked);
    }
    const handleIsOneDigitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsOneDigit(event.target.checked);
    }
    const handleIsTwoDigitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsTwoDigits(event.target.checked);
    }
    const handleIsSixOrMoreSameDigitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSixOrMoreSameDigit(event.target.checked);
    }
    const handleIsDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDate(event.target.checked);
    }
    const handleIsEuroDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEuroDate(event.target.checked);
    }
    const handleSerialNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        serialNumberChange(event.target.value);
    }
    const serialNumberChange = (val: string) => {
        console.log('serialNumberChange', val);
        if (checkSerial(val)) {
            const match = getMatches(val);
            console.log(val, match);
            setMatches(match);
        } else {
            setMatches(initialMatch);
        }
        setSerialNumber(val);
    }
    
    const handleCreateDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreateDate(event.target.value);
    }

    const save = async () => {
        console.log('save');
        const CDT = createDate;
        const isFW = isFortWorth;
        setIsPending(true);

      
      try {
        const buckLite:any = await fetchSingle();
        if (buckLite) {
          await update();
          setIsPending(false);
          fetch();
        } else {
          addBuckLite.mutate({
            SN: serialNumber,
            CDT: CDT,
            isFW: isFW,
            index: -1,
          });
        }
      } catch (error) {
        addBuckLite.mutate({
          SN: serialNumber,
          CDT: CDT,
          isFW: isFW,
          index: -1,
        });
        console.log(error);
      }
    }


    const addBuckLite = useMutation({
        // mutationFn: (newBuckLite: BuckLite) => this.create(),
        // onSettled: () => this.queryClient.invalidateQueries({ queryKey: ['bucklites'] }),
        // mutationKey: ['addBuckLite'],

        mutationFn: async (newBuckLite: BuckLite) => {
            const CDT = createDate;
            const isFW = isFortWorth
            console.log('this is the new bucklite', newBuckLite);
            const response: any = await client.graphql({
                query: `
              mutation createBuckLite($createbuckliteinput: CreateBuckLiteInput!) {
                createBuckLite(input: $createbuckliteinput) {
                  SN
                  CDT
                  isFW
                }
              }
            `,
                variables: {
                    "createbuckliteinput": {
                        "SN": serialNumber,
                        "CDT": CDT,
                        "isFW": isFW,
                    }
                }
            });
            return response.data.createBuckLite;
        },
        // When mutate is called:
        onMutate: async (newBuckLite) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['addBuckLite', newBuckLite.SN] })

            // Snapshot the previous value
            const previousBuckLite = queryClient.getQueryData(['addBuckLite', newBuckLite.SN])

            // Optimistically update to the new value
            queryClient.setQueryData(['addBuckLite', newBuckLite.SN], newBuckLite)

            // Return a context with the previous and new todo
            return { previousBuckLite, newBuckLite }
        },
        // If the mutation fails, use the context we returned above
        onError: (err, newBuckLite, context) => {
            console.log('this is the error', err);
            queryClient.setQueryData(
                ['addBuckLite', context?.newBuckLite.SN],
                context?.previousBuckLite,
            )
        },
        // Always refetch after error or success:
        onSettled: (newBuckLite: any) => {
            queryClient.invalidateQueries({ queryKey: ['addBuckLite', newBuckLite?.SN] });
            setIsPending(false);
            fetch();
        },
    });




    const update = async () => {
        const CDT = createDate;
        const isFW = isFortWorth;
        console.log('update', CDT);
        const response: any = await client.graphql({
            query: `
            mutation updateBuckLite($updatebuckliteinput: UpdateBuckLiteInput!) {
              updateBuckLite(input: $updatebuckliteinput) {
                SN
                CDT
                isFW
              }
            }
          `,
            variables: {
                "updatebuckliteinput": {
                    "SN": serialNumber,
                    "CDT": CDT,
                    "isFW": isFW,
                }
            }
        });
        console.log(response);
    }

    const formatDateFns = (date: Date) => {
        return format(date, 'MM/dd/yyyy');
    };

    const initialMatch: Match = {
        IsStarNote: false,
        IsAllPairs2: false,
        IsAllPairs4: false,
        IsRepeatingPairs2: false,
        IsRepeatingPairs4: false,
        IsUniqueDigits: false,
        IsOneDigit: false,
        IsTwoDigits: false,
        IsSixOrMoreSameDigit: false,
        IsPalindrome: false,
        IsDate: false,
        IsEuroDate: false,
        IsConsectutiveAscending: false,
        IsConsectutiveDescending: false,
        IsConsectutivePairAscending: false,
        IsConsectutivePairDescending: false,
        InARowCount: 0,
        IsDateDate: null,
        IsEuroDateDate: null,
        RatingValue: 0
    };

    const checkSerial = (sn: string) => {
        var pattern = new RegExp(/^[a-lA-L]{1}\d{8}[a-np-yA-NP-Y*]{1}$/);
        var isMatch = pattern.test(sn);
        return isMatch;
    }

    const setMatches = (match: Match) => {
        setIsStarNote(match.IsStarNote);
        setIsAllPairs2(match.IsAllPairs2);
        setIsAllPairs4(match.IsAllPairs4);
        setIsRepeatingPairs2(match.IsRepeatingPairs2);
        setIsRepeatingPairs4(match.IsRepeatingPairs4);
        setIsUniqueDigits(match.IsUniqueDigits);
        setIsOneDigit(match.IsOneDigit);
        setIsTwoDigits(match.IsTwoDigits);
        setIsSixOrMoreSameDigit(match.IsSixOrMoreSameDigit);
        setIsPalindrome(match.IsPalindrome);
        setIsDate(match.IsDate);
        setIsEuroDate(match.IsEuroDate);
    }
  
    const fetch = async () => {
        console.log('fetch');
        const response:any = await client.graphql({
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
          console.log(response);
          let tmp = response.data.listBuckLites.items;
          tmp.forEach((buck: any, index: number) => {
            buck.index = index;
          });
          setBucks(tmp);
    }   
    const fetchSingle = async () => {
        console.log('fetchSingle');
        const response:any = await client.graphql({
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
            "SN": serialNumber
          }
        });
        console.log(response);
        setBucks([response.data.getBuckLite]);
        return response.data.getBuckLite;
    }
    const selectBuck = (buck: BuckLite) => {
        console.log('selectBuck', buck);
        serialNumberChange(buck.SN);
        setSelectedBuck(buck);
        setSerialNumber(buck.SN);
        setCreateDate(buck.CDT);
        setIsFortWorth(buck.isFW);
    }
    const onKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
        console.log('onKeyDown', event);
    }
    const deleteBuck = async (serialNumber: string) => {
        await client.graphql({
            query: `
              mutation deleteBuckLite($deletebuckliteinput: DeleteBuckLiteInput!) {
                deleteBuckLite(input: $deletebuckliteinput) {
                  SN
                }
              }
            `,
            variables: {
                "deletebuckliteinput": {
                    "SN": serialNumber,
                }
            }
        });
        fetch();
    }
    useEffect(() => {
        const val = 'K77777773*';
        setCreateDate(new Date('11/11/2024').toISOString().split('T')[0]);
        serialNumberChange(val);
        fetch();
    }, []);

    return (
        <>
            <div className="main-content-header">
                <div className="summary">
                    <h1>BuckLite</h1>
                    <p>BuckLite is a simple budgeting app that allows you to track your income and expenses.</p>
                </div>
            </div>
            <div className="main-content-body">
                <div className="content-container">
                <div className="buck-input-container">
                    <h1>Buck Input</h1>
                    <form className="form-container">
                        <div className="form-group">
                            <label htmlFor="serialNumber">Serial Number</label>
                            <input type="text" className="form-field" onChange={handleSerialNumberChange} value={serialNumber} />
                            {/* <TextField className="form-field" label="Serial Number" variant="filled" onChange={handleSerialNumberChange}
                                value={serialNumber}
                            /> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="createDate">Create Date</label>
                            <input type="date" className="form-field" onChange={handleCreateDateChange} value={createDate} />
                            {/* <TextField className="form-field" label="Create Date" type="date" variant="filled"
                                value={createDate}
                                onChange={handleCreateDateChange}
                            /> */}
                        </div>
                        <div className="form-group">
                            <div className="form-group-checkbox-container">
                                <label htmlFor="isFortWorth">IsFortWorth</label>
                                <input type="checkbox" className="form-field" checked={isFortWorth} id="isFortWorth" onChange={handleIsFortWorthChange} />
                            </div>
                            {/* <Checkbox className="example-margin" checked={isFortWorth} id="isFortWorth" onChange={handleIsFortWorthChange} />
                            <label htmlFor="isFortWorth">IsFortWorth</label> */}
                        </div>
                        <div className="button-container">
                            <button type="button" onClick={save}>Save</button>
                            <button type="button" onClick={fetch}>Fetch</button>
                            <button type="button" onClick={fetchSingle}>Get 1</button>
                        </div>
                    </form>
                </div>
                {/* <div className="buck-list-container">
                    <h1>Buck List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Date</th>
                                <th>isFW</th>
                                <th></th>
                            </tr>
                        </thead>
                        {isPending && (
                            <tbody>
                                <tr>
                                    <td colSpan={4}>
                                        <Skeleton count={1} height={30} className="skeleton-loader" />
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!isPending && (
                            <tbody>
                                {bucks.map((buck: BuckLite) => (
                                    buck ? (
                                        <tr key={buck.SN} onClick={() => selectBuck(buck)} className={selectedBuck === buck ? 'selected' : ''} onKeyDown={onKeyDown}>
                                            <>
                                                <td>
                                                    <div className="checkbox-container">
                                                        <label htmlFor={buck.SN}>{buck.SN}</label>
                                                        <input type="checkbox" id={buck.SN} className="hidden" checked={selectedBuck === buck} onChange={() => selectBuck(buck)} />
                                                    </div>
                                                </td>
                                                <td><label htmlFor={buck.SN}>{formatDateFns(new Date(buck.CDT))}</label></td>
                                                <td>
                                                    <label htmlFor={buck.SN}>
                                                        {buck.isFW ? (<FiCheckSquare />) : (<FiSquare />)}
                                                    </label>
                                                </td>
                                                <td>
                                                    <IconButton onClick={() => deleteBuck(buck.SN)}>
                                                        <MdDelete className="delete-icon" />
                                                    </IconButton>
                                                </td>
                                            </>
                                        </tr>
                                    ) : (
                                        <tr key={'no-buck'}><td>No buck</td></tr>
                                    )
                                ))}
                            </tbody>
                        )}
                    </table>
                </div> */}



                    {/* <form>
                        <div className="form-group">
                            <div>
                                <label htmlFor="value0" onClick={() => updateValueBarPositiveHeight(0)}>0</label>
                                <input type="range" id="value0" min="0" max="100" value={valueBarPositiveHeight} onChange={(e) => updateValueBarPositiveHeight(+e.target.value)} />
                                <label htmlFor="value100" onClick={() => updateValueBarPositiveHeight(100)}>100</label>
                            </div>
                        </div>
                    </form>
                    <div className="value-bar-container">
                        <div className="value-bar-negative" style={{ height: `${valueBarNegativeHeight}%` }}></div>
                        <div className="value-bar-positive" style={{ height: `${valueBarPositiveHeight}%` }}></div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
  