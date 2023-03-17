import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Stars from "../components/Stars";

const Contact: NextPage = ({ settings }: InferGetStaticPropsType<typeof getStaticProps>) => {
  let [sets, setSets] = useState(new Map<string, ISetting>());

  useEffect(() => {
    // Site Settings
    let map = new Map<string, ISetting>();

    settings.forEach((setting: ISetting) => {
      if(setting.enabled)
        map.set(setting.field, setting);
    });

    setSets(map);
  }, [])

  // Captcha/Form handlers
  let [token, setToken] = useState("");
  let [refresh, setRefresh] = useState(false);

  const onVerify = useCallback((tokenA: string) => {
    setToken(tokenA);
  }, []);

  const send = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let form = e.currentTarget;

    let data = new FormData(form);

    data.append("token", token);

    fetch("/api/contact", {
      method: "POST",
      body: data
    }).then(res => {
      if(res.status == 200) {
        form.reset();
        setRefresh(!refresh);
      }
    });
  }, [token, refresh]);

  return (
      <div>
          <Head>
              <title>Hire/Contact - Miles Rush</title>
              <meta name="description" content="The contact page to reach/hire miles rush, a freelance fullstack web developer." />
          </Head>

          <Stars />

          <main>
            <Header sets={sets} removeElements={["contact"]} addElements={["return"]} />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-4xl font-bold text-center">Thanks for taking the time to reach out</h1>

              <div className="form mt-6">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-full max-w-lg">
                    <form className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                          Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                          Inquiry Type
                        </label>
                      
                        <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="inquiry" defaultValue={"question"}>
                          <option value="question">General Questions</option>
                          <option value="freelance">Freelancing</option>
                          <option value="job">Job Offer</option>
                          <option value="work">Work Together</option>
                          <option value="personal">Personal</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                          Message
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Message" />
                      </div>

                      <div className="flex items-center justify-between">
                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                          Send
                        </button>
                      </div>

                      <p className="mt-4">By pressing send, you agree to the <Link href="/docs/privacy#contact-agreement"><a href="#" className="text-violet-500 underline">contact agreement.</a></Link></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
      </div>
  )
}

export default Contact;

export const getStaticProps: GetStaticProps = async () => { 
  const sets = await fetch('http://localhost:3003/settings').catch(() => {});
  let settings = await sets?.json();

  return {
    props: {
      settings: settings || []
    }
  }
};