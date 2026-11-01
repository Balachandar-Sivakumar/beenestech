import Image from "next/image";
import fullLogo from "@/public/brand/beenest-logo.png";
import lockup from "@/public/brand/beenest-lockup.png";

// Both images are cut from BeeNest_logo.png (transparent, for dark backgrounds).

/** Horizontal logo (emblem + wordmark) for the header. */
export function BrandLogo() {
  return (
    <Image
      src={lockup}
      alt="BeeNest"
      width={180}
      height={44}
      loading="eager"
      sizes="180px"
      className="h-9 w-auto sm:h-11"
    />
  );
}

/** Full honeycomb logo for the footer. */
export function FullLogo() {
  return <Image src={fullLogo} alt="BeeNest" width={208} height={133} sizes="208px" className="h-auto w-44 sm:w-52" />;
}
