import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Amplify } from 'aws-amplify';
import config from '../../services/aws-export';
import { generateClient } from 'aws-amplify/api';
import { getMatches, Match, BuckLite } from './buck-helper';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { PortfolioState } from '../../store/portfolio-store/portfolio.state';
import { PortfolioActions, selectPortfolioState } from '../../store/portfolio-store/portfolio.actions';
import { ValueBarComponent } from '../value-bar/value-bar.component';
@Component({
    selector: 'app-buck-lite',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, ValueBarComponent],
    templateUrl: './buck-lite.component.html',
    styleUrl: './buck-lite.component.scss'
})
export class BuckLiteComponent implements OnInit {
  showSummary = false;
  errorMessage = '';
  constructor(private store: Store<{ portfolio: PortfolioState }>) {}
  @HostListener('window:resize', ['$event'])
  mediaBreakpoint: string = 'desktop';

  onResize(event: Event) {
    this.setMediaBreakpoint();
  }
  faTrash = faTrash;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  buckInputForm = new FormGroup({
    serialNumber: new FormControl('', [Validators.required, Validators.pattern(/^[a-lA-L]{1}\d{8}[a-np-yA-NP-Y*]{1}$/)]),
    createDate: new FormControl('', [Validators.required]),
    isFortWorth: new FormControl(false),
  });
  client = generateClient();
  selectedBuck: BuckLite | null = null;
  queryClient = inject(QueryClient);
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
  state$ = this.store.select(selectPortfolioState);
  state: PortfolioState | null = null;
  ngOnInit(): void {
    this.setMediaBreakpoint();
    console.log('ngOnInit', this.state$);
    Amplify.configure(config as any);
    this.state$.subscribe((state: PortfolioState) => {
      this.state = state;
    });
    this.buckInputForm.get('createDate')?.setValue(new Date('2024-11-11').toISOString().slice(0, 10));
    this.buckInputForm.get('serialNumber')?.valueChanges.subscribe((val: string | null) => {
      this.errorMessage = '';
      if (val) {
        const serialIsValid = this.checkSerial(val);
        if (serialIsValid) {
          const match = getMatches(val);
        } else {
          this.selectedBuck = null;
          this.errorMessage = 'Invalid serial number';
        }
      }
    });
    this.buckInputForm.get('serialNumber')?.setValue('A01233210A');
    this.fetch();
  }

  setMediaBreakpoint() {
    const width = window.innerWidth;
    if (width < 768) this.mediaBreakpoint = 'mobile';
    else if (width < 1024) this.mediaBreakpoint = 'tablet';
    else this.mediaBreakpoint = 'desktop';
  }

  toggleSummary() {
    this.showSummary = !this.showSummary;
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

    
    try {
      const buckLite:any = await this.fetchSingle();
      if (buckLite) {
        await this.update();
        this.store.dispatch(PortfolioActions.setIsPending({ isPending: false }));
        this.fetch();
      } else {
        this.addBuckLite.mutate({
          SN: this.buckInputForm.get('serialNumber')?.value!,
          CDT: CDT,
          isFW: isFW,
          index: -1,
          match: this.initialMatch,
        });
      }
    } catch (error) {
      this.addBuckLite.mutate({
        SN: this.buckInputForm.get('serialNumber')?.value!,
        CDT: CDT,
        isFW: isFW,
        index: -1,
        match: this.initialMatch,
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
    this.store.dispatch(PortfolioActions.loadBuckLite({SN: this.buckInputForm.get('serialNumber')?.value!}));
  }

  async fetch() {
    this.store.dispatch(PortfolioActions.loadBuckLites());
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
      this.store.dispatch(PortfolioActions.setIsPending({ isPending: false }));
      this.fetch();
    },

  }));

  onSerialNumberInput(event: any, sn: HTMLInputElement) {
    if (sn.value.length === 10 && this.checkSerial(sn.value)) {
      const currentBuck = {
        SN: sn.value,
        CDT: this.buckInputForm.get('createDate')?.value!,
        isFW: this.buckInputForm.get('isFortWorth')?.value!,
        index: -1,
        match: getMatches(sn.value),
      };
      this.selectedBuck = currentBuck;
    } else {
      this.selectedBuck = null;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('onKeyDown', event.key);
    if (event.key === 'ArrowDown' ) {
      if (this.selectedBuck) {
        const index = this.selectedBuck.index + 1;
        if (index < (this.state?.BuckLites?.length || 0)) {
          this.selectBuck(this.state?.BuckLites[index]);
        }
      }
    }
    if (event.key === 'ArrowUp' ) {
      if (this.selectedBuck) {
        const index = this.selectedBuck.index - 1;
        if (index >= 0) {
          this.selectBuck(this.state?.BuckLites[index]);
        }
      }
    }
  }
}
