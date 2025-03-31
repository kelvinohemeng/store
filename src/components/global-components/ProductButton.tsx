import { Button } from "@/components/ui/button";

type ButtonProps = {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  sizes?: "default" | "sm" | "lg" | "icon" | null | undefined;
};

const DefaultButton = ({ variant = "default", text, sizes }: ButtonProps) => {
  return (
    <div>
      <Button className="w-full" variant={variant} size={sizes}>
        {text}
      </Button>
    </div>
  );
};

export default DefaultButton;
