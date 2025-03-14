import Image from "next/image";
import bgLight from "../assets/bg-light.png";
import bgDark from "../assets/bg-dark.png";

export default function BgDecoration() {
  return (
    <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
      <div className="w-[108rem] flex-none flex justify-end">
        <picture>
          <Image
            src={bgLight}
            alt="Background Light"
            className="w-[71.75rem] flex-none max-w-none dark:hidden"
          />
        </picture>
        <picture>
          <Image
            src={bgDark}
            alt="Background Dark"
            className="w-[90rem] flex-none max-w-none hidden dark:block"
          />
        </picture>
      </div>
    </div>
  );
}
