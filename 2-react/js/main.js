class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			searchKeyword: "",
		}
	}

	//컴포넌트를 수정하기 위해선 이렇게 직접적으로 처리하지 말고 
	//setState라는 명령어로 하자.
	handleChangeInput(event) {
		// this.state.searchKeyword = event.target.value;
		// this.forceUpdate(); //강제로 업데이트한다

		//setState라는 메소드를 호출해야 컴포넌트는 상태변화를 알 수 있다.
		//스스로 다시 그려야 하는지 여부도 알 수 있다.
		this.setState({
			searchKeyword : event.target.value,
		})
	}
	
	render() {
		return (
			<>
				<header>
					<h2 class="container">검색</h2>
				</header>
				<div class="container">
					<form id="search-form-view">
						<input 
							type="text" 
							placeholder="검색어를 입력하세요" 
							autofocus 
							value = {this.state.searchKeyword}
							onChange = {event => this.handleChangeInput(event)}
						/>
						<button type="reset" class="btn-reset"></button>
					</form>
				</div>
			</>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#app"));