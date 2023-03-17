import { Component } from "react";

interface SkillProps {
    name: string;
    level: number;
    started: Date;
}

export default class Skill extends Component<SkillProps> {
    /* Convert a date to "X years ago" or "less than 1 year ago" */
    dateToYearsAgo(date: Date) {
        let today = Date.now();
        let year = 31557600000;

        let ago = ((today - date.getTime()) / year).toString();
        ago = ago.split(".")[0];

        if(ago == "0")
            return "less than 1 year ago";
        else
            return ago + " year(s) ago";
    }


    render() {
        return (
            <div className="flex flex-col items-start">
                {/* Title */}
                <div className="w-full justify-between flex">
                    <h2 className="text-xl font-semibold">{ this.props.name }</h2>

                    {/* Started (rounded years ago, less than a year, etc)  */}
                    <p className="text-gray-200 text-sm">{ "Started learning " + this.dateToYearsAgo(this.props.started) }</p>
                </div>

                {/* Level Bar (level / 100) */}
                <div className="w-full h-4 bg-gray-200 rounded-full mt-2">
                    <div className="h-full bg-purple-400 rounded-full transition-all" style={{ width: (this.props.level / 100) * 100 + "%" }}></div>
                </div>
            </div>
        )
    }
}