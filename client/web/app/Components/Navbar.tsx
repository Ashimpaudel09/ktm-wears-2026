
function NavItem({ label }: { label: string; }) {
    return (
        <div>
            {label}
        </div>
    )
}

export default function Navbar() {
    return (
        <div className="flex justify-between p-5">
            <div>
                logo
            </div>
            <div className="flex gap-5 ">
                <NavItem label="Home"/>
                <NavItem label="Shop all"/>
                <NavItem label="Home"/>
                <NavItem label="Home"/>
                <NavItem label="Home"/>
            </div>
            <div className="flex gap-2">
                <p>inquiry</p>
                <p>whatsapp</p>
            </div>
        </div>
    )
}