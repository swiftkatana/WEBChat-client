import { FC } from 'react';

export interface IRoute {
  component: FC<any>;
  path: string;
  exact?: boolean;
  public?: boolean;
}
