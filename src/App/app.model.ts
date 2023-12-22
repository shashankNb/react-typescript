export enum RequestMethod {
    GET,
    POST,
    PUT,
    DELETE,
    OPTIONS,
    HEAD,
    PATCH
  }
  
  export enum BooleanString {
    Y = 'Y',
    N = 'N'
  }
  
  export interface ViewModel {
    label: string;
    value: string | string[];
    isFilterBy?: boolean;
    count?: number;
  }
  