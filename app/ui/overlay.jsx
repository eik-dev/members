export default function Overlay({children, className}){
    return(
        <div className={className}>
            <div className="fixed flex items-center justify-center z-40 w-lvw h-lvh top-0 left-0 bg-black opacity-55">
            </div>
            <div className="fixed flex items-center justify-center z-40 w-lvw h-lvh top-0 left-0">
            {children}
            </div>
        </div>
    )
}