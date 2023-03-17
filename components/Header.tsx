import Link from "next/link";
import Image from "next/image";
import React from "react";

interface HeaderProps {
    sets: Map<string, ISetting>;
    removeElements?: string[];
    addElements?: string[];
}

class Header extends React.Component<HeaderProps> {
    render() {
        return (
            <header className='mx-auto m-4 flex items-center lg:w-6/12 lg:px-0 px-2 justify-between'>
                <div>
                    <Link href='/' className="align-middle flex space-x-4">
                        <Image src="/res/svg/logo-white.svg" alt="milesr.dev Logo 'm'" width={50} height={50} layout='fixed' />
                    </Link>
                </div>
                <div className="flex space-x-3 items-center">
                    {
                        this.props.removeElements?.includes("status") ? null : <Link href="https://status.milesr.dev">Status</Link>
                    }


                    {
                        this.props.removeElements?.includes("contact") ? null : 
                        
                        this.props.sets.has("contactable") || this.props.sets.size < 0 ? <Link href="/contact">
                        <a className='rounded-md border-2 border-white p-2 hover:bg-white hover:text-black transition-colors'>Contact</a>
                        </Link> : null
                    }

{
                        this.props.addElements?.includes("return") ? <Link href={"/"}>
                            <a className='rounded-md border-2 border-white p-2 hover:bg-white hover:text-black transition-colors'>Go home →</a>
                        </Link> : null
                    }
                </div>
            </header>
        )
    }
}

export default Header;