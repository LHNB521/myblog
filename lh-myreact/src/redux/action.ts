import { SET_DOC, SET_TOC, SET_NAV_SHOW } from './constant';

export const setDoc = (data: string) => {
    return {
        type: SET_DOC,
        data: data
    };
};

export const setToc = (data: string) => {
    return {
        type: SET_TOC,
        data: data
    };
};

export const setNavShow = (data: boolean) => ({
    type: SET_NAV_SHOW,
    data
});