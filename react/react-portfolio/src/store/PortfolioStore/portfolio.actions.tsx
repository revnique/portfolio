import { createAction } from '@reduxjs/toolkit'

export const LoadBuckLites = 'LoadBuckLites';
export const loadBuckLites = createAction(LoadBuckLites);
export const LoadBuckLitesSuccess = 'LoadBuckLitesSuccess';
export const loadBuckLitesSuccess = createAction(LoadBuckLitesSuccess);

export const LoadBuckLite = 'LoadBuckLite';
export const loadBuckLite = createAction(LoadBuckLite, (SN: string) => ({payload: SN}));
export const LoadBuckLiteSuccess = 'LoadBuckLiteSuccess';
export const loadBuckLiteSuccess = createAction(LoadBuckLiteSuccess);

export const IsPending = 'IsPending';
export const isPending = createAction(IsPending, (isPending: boolean) => ({payload: isPending}));
