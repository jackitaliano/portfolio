import { ReactNode } from "react"

type Props = {
	id: string
	children: ReactNode
}

export function Page({id, children}: Props) {

	return (
		<div id={id} className="w-full h-screen py-10 overflow-hidden">
			{children}
		</div>
	)
}
