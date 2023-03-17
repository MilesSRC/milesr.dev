import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Stars from "../components/Stars";

const Page: NextPage = () => {
    return <div className="w-full h-screen flex align-middle justify-center flex-col text-center text-lg">
        <Stars />

        <div>
            <Image src="/res/svg/logo-white.svg" alt="milesr.dev logo" width={50} height={50} layout='fixed' />
            <h1 className="text-5xl"><strong>404</strong></h1>
            <h2>Page Not Found</h2>
            <p className="mb-6">Sorry, looks like that page doesn&apos;t exist.</p>
            <Link href="/"><a className="bg-transparent hover:bg-white hover:text-black transition-all border-2 border-white p-3 rounded-md">Lets go home</a></Link>
        </div>

        <div className="absolute bottom-2 right-2"><p>milesr.dev &copy; { new Date().getFullYear() }</p></div>
    </div>;
}

export default Page;