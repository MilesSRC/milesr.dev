import { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import Stars from "../components/Stars";

const Page: NextPage = () => {
    return <div className="w-full h-screen flex align-middle justify-center flex-col text-center text-lg">
        <Stars />

        <div>
            <Image src="/res/svg/logo-white.svg" alt="milesr.dev logo" width={50} height={50} layout='fixed' />
            <h1 className="text-5xl"><strong>503</strong></h1>
            <h2>Ongoing Maintenance</h2>
            <p>Sorry, looks like the site is undergoing scheduled maintenance</p>
        </div>

        <div className="absolute bottom-2 right-2"><p>milesr.dev &copy; { new Date().getFullYear() }</p></div>
    </div>;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
    res.statusCode = 503;

    return {
      props: {}, // will be passed to the page component as props
    }
}

export default Page;