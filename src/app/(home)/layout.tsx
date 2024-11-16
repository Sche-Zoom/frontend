interface Props {
  children: React.ReactNode;
  detail: React.ReactNode; // 상세정보
  add: React.ReactNode; // 일정 추가
}

export default function Layout({ children, detail, add }: Props) {
  return (
    <>
      {children}
      {detail}
      {add}
    </>
  );
}
