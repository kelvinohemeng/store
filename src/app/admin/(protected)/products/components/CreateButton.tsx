import { Action } from "@/lib/types";
import { useSlide } from "@/store";
import { Button } from "@/components/ui/button";
import { FolderSimplePlus } from "@phosphor-icons/react";
import React from "react";

const CreateButton = ({
  action = "create",
  text = "Add new products",
}: {
  action: Action;
  text: string;
}) => {
  const { setState } = useSlide();

  return (
    <Button onClick={() => setState(action)}>
      <FolderSimplePlus size={16} weight="fill" />
      {text}
    </Button>
  );
};

export default CreateButton;
