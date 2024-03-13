import { Gauge, GaugeConfig } from '@ant-design/charts'
import { StyledCard } from 'src/pages/dashboard/dashboard-style'
import { CenteredText } from './shared-components'

const GuageChart = ({
	guageConfig,
	totalExpense,
	expenseLimit,
}: {
	guageConfig: GaugeConfig,
	totalExpense: number,
	expenseLimit: number,
}) => {
	return (
		<StyledCard>
			<Gauge {...guageConfig} />
			<CenteredText variant='h6'>
				{`Monthly Limit: ${totalExpense} of ${expenseLimit}`}
			</CenteredText>
		</StyledCard>
	)
}

export default GuageChart