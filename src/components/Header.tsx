import { useState } from "react";
import Logo from "../assets/images/logo.png";
import ListIcon from "../assets/icons/list.svg";
import CardIcon from "../assets/icons/card.svg";
import Navbar from "./Navbar";

interface HeaderProps {
  handleIconSwitch: () => void;
  handleSearch: (term: string) => void;
}

function Header({ handleIconSwitch, handleSearch }: HeaderProps) {
  const [switchIcon, setSwitchIcon] = useState(ListIcon);

  const handleButtonClick = () => {
    setSwitchIcon((prevIcon) => (prevIcon === ListIcon ? CardIcon : ListIcon));
    handleIconSwitch();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  return (
    <>
      <div className="flex bg-yellow-a h-24 w-full items-center justify-evenly">
        <a href="./">
          <img src={Logo} alt="로고이미지" className="w-36 h-20" />
        </a>
        <input
          type="text"
          placeholder="검색어를 넣어주세요"
          className="w-1/2 h-16 rounded-xl pl-2"
          onChange={handleSearchChange}
        />
        <button onClick={handleButtonClick}>
          <img src={switchIcon} alt="아이콘" className="w-12 h-12" />
        </button>
      </div>
      <Navbar />
    </>
  );
}

export default Header;
