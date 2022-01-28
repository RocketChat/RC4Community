import Logo from "../public/logo.svg"
function Footer() {
  return (
    <>
      <footer>
        <a className='p-3 d-flex align-items-center justify-content-center text-decoration-none text-black'>
          <span>Powered by</span>{' '}
          <img
            src={Logo}
            alt='Rocket.Chat Logo'
            width={98}
            height={32}
          />
        </a>
      </footer>
    </>
  );
}

export default Footer;
