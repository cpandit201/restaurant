import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import transform from '../../../utils/transformDate';

const Table = styled.table`
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
`

const Cell = styled.td`
  text-align: center;
`

const Head = styled.th`
  border-bottom: 1px solid #EDEFF0;
`

const TableData = ({ data }) => {
  console.log(data);
  if (data.length === 0) {
    return (
      <div className="tableData">
        <h3>You have no previous data.</h3>
      </div>
    )
  }
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const reversedData = data.slice().reverse();
  
  const tableData = reversedData.map((item, i) => {
    return (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <Cell>
          {item.month === month && item.year === year ?
          item.date === date ?
          "Today" :
          item.date === date - 1 ?
          "Yesterday" :
          `${transform(item.date)}/${transform(item.month)}/${item.year}` :
          `${transform(item.date)}/${transform(item.month)}/${item.year}`}
        </Cell>
        <Cell>{item.customer}</Cell>
        <Cell>{item.money}</Cell>
      </tr>
    )
  });
  return (
    <Table>
      <thead>
        <tr>
          <Head>#</Head>
          <Head>Date</Head>
          <Head>Customer</Head>
          <Head>Money Earned</Head>
        </tr>
      </thead>
      <tbody>
        {tableData}
      </tbody>
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.dataHistory
  }
}

export default connect(mapStateToProps, null)(TableData);