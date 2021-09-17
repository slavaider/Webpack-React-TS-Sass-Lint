import React, { memo } from "react";

import IBranch from "@interfaces/branch";

export type BranchProps = {
  branch: IBranch;
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
