import Image from "next/legacy/image";

export default function BrandLogo(props) {
  return (
    <>
        <Image
          src={props.brandLogoSrc}
          title={props.imageTitle}
          alt={props.brandName}
          height={props.height}
          width={props.width}
        />
    </>
  );
}