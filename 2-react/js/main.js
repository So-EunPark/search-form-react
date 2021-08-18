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
		}
	}

	//컴포넌트를 수정하기 위해선 이렇게 직접적으로 처리하지 말고 
	//setState라는 명령어로 하자.
	handleChangeInput(event) {
		const searchKeyword = event.target.value;

		if (searchKeyword.length <= 0) {
			return this.handleReset();
		}
		this.setState({searchKeyword});
	}
	
	//input submit 처리
	handleSubmit(event) {
		event.preventDefault();
		console.log('handleSubmit', this.state.searchKeyword);
		
		if(this.state.searchKeyword.length > 0) {
			this.search(this.state.searchKeyword);
		}
	}

	search(searchKeyword) {
		const searchResult = store.search(searchKeyword);
		this.setState({
			searchResult,
			submitted:true,
		});
	}

	//reset 처리
	handleReset() {
		this.setState(() => {
			return { 
				searchKeyword:"",
				submitted:false,
			};
		}, () => {
			console.log('handleReset', this.state.searchKeyword);
		})
	}

	render() {
		const searchForm = (
			<form 
				onSubmit={event => this.handleSubmit(event)}
				onReset = {()=>{this.handleReset()}}>
				<input 
					type="text" 
					placeholder="검색어를 입력하세요" 
					autoFocus 
					value = {this.state.searchKeyword}
					onChange = {(event) => this.handleChangeInput(event)}
				/>
				{this.state.searchKeyword.length > 0 && (
							<button type="reset" className="btn-reset"></button>
						)}
			</form>
		);

		const searchResult = (
			this.state.searchResult.length > 0 ? (
				<ul className="result">
					{this.state.searchResult.map( (item) => {
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
			)
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
				{this.state.selectedTab === TabType.KEYWORD && <>Todo: 추천검색어</>}
				{this.state.selectedTab === TabType.HISTORY && <>Todo: 최근검색어</>}
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

ReactDOM.render(<App/>, document.querySelector("#app"));