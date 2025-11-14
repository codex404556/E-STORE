import BottomFooter from "./BottomFooter";
import Container from "./Container";
import Logo from "./Logo";
import TopFooter from "./TopFooter";

const Footer = () => {
  return (
    <footer className="py-10">
      <Container>
        <TopFooter />
        <BottomFooter />
        <div className="flex justify-center py-4 items-center border-t text-center text-sm text-gray-600 mt-5 bg-gray-50">
          <div className="felx items-center">
            © {new Date().getFullYear()} <Logo className="text-sm" />. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
