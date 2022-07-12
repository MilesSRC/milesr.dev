import { Component, ReactElement, Children, ComponentProps, PropsWithChildren } from "react"

interface SectionProps extends PropsWithChildren<ComponentProps<"div">> {
    header: string;
    headerClassName?: string;
    isFirst?: boolean;
    loaded?: boolean;
    noBg?: boolean;
    className?: string;
    children?: ReactElement;
}

export default class Section extends Component <SectionProps> {
    render() {
        if(this.props.loaded) {
            return <div className={(this.props.isFirst ? "bg-slate-700 p-4 cover abt" : this.props.noBg ? "p-4 cover2" : "bg-slate-800 p-4 cover2") + " " + this.props.className + " text-center p-20"}>
                <p>Loading dynamic content...</p>
            </div>;
        }

        return (
            <section key={this.props.title} className={ (this.props.isFirst ? "bg-slate-700 p-4 cover abt" : this.props.noBg ? "p-4 cover2" : "bg-slate-800 p-4 cover2") + " " + this.props.className}>
                <div className='text-center'>
                    <h2 className={'text-xl md:text-3xl ' + this.props.headerClassName}>{this.props.header}</h2>
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
