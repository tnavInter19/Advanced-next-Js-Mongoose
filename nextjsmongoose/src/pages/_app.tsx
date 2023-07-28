import Navigation from "@/components/Navigation";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";
import { persistor, store } from "@/redux/store";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { LayoutDashboard } from "lucide-react";
import TopNavBar from "@/components/TopNavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    
       <div className="sticky z-10 top-0 bg-gray-1000 bg-opacity-0  text-white">
       <TopNavBar></ TopNavBar>
       </div>  
       <div className="flex">
       <div className="sticky top-16 bg-gray-100 md:p-4 h-[calc(100vh-61.6px)]">
        <Sidebar>
        <SidebarItem icon={<LayoutDashboard />} to='/jobs' text='counter' alert></ SidebarItem >
        <SidebarItem icon={<LayoutDashboard />} to='/dashboard' text='Dashboard' alert></ SidebarItem >
        </ Sidebar>
        </div>
        <main className="flex-1 p-4 overflow-y-auto">
        <Component {...pageProps} />
        </main>
        </div>
   
      </PersistGate>
    </Provider>
  );
}
