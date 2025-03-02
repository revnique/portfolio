export const initialSidebarState: SidebarState = {
    sidebarIsOpen: false
}
export const initialRootState: RootState = {
    sidebarState: initialSidebarState
}

export class RootState {
    sidebarState: SidebarState = initialSidebarState;
}

export interface SidebarState {
    sidebarIsOpen: boolean;
}

export const rootFeatureKey = 'rootState';