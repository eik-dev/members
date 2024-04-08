import Link from "next/link";
export default function SideNav(){
    return(<>
        <Link href="/firms">
            <div>Firms</div>
        </Link>
        <Link href="/certificates">
            <div>Certificates</div>
        </Link>
        <Link href="/logs">
            <div>Logs</div>
        </Link>
        <Link href="/login">
            <div>login</div>
        </Link>
        <Link href="/register">
            <div>Register</div>
        </Link>
    </>)
}