import { Spinner } from "@phosphor-icons/react";
import { useFormStatus } from "react-dom";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

export default function AuthFormButton({ title, ...rest }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black hover:bg-black/70 text-white p-3 rounded-md font-medium transition-colors duration-200 flex justify-center items-center"
      {...rest}
    >
      <div
        className={`transition-opacity duration-200 ${
          pending ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        <UseAnimations
          animation={loading}
          size={20}
          strokeColor="white"
          autoplay={true}
        />
      </div>
      {!pending && <span>{title}</span>}
    </button>
  );
}
