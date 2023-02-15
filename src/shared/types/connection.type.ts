export interface ISection {
  departure: {
    location: {
      name: string;
    };
    departure: string;
  };
  arrival: {
    location: {
      name: string;
    };
    arrival: string;
  };
}

export interface IConnection {
  from: {
    location: {
      name: string;
      coordinate: {
        x: number;
        y: number;
      };
    };
    departure: string;
  };
  to: {
    location: {
      name: string;
      coordinate: {
        x: number;
        y: number;
      };
    };
    arrival: string;
  };
  sections: Array<ISection>;
}
