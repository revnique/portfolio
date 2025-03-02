import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Amplify } from 'aws-amplify';
import config from '../../../aws-export';
import { generateClient } from 'aws-amplify/api';
import { getMatches, Match, BuckLite } from './buck-helper';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-buck-lite',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
    templateUrl: './buck-lite.component.html',
    styleUrl: './buck-lite.component.scss'
})
export class BuckLiteComponent implements OnInit {
  faTrash = faTrash;
  buckInputForm = new FormGroup({
    serialNumber: new FormControl('', [Validators.required, Validators.pattern(/^[a-lA-L]{1}\d{8}[a-np-yA-NP-Y*]{1}$/)]),
    createDate: new FormControl('', [Validators.required]),
    isFortWorth: new FormControl(false),
    isStarNote: new FormControl(false),
    IsAllPairs2: new FormControl(false),
    IsAllPairs4: new FormControl(false),
    IsRepeatingPairs2: new FormControl(false),
    IsRepeatingPairs4: new FormControl(false),
    IsUniqueDigits: new FormControl(false),
    IsOneDigit: new FormControl(false),
    IsTwoDigits: new FormControl(false),
    IsSixOrMoreSameDigit: new FormControl(false),
    IsPalindrome: new FormControl(false),
    IsDate: new FormControl(false),
    IsEuroDate: new FormControl(false),
  });
  client = generateClient();
  bucks: BuckLite[] = [];
  selectedBuck: BuckLite | null = null;
  queryClient = inject(QueryClient);
  isPending = false;
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  initialMatch: Match = {
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

  ngOnInit(): void {
    Amplify.configure(config as any);
    this.buckInputForm.get('createDate')?.setValue(new Date('2024-11-11').toISOString().slice(0, 10));
    this.buckInputForm.get('serialNumber')?.valueChanges.subscribe((val: string | null) => {
      if (val) {
        const serialIsValid = this.checkSerial(val);
        if (serialIsValid) {
          const match = getMatches(val);
          console.log(val, match);
          this.setMatches(match);
        } else {
          this.setMatches(this.initialMatch);
        }
      }
    });
    this.buckInputForm.get('isStarNote')?.disable();
    this.buckInputForm.get('IsAllPairs2')?.disable();
    this.buckInputForm.get('IsAllPairs4')?.disable();
    this.buckInputForm.get('IsRepeatingPairs2')?.disable();
    this.buckInputForm.get('IsRepeatingPairs4')?.disable();
    this.buckInputForm.get('IsUniqueDigits')?.disable();
    this.buckInputForm.get('IsOneDigit')?.disable();
    this.buckInputForm.get('IsTwoDigits')?.disable();
    this.buckInputForm.get('IsSixOrMoreSameDigit')?.disable();
    this.buckInputForm.get('IsPalindrome')?.disable();
    this.buckInputForm.get('IsDate')?.disable();
    this.buckInputForm.get('IsEuroDate')?.disable();
    this.buckInputForm.get('serialNumber')?.setValue('K77777773*');
    this.fetch();
  }

  setMatches(match: Match) {
    this.buckInputForm.get('isStarNote')?.setValue(match.IsStarNote);
    this.buckInputForm.get('IsAllPairs2')?.setValue(match.IsAllPairs2);
    this.buckInputForm.get('IsAllPairs4')?.setValue(match.IsAllPairs4);
    this.buckInputForm.get('IsRepeatingPairs2')?.setValue(match.IsRepeatingPairs2);
    this.buckInputForm.get('IsRepeatingPairs4')?.setValue(match.IsRepeatingPairs4);
    this.buckInputForm.get('IsUniqueDigits')?.setValue(match.IsUniqueDigits);
    this.buckInputForm.get('IsOneDigit')?.setValue(match.IsOneDigit);
    this.buckInputForm.get('IsTwoDigits')?.setValue(match.IsTwoDigits);
    this.buckInputForm.get('IsSixOrMoreSameDigit')?.setValue(match.IsSixOrMoreSameDigit);
    this.buckInputForm.get('IsPalindrome')?.setValue(match.IsPalindrome);
    this.buckInputForm.get('IsDate')?.setValue(match.IsDate);
    this.buckInputForm.get('IsEuroDate')?.setValue(match.IsEuroDate);
  }

  checkSerial(sn: string) {
    var pattern = new RegExp(/^[a-lA-L]{1}\d{8}[a-np-yA-NP-Y*]{1}$/);
    var isMatch = pattern.test(sn);
    return isMatch;
}

  async save() {
    console.log(this.buckInputForm.value);
    const CDT = new Date(this.buckInputForm.get('createDate')?.value!).toISOString().slice(0, 10);
    const isFW = this.buckInputForm.get('isFortWorth')?.value!;
    this.isPending = true;

    
    try {
      const buckLite:any = await this.fetchSingle();
      if (buckLite) {
        await this.update();
        this.isPending = false;
        this.fetch();
      } else {
        this.addBuckLite.mutate({
          SN: this.buckInputForm.get('serialNumber')?.value!,
          CDT: CDT,
          isFW: isFW,
          index: -1,
        });
      }
    } catch (error) {
      this.addBuckLite.mutate({
        SN: this.buckInputForm.get('serialNumber')?.value!,
        CDT: CDT,
        isFW: isFW,
        index: -1,
      });
      console.log(error);
    }
  }

  async create() {
    const CDT = new Date(this.buckInputForm.get('createDate')?.value!).toISOString().slice(0, 10);
    const isFW = this.buckInputForm.get('isFortWorth')?.value!;
    return await this.client.graphql({
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
          "SN": this.buckInputForm.get('serialNumber')?.value!,
          "CDT": CDT,
          "isFW": isFW,
        }
      }
    });
  }

  async fetchSingle() {
    console.log('fetch');
    const response:any = await this.client.graphql({
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
        "SN": this.buckInputForm.get('serialNumber')?.value!,
      }
    });
    this.bucks = [response.data.getBuckLite];
    return response.data.getBuckLite;
  }

  async fetch() {
    console.log('fetch');
    const response:any = await this.client.graphql({
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
    this.bucks = response.data.listBuckLites.items;
    this.bucks.forEach((buck, index) => {
      buck.index = index;
    });
  }

  async update() {
    const CDT = new Date(this.buckInputForm.get('createDate')?.value!).toISOString().slice(0, 10);
    const isFW = this.buckInputForm.get('isFortWorth')?.value || false;
    console.log('update', CDT);
    const response:any = await this.client.graphql({
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
          "SN": this.buckInputForm.get('serialNumber')?.value!,
          "CDT": CDT,
          "isFW": isFW,
        }
      }
    });
  }

  async delete(SN: string) {
    await this.client.graphql({
      query: `
        mutation deleteBuckLite($deletebuckliteinput: DeleteBuckLiteInput!) {
          deleteBuckLite(input: $deletebuckliteinput) {
            SN
          }
        }
      `,
      variables: {
        "deletebuckliteinput": {
          "SN": SN,
        }
      }
    });
    this.fetch();
  }

  selectBuck(buck: any) {
    this.selectedBuck = buck;
    this.buckInputForm.get('serialNumber')?.setValue(buck.SN);
    this.buckInputForm.get('createDate')?.setValue(buck.CDT);
    this.buckInputForm.get('isFortWorth')?.setValue(buck.isFW);
  }

  addBuckLite = injectMutation(() => ({
    // mutationFn: (newBuckLite: BuckLite) => this.create(),
    // onSettled: () => this.queryClient.invalidateQueries({ queryKey: ['bucklites'] }),
    // mutationKey: ['addBuckLite'],

    mutationFn: async (newBuckLite: BuckLite) => {
      const CDT = new Date(this.buckInputForm.get('createDate')?.value!).toISOString().slice(0, 10);
      const isFW = this.buckInputForm.get('isFortWorth')?.value!;
      console.log('this is the new bucklite', newBuckLite);
      const response:any = await this.client.graphql({
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
            "SN": this.buckInputForm.get('serialNumber')?.value!,
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
      await this.queryClient.cancelQueries({ queryKey: ['addBuckLite', newBuckLite.SN] })
  
      // Snapshot the previous value
      const previousBuckLite = this.queryClient.getQueryData(['addBuckLite', newBuckLite.SN])
  
      // Optimistically update to the new value
      this.queryClient.setQueryData(['addBuckLite', newBuckLite.SN], newBuckLite)
  
      // Return a context with the previous and new todo
      return { previousBuckLite, newBuckLite }
    },
    // If the mutation fails, use the context we returned above
    onError: (err, newBuckLite, context) => {
      console.log('this is the error', err);
      this.queryClient.setQueryData(
        ['addBuckLite', context?.newBuckLite.SN],
        context?.previousBuckLite,
      )
    },
    // Always refetch after error or success:
    onSettled: (newBuckLite: any) => {
      this.queryClient.invalidateQueries({ queryKey: ['addBuckLite', newBuckLite?.SN] });
      this.isPending = false;
      this.fetch();
    },

  }));

  onKeyDown(event: KeyboardEvent) {
    console.log('onKeyDown', event.key);
    if (event.key === 'ArrowDown' ) {
      if (this.selectedBuck) {
        const index = this.selectedBuck.index + 1;
        if (index < this.bucks.length) {
          this.selectBuck(this.bucks[index]);
        }
      }
    }
    if (event.key === 'ArrowUp' ) {
      if (this.selectedBuck) {
        const index = this.selectedBuck.index - 1;
        if (index >= 0) {
          this.selectBuck(this.bucks[index]);
        }
      }
    }
  }
}
