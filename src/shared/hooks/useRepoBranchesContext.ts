import { Context, useContext } from "react";

import { GithubContextType } from "@shared/contexts/GithubContext";
import RepoBranchesStore from "@store/RepoBranchesStore";

const useRepoBranchesContext = (
  context: Context<GithubContextType | null>
): RepoBranchesStore | undefined => {
  const store = useContext(context);
  return store?.repoBranches;
};

export default useRepoBranchesContext;
