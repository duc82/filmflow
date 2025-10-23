import Image from "next/image";
import bgLight from "../assets/bg-light.png";
import bgDark from "../assets/bg-dark.png";

export default function BgDecoration() {
  return (
    <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
      <div className="w-432 flex-none flex justify-end">
        <Image
          src={bgDark}
          alt="Background Dark"
          className="w-360 flex-none max-w-none hidden dark:block"
          loading="eager"
        />
        <Image
          src={bgLight}
          alt="Background Light"
          className="w-287 flex-none max-w-none dark:hidden"
          loading="eager"
        />
      </div>
    </div>
  );
}
