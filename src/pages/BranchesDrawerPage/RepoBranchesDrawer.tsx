import React, { memo, useEffect, useState } from "react";

import MyDrawer from "@components/MyDrawer";
import GithubContext from "@shared/contexts/GithubContext";
import useRepoBranchesContext from "@shared/hooks/useRepoBranchesContext";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router-dom";

import Branch from "./components/Branch";

const BranchesDrawerPage: React.FC = () => {
  const history = useHistory();
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [visible, setVisible] = useState<boolean>(true);

  const store = useRepoBranchesContext(GithubContext);

  const onClose = () => {
    setVisible(false);
    history.goBack();
  };

  useEffect(() => {
    store?.getRepositoryBranches(owner, repo);
  }, [owner, repo]);

  return (
    <MyDrawer
      title="Repository branches"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      {store?.branches?.map((branch) => (
        <Branch key={branch.commit.sha} branch={branch} />
      ))}
    </MyDrawer>
  );
};

export default memo(observer(BranchesDrawerPage));
