import {AuthStore} from "./AuthStore";
import {HistoryStore} from "./HistoryStore";
import {ToastStore} from "./ToastStore";

export default {
	AuthStore: new AuthStore(),
	HistoryStore: new HistoryStore(),
	ToastStore: new ToastStore(),
};
