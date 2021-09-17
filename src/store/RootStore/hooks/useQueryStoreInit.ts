import RootStore from "@store/RootStore";
import { useHistory, useLocation } from "react-router-dom";

const useQueryStoreInit = (): void => {
  const location = useLocation();

  const history = useHistory();

  RootStore.query.setHistory(history, location);
};

export default useQueryStoreInit;
