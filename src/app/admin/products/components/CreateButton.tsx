import { Action } from "@/lib/types";
import { useProductSlideState } from "@/store";
import { FolderSimplePlus } from "@phosphor-icons/react";
import React from "react";

const CreateButton = ({
  action = "create",
  text = "Add new products",
}: {
  action: Action;
  text: string;
}) => {
  const { setState } = useProductSlideState();

  return (
    <button
      onClick={() => setState(action)}
      className="w-fit border-green-200 border-[3px] h-fit px-3 py-1 bg-green-500 text-white font-semibold rounded-xl flex items-center justify-center gap-3 text-lg"
    >
      <FolderSimplePlus size={24} color="#fefefe" weight="fill" />
      <p className="leading-[100%]">{text}</p>
    </button>
  );
};

export default CreateButton;
