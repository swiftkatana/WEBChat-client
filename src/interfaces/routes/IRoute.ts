import { FC } from 'react'

export interface IRoute {
	name: string
	component: FC<any>
	path: string
	exact: boolean
	private: boolean
}
