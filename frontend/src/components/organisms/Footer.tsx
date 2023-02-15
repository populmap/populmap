import style from "@emotion/styled";

const FooterStyle = style.footer`
  font-weight: 400;
  font-size: 0.5rem;
  text-align: center;
`;

const Footer = (): JSX.Element => {
  const date = new Date();

  return (
    <FooterStyle>
      <section>
        <a
          target="_blank"
          style={{ color: "black", textDecorationLine: "none" }}
          rel="noopener noreferrer"
          href="https://github.com/populmap/populmap"
        >
          &nbsp;Github&nbsp;
        </a>
      </section>
      <section>© {date.getFullYear()} populmap </section>
    </FooterStyle>
  );
};

export default Footer;
