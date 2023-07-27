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
      <TopNavBar></ TopNavBar>
       <div className="flex">
        <Navigation />
        <Sidebar>
        <SidebarItem icon={<LayoutDashboard />} text='counter ' alert></ SidebarItem >
        </ Sidebar>
        <main className="flex-1">
        <Component {...pageProps} />
        </main>
        </div>
      </PersistGate>
    </Provider>
  );
}
