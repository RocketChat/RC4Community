import Image from 'next/image';
function Footer() {
  return (
    <>
      <footer>
        <a className='p-3 d-flex align-content-center justify-content-center text-decoration-none text-black'>
          Powered by{' '}
          <Image
            src='/logo.svg'
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
