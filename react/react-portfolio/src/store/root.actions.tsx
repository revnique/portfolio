import { createAction } from '@reduxjs/toolkit'

export const ToggleSideBar = 'ToggleSideBar';
export const ToggleSideBarSuccess = 'ToggleSideBarSuccess';
export const toggleSideBar = createAction(ToggleSideBar, () => ({
    payload: {}
}));
export const toggleSideBarSuccess = createAction(ToggleSideBarSuccess, () => ({
    payload: {}
}));