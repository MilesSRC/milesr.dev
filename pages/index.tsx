import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Project from '../components/Project';
import Section from '../components/Section';
import TimelineEvent from '../components/TimelineEvent';
import { IconName, IconPrefix, IconProp } from '@fortawesome/fontawesome-svg-core';
import TimelineEventYear from '../components/TimelineEventYear';

interface IProject {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
  development?: boolean;
  shutdown?: {
    year: number;
  }
}

interface ITimelineEvent {
  name: string;
  link?: string;
  time: {
    year: number;
    month: number;
    day?: number;
  }
  icon: {
    library: IconPrefix;
    icon: IconName;
  }
}

const Home: NextPage = ({ projects, timelineEvents }: InferGetStaticPropsType<typeof getStaticProps>) => { 
  let [age, setAge] = useState("0");
  let [generalExperience, setGeneralExperience] = useState("0");
  let [timelineElements, setTimelineElements] = useState<JSX.Element[]>([]);
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
       
    /* Set the timeline years */
    let years = new Map<number, ITimelineEvent[]>();

    timelineEvents.forEach((event: ITimelineEvent) => {
      let year = event.time.year;

      if(!years.has(year)) 
        years.set(year, []);
      
      years.get(year)?.push(event);
    });

    /* Set the timeline elements */
    let elements: JSX.Element[] = [];
    
    years.forEach((events, year) => {
      elements.push(<TimelineEventYear key={year} year={year} events={events} />);
    });

    elements.sort((a,b) => b.props.year - a.props.year);

    setTimelineElements(elements);
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
          I learn new things extremely fast and I&apos;m always looking to learn more.
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

      {/* Blank Section */}
      <Section header={"Introducing V2"} noBg={true} className={"my-10"} headerClassName={"text-4xl md:text-6xl"}>
          <>
            <h1>
              Built for performance, scalability, and accessability
            </h1>

            <div className='my-10'>
                <h1 className='text-2xl'>Performance & Accessability</h1>
                <p>milesr.dev V2 sports Next.JS, TailwindCSS, SASS, and all images are SVG&apos;s for blazing fast performance.</p>
                <p>Accessability was also focused on. Constrast of backgrounds, text colors, and font weights were fixed to be optimized for readability</p>
            </div>

            <div className="my-10">
                <h1 className="text-2xl">Originality</h1>
                <p>
                  90% of the design for V1 was based around another freelancers website (<Link href={"https://mattfarley.ca/"}><a className="hover:underline">Visit Matt Farley&apos;s Portfolio</a></Link>) and I always felt my portfolio was lacking in orginality.
                  V2 aims to address this by adapting a design solely inspired on all sorts of different designs & some aspects from V1 including lots of twists of my own.
                </p>
            </div>

            <div className='my-10'>
                <h1 className="text-2xl">Imporvements</h1>
                <p>
                  In less than one year, I learned major technologies such as React, Next.JS, TailwindCSS, and Typescript. I also learned about the importance of a good design and a good user experience.
                  Taking all that in mind, I figured that a refresh of milesr.dev was in order. V1 used Vue, Bootstrap, and a custom express frontend server using express.static without compression.
                </p>
            </div>
          </>
      </Section>

      {/* Timeline */}
      <Section header={"Timeline"} noBg={true} className={"bg-slate-700"} loaded={loading}>
        <>
          <p className='mb-10'>A timeline of all major events that have importance to me</p>
          <div className='flex flex-col items-center justify-center h-full space-y-4'>
              {
                  projects.length > 0 ? timelineElements : <p>Loading timeline...</p>
              }
          </div>
        </>
      </Section>

      {/* Footer */}
      <footer className='flex flex-col justify-center items-center space-y-2 p-8 bg-slate-800'>
        <div className='footer-push p-6 bg-slate-800 shadow-2xl shadow-purple-500 rounded-md flex space-x-20 justify-between items-center'>
          <h2 className='text-xl'>Looking to work on a project together?</h2>
          <Link href={"/contact?iam=developer"}>
            <a className='rounded-md border-2 border-white p-2 hover:bg-white hover:text-black transition-colors'>Contact</a>
          </Link>
        </div>

        <h1 className="text-xl">Miles Rush</h1>
        <span>milesr.dev &copy; { new Date().getFullYear() }</span>
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  let projects = [{
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
    shutdown: {
      year: 2020
    }
  }];
  let timelineEvents: ITimelineEvent[] = [{
    name: "Started my coding journey",
    time: {
      year: 2015,
      month: 9,
      day: 28
    },
    icon: {
      library: "fad",
      icon: "stars"
    }
  }, {
    name: "Started learning JS & NodeJS & Discord.js",
    time: {
      year: 2017,
      month: 4,
      day: 29
    },
    icon: {
      library: "fab",
      icon: "discord"
    }
  }, {
    name: "Started learning HTML & CSS",
    time: {
      year: 2018,
      month: 5,
      day: 28
    },
    icon: {
      library: "fab",
      icon: "html5"
    }
  }, {
    name: "Created my first website (dubgames.net)",
    time: {
      year: 2018,
      month: 6,
      day: 12
    },
    icon: {
      library: "fad",
      icon: "code"
    }
  }, {
    name: "Created my first successful ROBLOX game",
    time: {
      year: 2019,
      month: 11
    },
    icon: {
      library: "fad",
      icon: "gamepad"
    }
  }];

  return {
    props: {
      projects,
      timelineEvents
    }
  }
};