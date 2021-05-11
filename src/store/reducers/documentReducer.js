import {
  FETCH_DOCUMENTS_START,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_ERROR,
  UPLOAD_DOCUMENT_SUCSESS,
  UPLOAD_DOCUMENT_ERROR,
  DOWNLOAD_DOCUMENT_START,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_ERROR,
  CLEAR_DOCUMENTS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  documents: [],
  documentId: null,
};

export default function resultTestReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.data,
      };

    case CLEAR_DOCUMENTS:
      return {
        ...state,
        documents: [],
      };

    case FETCH_DOCUMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case UPLOAD_DOCUMENT_SUCSESS:
      return {
        ...state,
        documentId: action.documentId,
      };

    case UPLOAD_DOCUMENT_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case DOWNLOAD_DOCUMENT_START:
      return {
        ...state,
        loading: true,
      };

    case DOWNLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DOWNLOAD_DOCUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
