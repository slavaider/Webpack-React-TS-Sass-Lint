import React, { memo } from "react";

import { GithubBranchModel } from "@store/models/github";

export type BranchProps = {
  branch: GithubBranchModel;
};

const Branch: React.FC<BranchProps> = ({ branch }: BranchProps) => {
  return (
    <p>
      {branch.protected && <span className="color-red">Protected</span>}
      &nbsp;
      <a rel="noopener noreferrer" target="_blank" href={branch.commit.url}>
        {branch.name}
      </a>
    </p>
  );
};

export default memo(Branch);
