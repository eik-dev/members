import SideNav from "@/app/ui/sidenav";
import Header from "@/app/ui/header";

export default function Layout({children}){
    return(
        <>
        <SideNav/>
        <Header/>
        <div className="mb-5"></div>
        {children}
        </>
    )
}