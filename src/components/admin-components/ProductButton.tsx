import { useFormStatus } from "react-dom";

export default function ProductButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className=" w-full bg-green-500 text-white py-4 rounded-md"
      type="submit"
    >
      <span> {pending ? "Adding Products..." : "Create new product"}</span>
    </button>
  );
}
