import heart from "../assets/heart.svg";

export function Footer() {
  return(
    <section className="footer-con">
      <a href="https://github.com/mynameisjonelledev/vibe-matcher"><p>Made with <img src={heart} className="footer-heart"/> by Jonelle</p></a>
    </section>
  );
}