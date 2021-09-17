import QueryStore from "@store/RootStore/QueryStore/QueryStore";

import ApiStore from "./ApiStore";

export default class RootStore {
  readonly api: ApiStore = new ApiStore("https://api.github.com");

  readonly query: QueryStore = new QueryStore();
}
