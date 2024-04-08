import SideNav from "@/app/ui/sidenav";

export default function Layout({children}){
    return(
        <>
        <SideNav/>
        <div className="mb-5"></div>
        {children}
        </>
    )
}