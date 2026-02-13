import { Box, BoxProps } from '@mui/material';
import { ElementType } from 'react';

type MuiColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

interface SvgIconProps extends Omit<BoxProps, 'component' | 'color'> {
    icon: ElementType;
    size?: number | string;
    color?: MuiColor | string;
}

export function SvgIcon({ icon: Icon, size = 24, color, sx, ...props }: SvgIconProps) {
    const isMuiColor = ['primary', 'secondary', 'error', 'warning', 'info', 'success'].includes(color as string);
    const colorValue = isMuiColor ? `${color}.main` : color;

    return (
        <Box
            component={Icon}
            sx={[{
                width: 'auto',
                height: size,
                display: 'inline-flex',
                color: colorValue,
                '& path': { stroke: 'currentColor' },
                '& circle': { stroke: 'currentColor' },
                '& line': { stroke: 'currentColor' },
                '& polyline': { stroke: 'currentColor' },
                '& polygon': { stroke: 'currentColor' },
                '& rect': { stroke: 'currentColor' },
            }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...props}
        />
    );
}
