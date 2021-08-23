import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { searchKeyword: "",};
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;
    this.setState({ searchKeyword });
  }

  render() { 
    return (  
      <form>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={this.state.searchKeyword}
          onChange={(event) => this.handleChangeInput(event)}
        />
        {this.state.searchKeyword.length > 0 && (
          <button type="reset" className="btn-reset"></button>
        )}
      </form>
    );
  }
}