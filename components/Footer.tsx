import Link from "next/link";
import Image from "next/image";
import info from '../package.json';

export default function Footer() {
    return (
        <footer className='flex flex-col justify-center items-center space-y-2 p-8 '>
            <h1 className="text-xl">Miles Rush</h1>

            <div className="socials flex space-x-3">
                <div className='border-2 border-white p-3 w-14 h-14 rounded-full transition-all hover:border-purple-400 hover:bg-purple-400'>
                    <Link href="https://twitter.com/LuaSwitch" className='border-2 border-white p-6 rounded-full'><Image src="/res/svg/icon/twitter.svg" alt="Twitter.com Icon" className={"fa-lg svg-inline--fa"} width={30} height={30} layout="fixed"></Image></Link>
                </div>
                <div className='border-2 border-white p-3 w-14 h-14 rounded-full transition-all hover:border-purple-400 hover:bg-purple-400'>
                    <Link href="https://github.com/MilesSRC" className='border-2 border-white p-6 rounded-full'><Image src="/res/svg/icon/github.svg" alt="Github.com Icon" className={"fa-lg svg-inline--fa"} width={30} height={30} layout="fixed"></Image></Link>
                </div>
                <div className='border-2 border-white p-3 w-14 h-14 rounded-full transition-all hover:border-purple-400 hover:bg-purple-400'>
                    <Link href="https://twitch.tv/dubbyyt" className='border-2 border-white p-6 rounded-full'><Image src="/res/svg/icon/twitch.svg" alt="Twitch.tv Icon" className={"fa-lg svg-inline--fa"} width={30} height={30} layout="fixed"></Image></Link>
                </div>
                <div className='border-2 border-white p-3 w-14 h-14 rounded-full transition-all hover:border-purple-400 hover:bg-purple-400'>
                    <Link href="mailto:miles@milesr.dev" className='border-2 border-white p-6 rounded-full'><Image src="/res/svg/icon/envelope.svg" alt="Envelope Icon" className={"fa-lg svg-inline--fa"} width={30} height={30} layout="fixed"></Image></Link>
                </div>
            </div>

            <span>milesr.dev &copy; { new Date().getFullYear() }</span>
            <span>Running version { info.version }</span>
        </footer>
    )
};