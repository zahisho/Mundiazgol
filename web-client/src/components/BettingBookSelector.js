import React from 'react';
import { connect } from 'react-redux';

import { setBettingBook, getValidBetsSummary } from '../actions/BettingBookActions';
import { setScoreTable } from '../actions/ScoreActions';

const BettingBookSelector = ({ bettingBook, bettingBooks, selectBettingBook }) => {
  if (!bettingBook) {
    if (bettingBooks.length > 0) {
      let today = new Date();
      let selectedId = bettingBooks[bettingBooks.length - 1].id;
      for (let bettingBook of bettingBooks) {
        if (today >= bettingBook.attributes.initDate && today < bettingBook.attributes.endDate) {
          selectedId = bettingBook.id;
          break;
        }
      }
      selectBettingBook(selectedId);
    }
    return (
      <select></select>
    );
  } else {
    const onChange = (event) => {
      let name = event.target.value;
      let bettingBookId;

      for (let bettingBook of bettingBooks) {
        if (bettingBook.attributes.name === name) {
          bettingBookId = bettingBook.id;
          break;
        }
      }
      selectBettingBook(bettingBookId);
    };

    return (
      <select className='betting-book-selector' onChange={onChange}>
        {bettingBooks.map((bB, index) => {
          return (
            <option key={index} selected={bettingBook ? bettingBook.id === bB.id : false}>
              {bB.attributes.name}
            </option>
          )
        })}
      </select>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    bettingBooks: state.bettingBooks,
    bettingBook: state.bettingBook
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectBettingBook: (bettingBookId) => {
      dispatch(setBettingBook(bettingBookId));
      dispatch(setScoreTable(bettingBookId));
      dispatch(getValidBetsSummary(bettingBookId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BettingBookSelector);