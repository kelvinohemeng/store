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
};

const DefaultButton = ({ variant = "default", text }: ButtonProps) => {
  return (
    <div>
      <Button className="w-full" variant={variant}>
        {text}
      </Button>
    </div>
  );
};

export default DefaultButton;
