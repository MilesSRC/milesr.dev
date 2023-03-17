import Image from "next/image";
import Link from "next/link";
import { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSunset } from '@fortawesome/pro-duotone-svg-icons';

interface ProjectProps {
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

export default class Project extends Component<ProjectProps> {
    render() {
        return (
            <div className="rounded-md drop-shadow-2xl bg-white text-black min-h-full p-6 text-left flex flex-col justify-between">
                <div className="flex flex-col text-center py-2">
                    <Image src={this.props.image} alt={this.props.title + " logo"} layout="intrinsic" width={50} height={50} className="mx-auto" />
                    <h1 className="font-semibold">{ this.props.title }</h1>
                    <p>{ this.props.description }</p>
                </div>
                
                <div className="my-5">
                    <p><strong>Technologies:</strong> { this.props.technologies.map((s,i,a) => i != a.length - 1 ? s + ", " : "and " + s) }</p>
                </div>

                <div className="text-center">
                    <button className="disabled:cursor-not-allowed disabled:opacity-50" disabled={this.props.development || this.props.shutdown !== undefined}>
                        { this.props.development ?  " In Development" : this.props.shutdown ? (<>
                            <FontAwesomeIcon icon={faSunset} />
                            <span className="ml-1">Shutdown in {this.props.shutdown.year}</span>
                        </>) : (<>
                            <Link href={this.props.link}>
                                <a className="hover:underline">Visit Website</a>
                            </Link>
                        </>) }
                    </button>
                </div>
            </div>
        )
    }
}