import Image from "next/image";
import { Component } from "react";

interface ProjectProps {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    image: string;
    development?: boolean;
}

export default class Project extends Component<ProjectProps> {
    render() {
        return (
            <div className="rounded-md shadow-2xl bg-slate-700 text-white min-h-full p-6 text-left flex flex-col justify-between">
                <div className="flex flex-col text-center">
                    <Image src={this.props.image} alt={this.props.title + " logo"} layout="intrinsic" width={50} height={50} className="mx-auto" />
                    <h1 className="font-semibold">{ this.props.title }</h1>
                    <p>{ this.props.description }</p>
                </div>
                
                <div className="my-5">
                    <p><strong>Technologies:</strong> { this.props.technologies.map((s,i,a) => i != a.length - 1 ? s + ", " : "and " + s) }</p>
                </div>

                <div>
                    
                </div>
            </div>
        )
    }
}