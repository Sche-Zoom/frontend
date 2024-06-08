import MobileNav from "@/components/layout/mobile-nav";

export default function Header() {
  return (
    <header className="bg-muted sticky left-0 top-0 z-10 flex h-9 items-center justify-between border-b px-4">
      {/* 로고 */}
      <h1 className="font-medium">Rich Calendar</h1>

      {/* 1024 이하 화면에서 노출 되는 nav 메뉴 */}
      <MobileNav />
    </header>
  );
}
