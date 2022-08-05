import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix, library } from '@fortawesome/fontawesome-svg-core';
import { faDiscord, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faGamepad, faCode, faStars } from '@fortawesome/pro-duotone-svg-icons';
import React from 'react';
import Image from 'next/image';


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

export default class TimelineEvent extends React.Component<ITimelineEvent> {
    constructor(props: ITimelineEvent) {
        super(props);
    }

    render() {
        let time = new Date(this.props.time.year + "-" + this.props.time.month + "-" + (this.props.time.day || 1));

        return (
        <div className='bg-slate-800 rounded-sm p-4 flex space-x-5 lg:text-2xl shadow-2xl flex-col'>
            <div className="flex space-x-2 my-3 align-middle text-start items-center">
                <Image src={`/res/svg/icon/${this.props.icon.icon}.svg`} alt={`${this.props.icon.icon} icon`} width={50} height={50} layout={"fixed"} className={"fa-lg svg-inline--fa "} />
                <strong>{ time.toLocaleString("default", { month: "long" }) + " " + time.getDate() }:</strong>
                <h3>{this.props.name}</h3>
            </div>
        </div>
        );
    }
}