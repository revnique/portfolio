import './BuckLitePage.scss';
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getMatches } from './buck-helper';
import { format } from 'date-fns';
import { BuckLite, Match } from './buck-helper';
import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';  
import { generateClient } from "aws-amplify/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faTrash, faCheckSquare, faSquare);
import { useSelector } from 'react-redux';
import { PortfolioState } from '../store/PortfolioStore/portfolio.state';
import { setIsPending, loadBuckLite, loadBuckLites } from '../store/PortfolioStore/portfolio.actions';
import { useDispatch } from 'react-redux';
import ValueBar from '../ValueBar/ValueBar';
import { useBreakpoint } from '../services/PortfolioService';
// @ts-ignore
import config from '../aws-exports';
Amplify.configure(config as any);

export default function BuckLitePage() {
    const state = useSelector((state:any) => state.portfolioReducer as PortfolioState);
    const dispatch = useDispatch();
    const [serialNumber, setSerialNumber] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [isFortWorth, setIsFortWorth] = useState(false);
    const client = generateClient();
    const queryClient = useQueryClient();
    const [selectedBuck, setSelectedBuck] = useState<BuckLite | null>(null);
    const breakpoint = useBreakpoint();
    const handleSerialNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        serialNumberChange(event.target.value);
    }
    const serialNumberChange = (val: string) => {
        if (checkSerial(val)) {
            const match = getMatches(val);
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
        dispatch(setIsPending(true));

      
      try {
        const buckLite:any = await fetchSingle();
        if (buckLite) {
          await update();
          dispatch(setIsPending(false));
        } else {
          addBuckLite.mutate({
            SN: serialNumber,
            CDT: CDT,
            isFW: isFW,
            index: -1,
            match: initialMatch,
          });
        }
      } catch (error) {
        addBuckLite.mutate({
          SN: serialNumber,
          CDT: CDT,
          isFW: isFW,
          index: -1,
          match: initialMatch,
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
            console.log('this is the error', err, newBuckLite);
            queryClient.setQueryData(
                ['addBuckLite', context?.newBuckLite.SN],
                context?.previousBuckLite,
            )
        },
        // Always refetch after error or success:
        onSettled: (newBuckLite: any) => {
            queryClient.invalidateQueries({ queryKey: ['addBuckLite', newBuckLite?.SN] });
            dispatch(setIsPending(false));
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
        console.log('setMatches', match);
    }
  
    const fetch = async () => {
        dispatch(loadBuckLites());
    }   
    const fetchSingle = async () => {
        dispatch(loadBuckLite(serialNumber));
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
        if (event.key === 'ArrowDown' ) {
            if (selectedBuck) {
                const index = selectedBuck.index + 1;
                if (index < state.BuckLites.length) {
                    selectBuck(state.BuckLites[index]);
                }
            }
        }
        if (event.key === 'ArrowUp' ) {
            if (selectedBuck) {
                const index = selectedBuck.index - 1;
                if (index >= 0) {
                    selectBuck(state.BuckLites[index]);
                }
            }
        }
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
                            </div>
                            <div className="form-group">
                                <label htmlFor="createDate">Create Date</label>
                                <input type="date" className="form-field" onChange={handleCreateDateChange} value={createDate} />
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={save}>Save</button>
                                <button type="button" onClick={fetch}>Fetch</button>
                                <button type="button" onClick={fetchSingle}>Get 1</button>
                            </div>
                        </form>
                        <div className="buck-value-container">
                            <div className="buck-value-label">Rating</div>
                            <ValueBar valueBarPositiveHeight={selectedBuck?.match?.RatingValue || 1} isHorizontal={true} length={breakpoint === 'mobile' ? 355 : 275} thickness={breakpoint === 'mobile' ? 20 : 30} />
                        </div>
                    </div>
                    <div className="buck-list-container">
                        <h1>Buck List</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Serial Number</th>
                                    <th>Date</th>
                                    <th>Rating</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {state.isPending && (
                                <tbody>
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="skeleton-loader-container">
                                                <div className="skeleton-loader-base"></div>
                                                <div className="skeleton-loader-indicator"></div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            {!state.isPending && (
                                <tbody>
                                    {state.BuckLites.map((buck: BuckLite) => (
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
                                                    <td className="align-right"><label htmlFor={buck.SN}>{buck.match?.RatingValue}&nbsp;&nbsp;&nbsp;</label></td>
                                                    <td>
                                                        <button onClick={() => deleteBuck(buck.SN)} className="delete-icon">
                                                            <FontAwesomeIcon icon="trash" className="delete-icon" />
                                                        </button>
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
                    </div>
                </div>
            </div>
        </>
    )
}
  