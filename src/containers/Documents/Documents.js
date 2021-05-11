import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchDocuments,
  uploadFile,
  downloadUniqCopy,
} from "../../store/actions/actionDocument";
import Table from "../../components/Table/Table";
import UploadComponent from "../../components/UploadComponent/UploadComponent";
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";

const DarkBackground = styled.div`
  display: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 20%;

  ${(props) =>
    props.disappear &&
    css`
      display: block;
    `}
`;

class Documents extends Component {
  componentDidMount() {
    const { fetchDocuments } = this.props;
    fetchDocuments();
  }

  renderUploadComponent = () => {
    const { uploadFile } = this.props;
    return <UploadComponent onUpload={uploadFile} />;
  };

  render() {
    const { documents, downloadUniqCopy, loading } = this.props;
    return (
      <>
        <Table
          UploadComponent={this.renderUploadComponent}
          downloadFile={downloadUniqCopy}
          documents={documents}
        />
        <DarkBackground disappear={loading}>
          <LoadingOverlay
            active={true}
            spinner={true}
            text="Loaded..."
          ></LoadingOverlay>
        </DarkBackground>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    documents: state.documents.documents,
    loading: state.documents.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDocuments: () => dispatch(fetchDocuments()),
    uploadFile: (data) => dispatch(uploadFile(data)),
    downloadUniqCopy: (id) => dispatch(downloadUniqCopy(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
