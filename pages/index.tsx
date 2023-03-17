import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Project from '../components/Project';
import Section from '../components/Section';
import TimelineEventYear from '../components/TimelineEventYear';

import Header from '../components/Header';

import Stars from '../components/Stars';
import Footer from '../components/Footer';
import Skill from '../components/Skill';

import Confetti from 'react-confetti';

const Home: NextPage = ({ projects, timelineEvents, settings }: InferGetStaticPropsType<typeof getStaticProps>) => { 
  let [age, setAge] = useState("0");
  let [generalExperience, setGeneralExperience] = useState("0");
  let [timelineElements, setTimelineElements] = useState<JSX.Element[]>([]);
  let [loading, setLoading] = useState(true);

  let [sets, setSets] = useState(new Map<string, ISetting>());

  // Events
  let [isBirthday, setIsBirthday] = useState(false);
  let [isNewYears, setIsNewYears] = useState(false);

  let [windowwidth, setWindowWidth] = useState(0);
  let [windowheight, setWindowHeight] = useState(0);

  useEffect(() => {
    /* Figure out how old I am, and set the "age" state to the result (DOB: 03/17/2005) */
    let today = Date.now();
    let birthDate = new Date("2005-03-17").getTime();
    let year = 31557600000;
    
    /* Get how long ago (in years) I was born */
    let old = ((today - birthDate) / year).toString().split(".")[0];
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

    // Figure out current-events
    let now = new Date();
    let month = now.getMonth();
    let day = now.getDate();

    if(month == 2 && day == 17) {
      setIsBirthday(true);
    }

    /* Set the timeline elements */
    let elements: JSX.Element[] = [];
    
    years.forEach((events, year) => {
      elements.push(<TimelineEventYear key={year} year={year} events={events} />);
    });

    elements.sort((a,b) => b.props.year - a.props.year);

    setTimelineElements(elements);

    /* Set the window size */
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    setLoading(false);

    /* Additionals */
    let map = new Map<string, ISetting>();

    settings.forEach((setting: ISetting) => {
      if(setting.enabled)
        map.set(setting.field, setting);
    });

    setSets(map);
  }, []);

  return (
    <>
      <Stars />

      <div className='h-screen'>
        <Head>
          <title>Miles Rush - Fullstack Developer</title>
          <meta name="description" content="milesr.dev is home to the portfolio of Miles Rush. A fullstack freelance developer based out of the United States. " />
          <meta charSet="UTF-8"></meta>
        </Head>

        <div className={'w-full p-3 text-xl bg-amber-600 text-center ' + (sets.has("notification") && sets.get("notification")?.enabled ? 'visible' : 'hidden') }>
          { sets.get('notification')?.data?.text }
        </div>

        {/* Current Event */}
        <Confetti
          width={windowwidth}
          height={windowheight}
          numberOfPieces={200}
          run={isBirthday || isNewYears}
          recycle={false}
        />

        {
          isBirthday || isNewYears ?
          <div style={{
            backgroundColor: "#1d1d1d"
          }} className="text-center w-full">
            { isBirthday ? "🎉 It's my birthday! 🎉" : isNewYears ? "🎉 Happy New Years! 🎉" : "" }
          </div> : null
        }

        <Header sets={sets} />

        <section className='h-2/4'>
          <div className='z-10 absolute h-full w-full py-40 text-center'>
            <div className='flex align-middle justify-center items-center space-x-20'>
              <div className="space-y-3 text-center md:text-2xl sm:text-left">
                <h1 className='text-3xl md:text-5xl font-semibold'>Hey, I&apos;m Miles.</h1>
                <p>{age || '18'} year old, Full-stack Web Developer & Hobbyist</p>
              </div>
              <p className='hidden sm:block text-7xl'>&#128075;</p>
            </div>

            <p className='mt-10 text-lg font-light uppercase tracking-wider'>"Shoot for the stars"</p>
          </div>
        </section>

        {/* About me */}
        <Section header={"About Me"} isFirst={true}>
          <>
            I am a self-taught full-stack developer with a passion for coding and learning new technologies independently. I have been teaching myself various coding-related skills for {generalExperience} years, starting with building a beach in ROBLOX and becoming intrigued by the underlying code. This led me to learn JavaScript and NodeJS, followed by HTML and CSS for creating websites.
            <br />
            Since then, I have continued to learn about the backend, working with NodeJS, Express, and MongoDB, as well as gaining knowledge in server management, NGINX, Ubuntu, and Linux kernel. I enjoy managing servers, optimizing performance, and ensuring security.
            <br />
            I have a quick learning ability and always seek to expand my knowledge.
            <br /><br />
            On a personal note, I grew up in Portland, Oregon, in my grandmother's house, where she provided support for my family and me. I owe everything to her and am grateful for her love and guidance.
          </>
        </Section>

        {/* UA */}
        <div style={{
          backgroundColor: "#1d1d1d"
        }} className="text-center w-full">
          🇺🇦 Support Ukraine in their fight against Russian aggression. <Link href="https://war.ukraine.ua/"><a href="https://war.ukraine.ua/" className='text-purple-500 underline'>Read More →</a></Link>
        </div>

        {/* Projects */}
        <Section header={"Projects"} isFirst={false} loaded={loading}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 justify-center items-center">
                { projects.length > 0 ? projects.map((project: IProject, index: number) => (
                          <Project key={index} {...project} />
                      )) : <p>Loading projects...</p>}
          </div>
        </Section>

        <Section header={"Skills"} isFirst={true}>
            <div className="w-full flex flex-col row-auto space-y-4">
              <Skill 
              name='Backend (NodeJS, Express)'
              level={90}
              started={new Date("01/01/2018")}
              />
              
              <Skill 
              name='Game Design (ROBLOX, Lua)'
              level={85}
              started={new Date("01/01/2016")}
              />

              <Skill 
              name='Frontend Functionality (JS)'
              level={80}
              started={new Date("01/01/2018")}
              />

              <Skill 
              name='Backend Management (NGINX, Linux)'
              level={70}
              started={new Date("01/01/2019")}
              />

              <Skill 
              name='Minecraft Plugins (Java)'
              level={68}
              started={new Date("01/01/2018")}
              />


              <Skill 
              name='Frontend Design (HTML, CSS)'
              level={65}
              started={new Date("01/01/2018")}
              />

              <Skill 
              name='Database Management (MongoDB)'
              level={63}
              started={new Date("01/01/2020")}
              />
              
              <Skill 
              name='Frontend Frameworks (React, NextJS, Vue)'
              level={50}
              started={new Date("01/01/2020")}
              />

              <Skill 
              name='Other (Typescript, Python)'
              level={40}
              started={new Date("07/01/2022")}
              />
            </div>
        </Section>

        {/* Blank Section */}
        <Section header={"Introducing V2"} noBg={true} className={"my-10"} headerClassName={"text-4xl md:text-6xl"}>
            <>
              <h1>
                Built for performance, scalability, and accessibility
              </h1>

              <div className='my-10'>
                  <h1 className='text-2xl'>Performance & Accessibility</h1>
                  <p>milesr.dev V2 sports Next.JS, TailwindCSS, SASS, and all images are SVG&apos;s for blazing fast performance.</p>
                  <p>Accessibility was also focused on. Constrast of backgrounds, text colors, and font weights were fixed to be optimized for readability</p>
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
        <Section header={"Timeline"} noBg={true} className={"bg-violet-800"} loaded={loading}>
          <>
            <p className='mb-10'>A timeline of all major events that have importance to me</p>
            <div className='lg:grid grid-cols-3 gap-3 items-start h-full'>
                {
                    projects.length > 0 ? timelineElements : <p>Loading timeline...</p>
                }
            </div>
          </>
        </Section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3003/build');
  let data = await res.json();
  let projects = data.projects;
  let timelineEvents: ITimelineEvent[] = data.timeline;

  const sets = await fetch('http://localhost:3003/settings').catch(() => {});
  let settings = await sets?.json();

  return {
    props: {
      projects,
      timelineEvents,
      settings: settings || []
    }
  }
};