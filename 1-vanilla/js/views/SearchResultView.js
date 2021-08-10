import { qs } from "../helpers.js";


export default class SearchResultView extends View {
	constructor() {
		super(qs('#search-result-view'));
		this.template = new Template();
	}
}