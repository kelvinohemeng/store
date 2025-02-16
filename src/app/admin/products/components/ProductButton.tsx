import { useFormStatus } from "react-dom";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

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
      className={`w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${
        pending ? "opacity-80" : ""
      }`}
      type="submit"
      disabled={pending}
    >
      <div
        className={`transition-opacity duration-200 ${
          pending ? "opacity-100" : "opacity-0"
        }`}
      >
        <UseAnimations
          animation={loading}
          size={24}
          strokeColor="white"
          autoplay={true}
        />
      </div>
      {pending ? pendingText : text}
    </button>
  );
}
