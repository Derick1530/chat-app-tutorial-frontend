import Sidebar from "@/ui/Layout/Sidebar";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex md:flex-row flex-col mt-5 justify-between px-6">
        <div className="md:w-1/6 px-6 w-full">
          <Sidebar />
        </div>
        <main className="h-full flex-1">{children}</main>
      </div>
    </>
  );
}
