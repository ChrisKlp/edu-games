import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/math-games_logo_dark.png";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Math games logo" width={150} height={0} />
    </Link>
  );
}
