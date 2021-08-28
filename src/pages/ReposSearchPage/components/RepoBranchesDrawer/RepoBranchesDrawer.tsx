import React, { memo, useContext, useEffect, useState } from "react";

import MyDrawer from "@components/MyDrawer";
import IBranch from "@interfaces/branch";
import IRepository from "@interfaces/repository";
import GithubContext from "@shared/contexts/GithubContext";

export type ReposProps = {
  selectedRepo: IRepository | null;
  onClose: () => void;
  visible: boolean;
};

const RepoBranchesDrawer: React.FC<ReposProps> = ({
  selectedRepo,
  onClose,
  visible,
}: ReposProps) => {
  const context = useContext(GithubContext);
  const store = context?.store;

  const [branches, setBranches] = useState<IBranch[]>([]);

  useEffect(() => {
    if (selectedRepo) {
      store
        ?.getRepositoryBranches(selectedRepo.owner.login, selectedRepo.name)
        .then((response) => {
          if (response.success && Array.isArray(response.data)) {
            setBranches(response.data);
          }
        });
    }
  }, [selectedRepo]);

  return (
    <MyDrawer
      title="Repository branches"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      key={selectedRepo?.id}
    >
      {branches.map((branch) => {
        return (
          <p key={branch.commit.sha}>
            {branch.protected && <span className="color-red">Protected</span>}
            &nbsp;
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={branch.commit.url}
            >
              {branch.name}
            </a>
          </p>
        );
      })}
    </MyDrawer>
  );
};

export default memo(RepoBranchesDrawer);
