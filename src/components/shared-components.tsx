import { ReactNode } from 'react'
import { CircularProgress, Typography, TypographyProps } from '@mui/material'

import { CenteredView, FullCenteredView } from 'src/components/styled-components'
import { FlexRow, SingleFlex } from 'src/pages/dashboard/dashboard-style'

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

export const KeyValueRow = ({title, value}: {title?: ReactNode, value?: ReactNode}) => {
	return (
		<FlexRow>
			<SingleFlex>
				<Typography variant="h6" color="primary"> {title} </Typography>
			</SingleFlex>
			<SingleFlex>
				<Typography variant="h6" color="primary"> {value} </Typography>
			</SingleFlex>
		</FlexRow>
	);
}