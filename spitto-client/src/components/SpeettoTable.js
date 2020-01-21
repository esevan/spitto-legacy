import React from 'react';
import Table from '@material-ui/core/Table';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const unitizePrize = (prize) => {
    let unit = '원';
    let unittedPrize = prize;

    if (prize >= 100000000) {
        unit = '억원';
        unittedPrize = prize / 100000000;
    } else if (prize >= 10000) {
        unit = '만원';
        unittedPrize = prize / 10000;
    }

    const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${numberWithCommas(unittedPrize)} ${unit}`
}

const SpeettoTable = ({ leftTotal, rankInfos }) => {
    const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

    return (
        <Table size='small' aria-label='speetto table' style={{ fontSize: '1rem' }}>
            <TableHead>
                <TableRow>
                    {
                        matches && <TableCell>순위</TableCell>
                    }
                    <TableCell align='right'>당첨금</TableCell>
                    <TableCell align='right'>잔량</TableCell>
                    {
                        matches && (
                            <>
                                <TableCell align='right'>원 당첨률</TableCell>
                                <TableCell align='right'>현 당첨률</TableCell>
                            </>
                        )
                    }
                    <TableCell align='center'>당첨률 증감</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rankInfos.map((e, idx) => (
                    <TableRow key={idx}>
                        {matches && <TableCell component='th' scope='row' align='center'>
                            {e.title}
                        </TableCell>}
                        <TableCell align='right'>{unitizePrize(e.prize)}</TableCell>
                        <TableCell align='right'>{e.left}</TableCell>
                        {
                            matches && (
                                <>
                                    <TableCell align='right'>{`${e.originalWinningRate.toFixed(5)} %`}</TableCell>
                                    <TableCell align='right'>{(leftTotal === 0 && e.left > 0) ? '??' : `${e.currentWinningRate.toFixed(5)} %`}</TableCell>
                                </>
                            )
                        }
                        <TableCell align='center' style={{ color: e.delta.includes('증가') ? 'blue' : e.delta.includes('감소') ? 'red' : 'grey' }}>{e.delta}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SpeettoTable;
