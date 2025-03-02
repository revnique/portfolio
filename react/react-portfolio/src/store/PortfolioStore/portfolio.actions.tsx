import { createAction } from '@reduxjs/toolkit'

export const LoadBuckLites = 'LoadBuckLites';
export const loadBuckLites = createAction(LoadBuckLites);

export const LoadBuckLite = 'LoadBuckLite';
export const loadBuckLite = createAction(LoadBuckLite, (SN: string) => ({payload: SN}));