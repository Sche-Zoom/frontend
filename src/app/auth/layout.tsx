interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative size-full min-w-[800px]">
      <div className="absolute left-1/2 top-1/2 flex w-[450px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl border border-solid px-10 py-8">
        {children}
      </div>
    </div>
  );
}
