import React from 'react';
import Header from '../components/Header.js';
import SearchForm from '../components/SearchForm.js';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { searchKeyword: "",};  
  }
  
  handleChangeInput(value) {
    this.setState({ searchKeyword:value });
  }

  search(searchKeyword) {
    console.log(searchKeyword);
  }

  handleReset() {
    console.log("handleReset");
  }

  render() {
    return (
      <>
        <Header title={"검색"}/>
        <div className="container">
          <SearchForm 
          value={this.state.searchKeyword}  // 3
          onChange={(value) => this.handleChangeInput(value)}  // 4
          onSubmit={() => this.search(this.state.searchKeyword)}
          onReset={() => this.handleReset()}
          />
        </div>
      </>
    ); 
  }
}