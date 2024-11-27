import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center p-12 bg-black">
    <h1 className="text-2xl md:text-4xl text-white p-5 font-bold flex">Car Dealer App</h1>
    <Image src={"/logo.png"} alt="logo" className="w-16 h-16" width={20} height={20} quality={100}/>
    </div>
  );
};

export default Header; 