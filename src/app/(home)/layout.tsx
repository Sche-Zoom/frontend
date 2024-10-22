interface Props {
  children: React.ReactNode;
  detail: React.ReactNode; // 상세정보
  addSchedule: React.ReactNode; // 일정 추가
}

export default function Layout({ children, detail, addSchedule }: Props) {
  return (
    <>
      {children}
      {detail}
      {addSchedule}
    </>
  );
}
