import PersonalSchedule from "@/components/page/personal-schedule";

export default function Page({ params }: { params: { sid: string } }) {
  return <PersonalSchedule sid={params.sid} />;
}
