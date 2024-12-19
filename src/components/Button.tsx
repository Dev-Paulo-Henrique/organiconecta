// Paulo Henrique

import { Stack, Button as Btn, Text } from "@chakra-ui/react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    bg?: string;
    color?: string;
    colorScheme?: string;
}

export function Button({ text, onClick, bg, color, colorScheme }: ButtonProps) {
    return (
        <Stack gap="2" align="flex-start">
            <Stack align="center" direction="row" gap="10">
                <Btn p={4} bg={bg} onClick={onClick} colorScheme={colorScheme}><Text color={color}>{text}</Text></Btn>
            </Stack>
        </Stack>
    )
}