import { Component, ReactElement, Children, ComponentProps, PropsWithChildren } from "react"

interface SectionProps extends PropsWithChildren<ComponentProps<"div">> {
    header: string;
    isFirst?: boolean;
    loaded?: boolean;
    children?: ReactElement;
}

export default class Section extends Component <SectionProps> {
    render() {
        if(this.props.loaded) {
            return <p>Loading...</p>;
        }

        return (
            <section key={this.props.title} className={ this.props.isFirst ? "bg-slate-700 p-4 cover abt" : "bg-slate-800 p-4 cover2"}>
                <div className='text-center'>
                    <h2 className='text-xl md:text-3xl'>{this.props.header}</h2>
                </div>
                <div className="flex items-center justify-center text-lg">
                    <div className='text-center w-full lg:w-1/2 p-6'>
                        {this.props.children}
                    </div>
                </div>
            </section>
        )
    }
}
