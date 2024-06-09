import Image from "next/image";

function Footer() {
  return (
    <footer className="flex flex-col p-6 border-t-1">
      <p className="text-[20px] font-bold">
        Memenuhi Panggilan Allah bersama Sahabat Nabawi
      </p>
      <Image
        src="https://lp.waroengslide.com/wp-content/uploads/2023/05/Slide4.jpg"
        alt="logo"
        width={180}
        height={180}
        className="object-contain"
      />
    </footer>
  );
}

export default Footer;
