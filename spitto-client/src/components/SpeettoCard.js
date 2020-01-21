import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SpeettoTable from './SpeettoTable';

const SpeettoCard = ({ title, total, publishRate, first, second, third }) => {
    const args = [first, second, third];
    const leftTotal = total * (1.0 - (publishRate / 100));
    const convertedProps = args.map((data, idx) => {
        let currentWinningRate = 0;
        let difference = '산출불가';
        let originalWinningRate = (data.full / total * 100 + 0.0000049);
        if (!(leftTotal === 0 && data.left > 0)) {
            currentWinningRate = (data.left / leftTotal * 100 + 0.0000049);
            if (currentWinningRate > originalWinningRate) {
                let diff = currentWinningRate / originalWinningRate;
                difference = `${diff.toFixed(1)}배 증가`;
            } else {
                let diff = originalWinningRate / currentWinningRate;
                difference = `${diff.toFixed(1)}배 감소`;
            }
        }

        return {
            title: `${idx + 1} 등`,
            originalWinningRate: originalWinningRate,
            currentWinningRate: currentWinningRate,
            delta: difference,
            left: data.left,
            prize: data.prize
        }
    })

    console.log(convertedProps);
    const numberWithCommas = x => x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <Card>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    {title}
                </Typography>
                <Typography color='textSecondary'>
                    {numberWithCommas(leftTotal.toFixed(0))} 매 남음 ({publishRate}% 출하 완료)
                </Typography>
                <SpeettoTable leftTotal={leftTotal} rankInfos={convertedProps} />
            </CardContent>
        </Card>
    );
}

export default SpeettoCard;
