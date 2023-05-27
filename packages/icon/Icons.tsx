import { Icon, type IconProps } from './Icon'

export type IconsProps = Omit<
	IconProps,
	'title' | 'description' | 'path' | 'viewBox'
>

export const ChevronRight = (props: IconsProps) => (
	<Icon
		title='ChevronRight'
		path='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'
		{...props}
	/>
)

export const HelpCircleOutline = (props: IconsProps) => (
	<Icon
		title='HelpCircleOutline'
		path='M11 17v-2h2v2h-2ZM11.5089 9.1568a1 1 0 0 1 .991 1.7372l-.0049.0029A2.9205 2.9205 0 0 0 11.05 13.47V14h2v-.5511l-.0002-.0112a.9202.9202 0 0 1 .4534-.8135 3.0006 3.0006 0 0 0 1.4966-2.5859 2.9994 2.9994 0 0 0-1.482-2.5978 2.9995 2.9995 0 0 0-2.9906-.0261A2.9996 2.9996 0 0 0 9.0001 9.986l1.9998.028a1.0007 1.0007 0 0 1 .509-.8572Z M2 12C2 6.4771 6.4771 2 12 2c5.5228 0 10 4.4771 10 10 0 5.5228-4.4772 10-10 10-5.5229 0-10-4.4772-10-10Zm10-8c-4.4183 0-8 3.5817-8 8s3.5817 8 8 8 8-3.5817 8-8-3.5817-8-8-8Z'
		{...props}
	/>
)
