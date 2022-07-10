import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CatalogMagic from '../components/Loading';

import Project from '../components/Project';
import Section from '../components/Section';

interface IProject {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
  development?: boolean;
}

const Home: NextPage = () => { 
  let [age, setAge] = useState("0");
  let [generalExperience, setGeneralExperience] = useState("0");
  let [projects, setProjects] = useState<IProject[]>([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    /* Figure out how old I am, and set the "age" state to the result (DOB: 03/17/2005) */
    let today = Date.now();
    let birthDate = new Date("2005-03-17").getTime();
    let year = 31557600000;
    
    /* Get how long ago (in years) I was born */
    let old = ((today - birthDate) / year).toFixed().toString();
    setAge(old);

    /* Figure out how long ago (in years) I started working on computer science */
    let started = ((today - new Date("09/28/2015").getTime()) / year).toFixed().toString();
    setGeneralExperience(started);

    /* Fetch the projects from the API */
    // fetch('https://api.milesr.dev/projects').then(response => response.json()).then(data => {
    //   setProjects(data);
    // }).catch(err => {
      
    // });
    setProjects([{
      title: "DarkCAD",
      description: "A CAD/MDT application for roleplay communities",
      technologies: ["Next.js", "Typescript", "NodeJS", "MongoDB", "Socket.IO", "Express"],
      link: "https://darkcad.net",
      image: "/res/svg/darkcad.svg",
      development: true,
    }, {
      title: "LightChat",
      description: "A chat application for long-term message storage, and lightning fast communication.",
      technologies: ["Next.js", "Typescript", "NodeJS", "MongoDB", "Socket.IO", "Express"],
      link: "https://lightchat.io",
      image: "/res/svg/lightchat.svg",
      development: true,
    }, {
      title: "RVerify",
      description: "A verification system for ROBLOX players on Discord",
      technologies: ["Discord.js", "NodeJS", "MongoDB", "ROBLOX Scripting", "Express"],
      link: "https://rverify.io",
      image: "/res/svg/rverify.svg",
      development: true,
    }, {
      title: "URL Shortener",
      description: "A URL Shortener that's heavily scalable.",
      technologies: ["NodeJS", "MongoDB", "Typescript", "Express", "TailwindCSS"], 
      link: "https://dubg.us/",
      image: "/res/svg/logo.svg"
    }, {
      title: "milesr.dev",
      description: "A portfolio website for Miles Rush",
      technologies: ["NodeJS", "Express", "Typescript", "MongoDB", "Sass", "TailwindCSS", "Next.JS"],
      link: "https://milesr.dev",
      image: "/res/svg/logo.svg"
    }, {
      title: "Guardian",
      description: "A discord bot focused on moderation & security.",
      technologies: ["Discord.js", "NodeJS", "MongoDB", "Express", "TailwindCSS", "Next.JS"],
      link: "https://guardianbot.io/",
      image: "https://guardianbot.io/logo.svg",
    }]);
    setLoading(false);
  }, []);

  return (
    <div className='h-screen'>
      <Head>
        <title>Miles Rush - Fullstack Developer</title>
        <meta name="description" content="milesr.dev is home to the portfolio of Miles Rush. A fullstack freelance developer based out of the United States. " />
        <meta charSet="UTF-8"></meta>
      </Head>

      <header className='mx-auto m-4 flex items-center lg:w-6/12 lg:px-0 px-2 justify-between'>
        <div>
          <Link href='/' className="align-middle flex space-x-4">
            <Image src="/res/svg/logo-white.svg" alt="milesr.dev Logo 'm'" width={50} height={50} layout='fixed' />
          </Link>
        </div>
        <div className="flex space-x-3 items-center">
            <Link href="https://status.milesr.dev">Status</Link>
            <Link href="/contact">
              <a className='rounded-md border-2 border-white p-2 hover:bg-white hover:text-black transition-colors'>Contact</a>
            </Link>      
        </div>
      </header>

      <section className='h-2/4'>
        <div className='flex align-middle items-center justify-center h-1/2 space-x-20'>
          <div className="space-y-3 text-center md:text-2xl sm:text-left">
            <h1 className='text-3xl md:text-5xl font-semibold'>Hey, I&apos;m Miles.</h1>
            <p>{age || '18'} year old, Full-stack Web Developer & Hobbyist</p>
          </div>
          <p className='hidden sm:block text-7xl'>&#128075;</p>
        </div>
      </section>

      {/* About me */}
      <Section header={"About Me"} isFirst={true}>
        <>
          I&apos;m a self-taught full-stack developer. I have a passion for coding and learning new technologies on my own. I love the empowerment you get from learning a technology on your own and seeing your code come to life. I&apos;ve been teaching myself code related things for {generalExperience} years. It all started with building a beach in ROBLOX and being curious about a script that changed the footstep sounds to sand sounds when stepping on sound and opening it to be fascinated with coding. From there, I learned about Javascript and NodeJS. Later learning HTML and CSS to create websites. 
          <br />
          <br />
          Ever since learning these power languages and having an absolute blast with the newly obtained skills, I&apos;ve been also learning about the backend. I&apos;ve been working with NodeJS, Express, and MongoDB. I&apos;ve also been learning alot about server management, NGINX, Ubuntu, and in general Linux kernal. I absolutely love managing servers and working on securing them, making them as performant as possible, and in general messing around. 

          <br /><br />
          <strong>On a more personal note,</strong> I grew up in Portland, Oregon in my grandma&apos;s house. She supported for all of my family with a roof over our heads. I have everything today thanks to her. Love you, grandma. 
        </>
      </Section>

      {/* Projects */}
      <Section header={"Projects"} isFirst={false} loaded={loading}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 justify-center items-center">
              { projects.length > 0 ? projects.map((project: IProject, index: number) => (
                        <Project key={index} {...project} />
                    )) : <p>Loading projects...</p>}
        </div>
      </Section>
    </div>
  )
}

export default Home