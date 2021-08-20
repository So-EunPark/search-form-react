import { formatRelativeDate } from "./js/helpers.js";
import store from "./js/Store.js";

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};
const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD,
      keywordList: [],
			historyList: [],
    };
  }

  //첫글자 대문자 아님 주의, 마운트가 완료되면 호출되는 메소드
  componentDidMount() {
    const keywordList = store.getKeywordList();
		const historyList = store.getHistoryList();

    this.setState({ keywordList, historyList });

  }

  //컴포넌트를 수정하기 위해선 이렇게 직접적으로 처리하지 말고
  //setState라는 명령어로 하자.
  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      return this.handleReset();
    }
    this.setState({ searchKeyword });
  }

  //input submit 처리
  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit", this.state.searchKeyword);

    if (this.state.searchKeyword.length > 0) {
      this.search(this.state.searchKeyword);
    }
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
		const historyList = store.getHistoryList();

    this.setState({
			historyList,
			searchKeyword,
      searchResult,
      submitted: true,
    });
  }

  //reset 처리
  handleReset() {
    this.setState(
      () => {
        return {
          searchKeyword: "",
          submitted: false,
        };
      },
      () => {
        console.log("handleReset", this.state.searchKeyword);
      }
    );
  }

	handleClickRemoveHistory(event, keyword) {
		event.stopPropagation();
		store.removeHistory(keyword);
		const historyList = store.getHistoryList();
		this.setState({historyList});
	}

  render() {
    const searchForm = (
      <form
        onSubmit={(event) => this.handleSubmit(event)}
        onReset={() => {
          this.handleReset();
        }}
      >
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

    const searchResult =
      this.state.searchResult.length > 0 ? (
        <ul className="result">
          {this.state.searchResult.map((item) => {
            return (
              <li key={item.id}>
                <img src={item.imageUrl} alt={item.name} />
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="empty-box">검색 결과가 없습니다.</div>
      );

    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map((item, index) => {
          return (
            <li key={item.id} onClick={() => this.search(item.keyword)}>
              <span className="number">{index + 1}</span>
              <span>{item.keyword}</span>
            </li>
          );
        })}
      </ul>
    );

		//최근검색어
		const historyList = (
			<ul className="list">
        {this.state.historyList.map((item) => {
          return (
            <li key={item.id} onClick={()=>this.search(item.keyword)}>
              <span>{item.keyword}</span>
              <span className="date">{formatRelativeDate(item.date)}</span>
							<button className="btn-remove" onClick={(event)=> {this.handleClickRemoveHistory(event, item.keyword)}}></button>
            </li>
          );
        })}
      </ul>
		);

    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TabType).map((tabType) => (
            <li
              className={this.state.selectedTab === tabType ? "active" : ""}
              key={tabType}
              onClick={() => {
                this.setState({
                  selectedTab: tabType,
                });
              }}
            >
              {TabLabel[tabType]}
            </li>
          ))}
        </ul>
        {this.state.selectedTab === TabType.KEYWORD && keywordList}
        {this.state.selectedTab === TabType.HISTORY && historyList}
      </>
    );

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted ? searchResult : tabs}
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
