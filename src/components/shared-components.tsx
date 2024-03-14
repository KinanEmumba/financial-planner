import { ReactNode } from 'react'
import { CircularProgress, Typography, TypographyProps } from '@mui/material'

import { CenteredView, FullCenteredView } from 'src/components/styled-components'

interface CenteredHeadingProps extends TypographyProps {
  children: ReactNode;
}

export const CenteredText = ({children, ...props}: CenteredHeadingProps) => {
	return (
		<CenteredView>
			<Typography {...props}>
				{children}
			</Typography>
		</CenteredView>
	)
}

export const CenteredLoader = () => {
	return (
		<FullCenteredView>
			<CircularProgress color="primary" size={50} />
		</FullCenteredView>
	)
}