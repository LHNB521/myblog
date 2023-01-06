import { combineReducers } from "redux";
import doc from './doc';
import toc from './toc';
import navShow from './navShow';
export default combineReducers({
  doc,
  toc,
  navShow
});