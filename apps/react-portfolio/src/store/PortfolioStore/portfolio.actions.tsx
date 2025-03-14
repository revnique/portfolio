import { createAction } from '@reduxjs/toolkit'
import { CalendarEvent } from './portfolio.state';
export const LoadBuckLites = 'LoadBuckLites';
export const loadBuckLites = createAction(LoadBuckLites);
export const LoadBuckLitesSuccess = 'LoadBuckLitesSuccess';
export const loadBuckLitesSuccess = createAction(LoadBuckLitesSuccess);

export const LoadBuckLite = 'LoadBuckLite';
export const loadBuckLite = createAction(LoadBuckLite, (SN: string) => ({payload: SN}));
export const LoadBuckLiteSuccess = 'LoadBuckLiteSuccess';
export const loadBuckLiteSuccess = createAction(LoadBuckLiteSuccess);

export const SetIsPending = 'SetIsPending';
export const setIsPending = createAction(SetIsPending, (isPending: boolean) => ({payload: isPending}));


export const AddCalendarEvent = 'AddCalendarEvent';
export const addCalendarEvent = createAction(AddCalendarEvent, (event: CalendarEvent) => ({payload: event}));
export const AddCalendarEventSuccess = 'AddCalendarEventSuccess';
export const addCalendarEventSuccess = createAction(AddCalendarEventSuccess);
export const DeleteCalendarEvent = 'DeleteCalendarEvent';
export const deleteCalendarEvent = createAction(DeleteCalendarEvent, (id: string, eventDate: string) => ({payload: {id, eventDate}}));
export const DeleteCalendarEventSuccess = 'DeleteCalendarEventSuccess';
export const deleteCalendarEventSuccess = createAction(DeleteCalendarEventSuccess);
export const LoadCalendarEvents = 'LoadCalendarEvents';
export const loadCalendarEvents = createAction(LoadCalendarEvents);
export const LoadCalendarEventsSuccess = 'LoadCalendarEventsSuccess';
export const loadCalendarEventsSuccess = createAction(LoadCalendarEventsSuccess);
export const SelectCalendarEvent = 'SelectCalendarEvent';
export const selectCalendarEvent = createAction(SelectCalendarEvent, (event: CalendarEvent) => ({payload: event}));
