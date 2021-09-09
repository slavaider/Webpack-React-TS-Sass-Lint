import React, { memo, useCallback, useEffect, useState } from "react";

import MyDrawer from "@components/MyDrawer";
import GithubContext from "@shared/contexts/GithubContext";
import useReposContext from "@shared/hooks/useReposContext";
import { useHistory, useParams } from "react-router-dom";

import Branch from "../ReposSearchPage/components/Branch";

const BranchesDrawerPage: React.FC = () => {
  const history = useHistory();
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [visible, setVisible] = useState<boolean>(true);

  const { branches, loadBranches } = useReposContext(GithubContext);

  const onClose = () => {
    setVisible(false);
    history.goBack();
  };

  const fetchMyAPI = useCallback(async () => {
    if (owner && repo) {
      await loadBranches(owner, repo);
    }
  }, [owner, repo]);

  useEffect(() => {
    fetchMyAPI();
  }, [owner, repo]);

  return (
    <MyDrawer
      title="Repository branches"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      {branches.map((branch) => (
        <Branch key={branch.commit.sha} branch={branch} />
      ))}
    </MyDrawer>
  );
};

export default memo(BranchesDrawerPage);
