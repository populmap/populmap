import style from "@emotion/styled";

const Footer = style.footer`
  font-weight: 400;
  font-size: 0.5rem;
  position: fixed;
  top: 95%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0%);
`;

const FooterTemplate = (): JSX.Element => {
  const date = new Date();
  return (
    <Footer>
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
    </Footer>
  );
};

export default FooterTemplate;
