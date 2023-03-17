import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { Component } from "react";
import TimelineEvent from "./TimelineEvent";

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

type TimelineYear = {
    year: number;
    events: ITimelineEvent[];
}

export default class TimelineEventYear extends Component<TimelineYear> {
    render() {        
        return <div className="p-4 drop-shadow-md bg-violet-600 rounded-sm">
            <h2 className="m-2 font-bold">{this.props.year}</h2>
            <div className="flex flex-col space-y-4">

                {this.props.events.sort((a,b) => b.time.month - a.time.month).map((event, index) => {
                    return <TimelineEvent key={index} {...event} />
                })}
            </div>
        </div>;
    }
}