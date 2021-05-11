import axios from "axios";
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
} from "./actionTypes";
import { getNameFile, getBasicAuth } from "../../helpers";
import { logout } from "./actionAuth";
import { configUrl } from "../../configUrl";
const { baseURL } = configUrl;

export function fetchDocuments() {
  return async (dispatch) => {
    const auth = getBasicAuth();
    await axios
      .get(`${baseURL}documents`, {
        auth: auth,
      })
      .then((response) => {
        dispatch(fetchDocumentsSuccess(response.data.documents));
      })
      .catch((error) => {
        if (error.response.status == "400" || error.response.status == "401") {
          dispatch(clearDocuments());
          dispatch(logout());
        }

        dispatch(fetchDocumentsError(error));
      });
  };
}

export function fetchDocumentsStart() {
  return {
    type: FETCH_DOCUMENTS_START,
  };
}

export function fetchDocumentsSuccess(data) {
  return {
    type: FETCH_DOCUMENTS_SUCCESS,
    data,
  };
}

export function fetchDocumentsError(e) {
  return {
    type: FETCH_DOCUMENTS_ERROR,
    error: e,
  };
}

export function uploadDocumentsError(e) {
  return {
    type: UPLOAD_DOCUMENT_ERROR,
    error: e,
  };
}

export function uploadDocumentsSuccess(data) {
  return {
    type: UPLOAD_DOCUMENT_SUCSESS,
    documentId: data,
  };
}

export function uploadFile(data) {
  return async (dispatch) => {
    try {
      const auth = getBasicAuth();
      const formData = new FormData();
      formData.append("file", data, data.name);
      const response = await axios.post(`${baseURL}documents`, formData, {
        "Content-Type": "multipart/form-data",
        auth: auth,
      });
      console.log("response", response);
      dispatch(uploadDocumentsSuccess(response.data));
      dispatch(fetchDocuments());
    } catch (e) {
      dispatch(uploadDocumentsError(e));
    }
  };
}

export function startDownloadDocument() {
  return {
    type: DOWNLOAD_DOCUMENT_START,
  };
}

export function downloadDocumentError(e) {
  return {
    type: DOWNLOAD_DOCUMENT_ERROR,
    error: e,
  };
}

export function downloadDocumentsSuccess() {
  return {
    type: DOWNLOAD_DOCUMENT_SUCCESS,
  };
}

export function downloadUniqCopy(id) {
  return async (dispatch) => {
    dispatch(startDownloadDocument());
    const auth = getBasicAuth();
    axios
      .get(`${baseURL}documents/${id}/uniq`, {
        responseType: "blob",
        "Content-Type": "application/octet-stream",
        auth: auth,
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          getNameFile(response.headers["content-disposition"])
        );
        document.body.appendChild(link);
        link.click();
        dispatch(downloadDocumentsSuccess());
      })
      .catch((e) => {
        dispatch(downloadDocumentError(e));
      });
  };
}

export function clearDocuments() {
  return {
    type: CLEAR_DOCUMENTS,
  };
}
