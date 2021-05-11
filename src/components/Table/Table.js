import React from "react";
import { connect } from "react-redux";
import downloadIconActive from "../../assets/download.svg";
import downloadIconDisabled from "../../assets/downloadDisabled.svg";
import warningIcon from "../../assets/warning.svg";
import Spinner from "../UI/Spinner/Spinner";
import { fetchDocuments } from "../../store/actions/actionDocument";

const isCheckStatus = (status, fetchDocuments) => {
  if (status === "READY") {
    return null;
  } else if (status === null) {
    return (
      <img
        style={{ marginLeft: "-7px" }}
        title="не удалось загрузить!"
        src={warningIcon}
      />
    );
  } else if (status === "IN_PROGRESS") {
    setTimeout(() => {
      fetchDocuments();
    }, 30000);
    return <Spinner />;
  }
};

const renderItemsBodyTable = (items, downloadFile, fetchDocuments) => {
  return items.map((item, index) => {
    return (
      <tr key={index}>
        <td style={{ textAlign: "left", paddingLeft: "40px" }}>
          {item.filename}
        </td>
        <td style={{ textAlign: "left", paddingLeft: "40px" }}>
          {isCheckStatus(item.status, fetchDocuments)}
        </td>
        <td style={{ textAlign: "right", paddingRight: "40px" }}>
          {item.status === "READY" ? (
            <img
              style={{ cursor: "pointer" }}
              src={downloadIconActive}
              title="скачать уникальную копию"
              onClick={() => {
                downloadFile(item.id);
              }}
            />
          ) : (
            <img src={downloadIconDisabled} />
          )}
        </td>
      </tr>
    );
  });
};

const Table = ({
  UploadComponent,
  documents,
  downloadFile,
  fetchDocuments,
}) => {
  return (
    <div className="table-header">
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left", paddingLeft: "30px" }}>
              Наименование документа
            </th>
            <th style={{ textAlign: "left" }}>Статус</th>
            <th style={{ margin: "0", padding: "0", width: "20%" }}>
              <UploadComponent />
            </th>
          </tr>
        </thead>
        <tbody>
          {renderItemsBodyTable(documents, downloadFile, fetchDocuments)}
        </tbody>
      </table>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    fetchDocuments: () => dispatch(fetchDocuments()),
  };
}
export default connect(null, mapDispatchToProps)(Table);
