import { Outlet } from "react-router-dom";
import MenuPc from "../components/MenuPc";
import WhoToFollow from "../components/WhoToFollow";
import MenuPhone from "../components/MenuPhone";

function AppLayout() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-4 gap-4  xl:px-36">
      {/* Hide MenuPc on xlaller screens */}
      <div className="hidden xl:block xl:col-span-1">
        <MenuPc />
      </div>

      {/* Main content area, spans more columns on larger screens */}
      <div className="border xl:col-span-2 col-span-1">
        <Outlet />
      </div>

      {/* xlall screen message or alternative component */}
      <div className="fixed w-full xl:hidden bg-white border border-gray-300 z-50 bottom-0 py-2">
        <MenuPhone />
      </div>
    </section>
  );
}

export default AppLayout;
