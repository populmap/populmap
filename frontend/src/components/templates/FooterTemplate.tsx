import style from "@emotion/styled";

const Footer = style.footer`
  font-weight: 400;
  font-size: 0.5rem;
  height: 10vh;
`;

const FooterTemplate = (): JSX.Element => {
  return (
    <Footer>
      <section>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/populmap/populmap"
        >
          &nbsp;Github&nbsp;
        </a>
      </section>
      <section>© 2022 populmap </section>
    </Footer>
  );
};

export default FooterTemplate;
