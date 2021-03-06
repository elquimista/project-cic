import { createAction, handleActions } from 'redux-actions';
import { filteredCicData } from 'utils/cic-contents';

// constants
export const OPEN_MODAL = 'OPEN_MODAL';
export const SET_MODAL_UI_ENABLED = 'SET_MODAL_UI_ENABLED';
export const SET_CIC_DATA = 'SET_CIC_DATA';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SAVE_FILE = 'SAVE_FILE';
export const GET_FILE_CONTENT = 'GET_FILE_CONTENT';
export const SET_MASTER_KEY = 'SET_MASTER_KEY';
export const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD';

// action creators
export const openModal = createAction(OPEN_MODAL);
export const setModalUiEnabled = createAction(SET_MODAL_UI_ENABLED);
export const setCicData = createAction(SET_CIC_DATA);
export const closeModal = createAction(CLOSE_MODAL);
export const saveFile = createAction(SAVE_FILE);
export const getFileContent = createAction(GET_FILE_CONTENT);
export const setMasterKey = createAction(SET_MASTER_KEY);
export const setSearchKeyword = createAction(SET_SEARCH_KEYWORD);

// reducer
const initialState = {
  open: false,
  uiEnabled: true,
  imageBlob: null,
  cicData: {},
  searchKeyword: '',
  filteredCicData: {},
  masterKey: ''
};
const reducer = {
  [OPEN_MODAL]: (state, { payload: { imageBlob } }) => ({
    ...state,
    imageBlob,
    open: true,
    uiEnabled: true
  }),
  [SET_MODAL_UI_ENABLED]: (state, { payload }) => ({
    ...state,
    uiEnabled: payload
  }),
  [SET_CIC_DATA]: (state, { payload }) => ({
    ...state,
    cicData: payload,
    filteredCicData: filteredCicData(payload, state.searchKeyword)
  }),
  [SET_MASTER_KEY]: (state, { payload }) => ({
    ...state,
    masterKey: payload
  }),
  [SET_SEARCH_KEYWORD]: (state, { payload }) => ({
    ...state,
    searchKeyword: payload,
    filteredCicData: filteredCicData(state.cicData, payload)
  }),
  [CLOSE_MODAL]: state => ({
    ...state,
    open: false,
    imageBlob: null,
    cicData: {}
  })
};
export default handleActions(reducer, initialState);

// selectors
export const modalOpenSelector = state => state.modal.open;
export const modalUiEnabledSelector = state => state.modal.uiEnabled;
export const imageBlobSelector = state => state.modal.imageBlob;
export const cicDataSelector = state => state.modal.cicData;
export const searchKeywordSelector = state => state.modal.searchKeyword;
export const filteredCicDataSelector = state => state.modal.filteredCicData;
export const masterKeySelector = state => state.modal.masterKey;
