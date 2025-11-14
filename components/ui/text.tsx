import { cn } from "@/lib/utils";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-2xl md:text-3xl font-bold text-shop_dark_yellow capitalize tracking-wide font-snas",
        className
      )}
    >
      {children}
    </h2>
  );
};

const SubText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-gray-600 text-sm", className)}>{children}</p>;
};

const SubTitle = ({children, className}: {children: React.ReactNode; className?: string}) => {
  return <p className={cn("font-semibold text-gray-900 font-sans", className)}>{children}</p>
}
export { Title, SubText, SubTitle };
