import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { searchForm: "",}
  }
  
  render() { 
    const { searchForm } = this.state;
    return (  
      <form>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={searchForm}
        />
      </form>
    );
  }
}

export default SearchForm;