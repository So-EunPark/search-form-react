import { qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchResultView]";
export default class SearchResultView extends View {
	constructor() {
		super(qs('#search-result-view'));

		this.template = new Template();
	}


	// 데이터에 따라서 검색결과를 보여줘야 되기 때문에 DOM을 동적으로 생성.
	// 검색결과를 배열 형태로 받는다.
	// 컨트롤러를 통해서 show함수가 호출된다.
	// 검색된 상품 데이터가 들어올 것.
	// 데이터의 length에 따라서 계산이 된다.
	// 데이터가 있으면 getList(data)를 호출. 없으면 getEmptyMessage()호출
	// 그리고 show()를 호출한다.

	show(data = []){
		this.element.innerHTML = 
		data.length > 0 
			? this.template.getList(data)
			: this.template.getEmptyMessage();
		
		super.show();
	}
}

class Template {
	getEmptyMessage(){
		return `
		<div class="empty-box"> 검색 결과가 없습니다. </div>
		`;
	}

	getList(data = []){
		return `
		<ul class="result">
			${data.map(this._getItem).join("")}
		</ul>
		`;
	}

	_getItem({imageUrl, name}) {
		return `
		<li>
			<img src="${imageUrl}" alt="${name}" />
			<p>${name}</p>
		</li>
		`;
	}
}