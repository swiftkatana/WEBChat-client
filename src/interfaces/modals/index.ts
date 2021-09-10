export interface IButtonProp {
	onClick: (event: any) => void
	text: string
	color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
}
