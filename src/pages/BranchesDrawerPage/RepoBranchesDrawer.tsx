import React, { useCallback, useEffect, useState } from "react";

import MyDrawer from "@components/MyDrawer";
import useLocalStore from "@shared/hooks/useLocalStore";
import RepoBranchesStore from "@store/RepoBranchesStore";
import Meta from "@utils/meta";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router-dom";

import Branch from "./components/Branch";

const BranchesDrawerPage: React.FC = () => {
  const history = useHistory();
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [visible, setVisible] = useState<boolean>(true);

  const repoBranches = useLocalStore(() => new RepoBranchesStore());

  const onClose = useCallback(() => {
    setVisible(false);
    history.goBack();
  }, []);

  useEffect(() => {
    repoBranches?.getRepositoryBranches(owner, repo);
  }, [owner, repo]);

  return (
    <MyDrawer
      title="Repository branches"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      {repoBranches?.branches?.map((branch) => (
        <Branch key={branch.commit.sha} branch={branch} />
      ))}
      {repoBranches.meta === Meta.error && (
        <h1 className="error">Ошибка в списке веток</h1>
      )}
    </MyDrawer>
  );
};

export default observer(BranchesDrawerPage);
