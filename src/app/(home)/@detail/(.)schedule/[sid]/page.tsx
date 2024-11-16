import ScheduleDetail from "@/components/schedule/detail";

export default function Page({ params }: { params: { sid: string } }) {
  return <ScheduleDetail scheduleId={Number(params.sid)} />;
}
