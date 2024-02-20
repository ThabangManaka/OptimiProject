export interface Project {
  id: number;
  name: string;
  url: string;
  image: string
  groups: Group[];
}

export interface Group{
  id: number;
  name: string;
  url: string;
}
