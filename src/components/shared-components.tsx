import { ReactNode } from 'react'
import { CircularProgress, Typography, TypographyProps } from '@mui/material'

import { CenteredContentView, FullScreenCenteredContentView } from 'src/components/styled-components'
import { FlexRow, SingleFlex } from 'src/pages/dashboard/dashboard-style'

interface CenteredHeadingProps extends TypographyProps {
  children: ReactNode;
}

export const CenterAlignedText = ({children, ...props}: CenteredHeadingProps) => {
	return (
		<CenteredContentView>
			<Typography {...props}>
				{children}
			</Typography>
		</CenteredContentView>
	)
}

export const FullScreenLoader = () => {
	return (
		<FullScreenCenteredContentView>
			<CircularProgress color="primary" size={50} />
		</FullScreenCenteredContentView>
	)
}

export const HorizontalTextsRow = ({title, value}: {title?: ReactNode, value?: ReactNode}) => {
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