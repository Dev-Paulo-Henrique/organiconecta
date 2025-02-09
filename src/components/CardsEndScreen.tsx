import {
    Grid,
    Box,
    Image,
    Heading,
} from "@chakra-ui/react";
import { Button } from "./Button";

export function CardsEndScreen() {
    return (
        <Grid
            templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(250px, 1fr))" }}
            gap={{ base: 4, md: 8 }}
            p={{ base: 4, md: 8 }}
        >
            {/* Card 1 - Roxo */}
            <Box
                key="card1"
                bg="purple.100"
                borderRadius="xl"
                boxShadow="md"
                transition="all 0.2s"
                _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl"
                }}
                overflow="hidden"
            >
                <Box
                    position="relative"
                    w="100%"
                    h="200px"
                    overflow="hidden"
                    _before={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: "rgba(0, 0, 0, 0.1)",
                        zIndex: 1
                    }}
                >
                    <Image
                        src="/images/Sementes.jpg"
                        alt="Mãos segurando sementes"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        transition="transform 0.3s"
                        _hover={{ transform: "scale(1.1)" }}
                    />
                </Box>
                <Box p={6}>
                    <Heading
                        size={{ base: "sm", md: "md" }}
                        mb={4}
                        minHeight={{ base: "none", md: "4.5rem" }}
                    >
                        Semente ao solo, esperança ao futuro.
                    </Heading>
                    <Button type={20} />
                </Box>
            </Box>

            {/* Card 2 - Rosa */}
            <Box
                key="card2"
                bg="pink.100"
                borderRadius="xl"
                boxShadow="md"
                transition="all 0.2s"
                _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl"
                }}
                overflow="hidden"
            >
                <Box
                    position="relative"
                    w="100%"
                    h="200px"
                    overflow="hidden"
                    _before={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: "rgba(0, 0, 0, 0.1)",
                        zIndex: 1
                    }}
                >
                    <Image
                        src="/images/Trabalho.jpg"
                        alt="Agricultor trabalhando"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        transition="transform 0.3s"
                        _hover={{ transform: "scale(1.1)" }}
                    />
                </Box>
                <Box p={6}>
                    <Heading
                        size={{ base: "sm", md: "md" }}
                        mb={4}
                        minHeight={{ base: "none", md: "4.5rem" }}
                    >
                        Na terra, o trabalho se transforma em alimento.
                    </Heading>
                    <Button type={20} />
                </Box>
            </Box>

            {/* Card 3 - Verde */}
            <Box
                key="card3"
                bg="green.100"
                borderRadius="xl"
                boxShadow="md"
                transition="all 0.2s"
                _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl"
                }}
                overflow="hidden"
            >
                <Box
                    position="relative"
                    w="100%"
                    h="200px"
                    overflow="hidden"
                    _before={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: "rgba(0, 0, 0, 0.1)",
                        zIndex: 1
                    }}
                >
                    <Image
                        src="/images/AlimentandoOMundo.jpg"
                        alt="Campo agrícola extenso"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        transition="transform 0.3s"
                        _hover={{ transform: "scale(1.1)" }}
                    />
                </Box>
                <Box p={6}>
                    <Heading
                        size={{ base: "sm", md: "md" }}
                        mb={4}
                        minHeight={{ base: "none", md: "4.5rem" }}
                    >
                        Agricultura: a força que alimenta o mundo.
                    </Heading>
                    <Button type={20} />
                </Box>
            </Box>
        </Grid>
    );
}
