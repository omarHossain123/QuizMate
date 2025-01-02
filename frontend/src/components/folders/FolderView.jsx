import React from "react";
import TabLayout from "../layout/TabLayout";

const FolderView = ({ folder, onBack, onUpdateFolder }) => {
  return (
    <TabLayout
      folder={folder}
      onBack={onBack}
      onUpdateFolder={onUpdateFolder}
    />
  );
};

export default FolderView;
