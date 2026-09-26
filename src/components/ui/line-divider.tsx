import Logo from "../logo";

export default function LineDivider() {
  return (
    <div className="flex w-full items-center gap-1">
      <div className="h-px w-full bg-primary" />
      <Logo className="size-4" />
      <div className="h-px w-full bg-primary" />
    </div>
  );
}
