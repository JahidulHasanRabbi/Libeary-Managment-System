import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  backgroundColor: '#f5f5f5',
  color: 'black',
  marginRight: '10px',
});

const ReportDownload = () => {
  const downloadBookReport = () => {
    axios({
      url: 'http://127.0.0.1:8000/api/report/book/',
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'book_report.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadStudentReport = () => {
    axios({
      url: 'http://127.0.0.1:8000/api/report/student/',
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'student_report.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Report Download</h2>
      <StyledButton variant="contained" onClick={downloadBookReport}>
        Download Book Report
      </StyledButton>
      <StyledButton variant="contained" onClick={downloadStudentReport}>
        Download Student Report
      </StyledButton>
    </div>
  );
};

export default ReportDownload;
