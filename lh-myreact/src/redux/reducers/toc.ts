import { SET_TOC } from '../constant';

interface Action {
  type: string;
  data: string;
}
const initState = '';
export default function addReducer(preState = initState, action: Action) {
  const { type, data } = action;
  switch (type) {
    case SET_TOC:
      return data;
    default:
      return preState;
  };
};