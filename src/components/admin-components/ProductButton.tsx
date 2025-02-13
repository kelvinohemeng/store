import { useFormStatus } from "react-dom";

export default function ProductButton({
  text = "Create new product",
  pendingText = "Adding Products...",
}: {
  text?: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className=" w-full bg-green-500 text-white py-4 rounded-md"
      type="submit"
    >
      <span> {pending ? pendingText : text}</span>
    </button>
  );
}
