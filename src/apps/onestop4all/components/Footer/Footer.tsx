import { Box, Container, Flex } from "@open-pioneer/chakra-integration";

export const Footer = () => {
    return (
        <>
            <Container maxW={{ base: "100%", custombreak: "80%" }} paddingBottom="4px">
                <Box className="separator" />
            </Container>
            <Box className="footer">
                <Container maxW={{ base: "100%", custombreak: "80%" }} position="relative">
                    <Box className="footer-navigation" padding={{ base: "50px 0px", custombreak: "28px 0px" }}>
                        <FooterLinkGroup title="Get connected">
                            <FooterLink href="https://aquainfra.eu/about">About</FooterLink>
                            <FooterLink href="https://aquainfra.eu/partners">Partners</FooterLink>
                            <FooterLink href="https://aquainfra.eu/contact">Contact</FooterLink>
                        </FooterLinkGroup>
                        <FooterLinkGroup title="Legal information">
                            <FooterLink href="https://www.nfdi4earth.de/legal-notice">Legal information</FooterLink>
                            <FooterLink href="https://www.nfdi4earth.de/privacy-policy">Privacy</FooterLink>
                        </FooterLinkGroup>
                    </Box>
                    <Flex
                        className="social-media"
                        flexDirection={{ base: "column", custombreak: "row" }}
                        gap={{ base: "20px", custombreak: "52px" }}
                        alignItems="center"
                    >
                        <SocialMediaLink href="https://github.com/AquaINFRA" src="/github.png" alt="GitHub">
                            GITHUB
                        </SocialMediaLink>
                        <SocialMediaLink href="https://twitter.com/AquainfraEU" src="/twitter.svg" alt="Twitter">
                            TWITTER
                        </SocialMediaLink>
                        <SocialMediaLink href="https://creativecommons.org/licenses/by/4.0/" src="/cc-by.svg" alt="CC BY">
                            CC BY 4.0
                        </SocialMediaLink>

                        <Box flex="1 1 20px" />

                        <Box w={{ base: "40%", custombreak: "20%" }}>
                            <a href="https://cordis.europa.eu/project/id/101094434" target="_blank" rel="noreferrer">
                                <Box className="label" marginBottom="5px">
                                    Funded by:
                                </Box>
                                <img src="/ec-logo.svg" width="100%" alt="EU Funding Logo" />
                            </a>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </>
    );
};

const FooterLinkGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Box display="flex" flexDirection={{ base: "column", custombreak: "row" }} gap="8px">
        <Box className="section-header" color={"white"} fontSize={18} fontWeight={700}>{title}:</Box>
        <Box display="flex" gap="8px" alignItems="center">
            {children}
        </Box>
    </Box>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <>
        <a href={href} target="_blank" rel="noreferrer" className="label">
            {children}
        </a>
        <span>|</span>
    </>
);

const SocialMediaLink = ({ href, src, alt, children }: { href: string; src: string; alt: string; children: React.ReactNode }) => (
    <Box className="entry">
        <a href={href} target="_blank" rel="noreferrer">
            <Flex gap="10px" alignItems="center">
                <Box w="40px">
                    <img src={src} alt={alt} />
                </Box>
                <Box className="label">{children}</Box>
            </Flex>
        </a>
    </Box>
);
