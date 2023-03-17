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
  
  interface ISetting { field: string, enabled: boolean, data?: { text?: string, message?: string, icon?: string } }