import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

function Sidebar() {
  const history = [
    "Tailwind CSS: Full Width Element kjasdkjadsn jkasdnkjans kjasdnkjands",
    "Tailwind CSS: Full Width Element kjasdkjadsn jkasdnkjans kjasdnkjands",
    "Tailwind CSS: Full Width Element kjasdkjadsn jkasdnkjans kjasdnkjands",
    "Tailwind CSS: Full Width Element kjasdkjadsn jkasdnkjans kjasdnkjands",
    "Tailwind CSS: Full Width Element kjasdkjadsn jkasdnkjans kjasdnkjands",
    "Tailwind CSS: Full Width Element kjasdkjadsn jkasdnkjans kjasdnkjands",
  ];
  return (
    <div className="bg-black text-white w-1/5 h-screen">
      <div className="w-full h-auto flex justify-between pl-4 pr-4 pt-5">
        <GiHamburgerMenu className="w-4 h-4" />
        <FaSearch className="w-4 h-4" />
      </div>
      <div className="w-full h-auto mt-4 p-4">
        <p className="p-2">Recent</p>
        <ul className="mt-4">
          {history.map((item) => {
            return (
              <li className="truncate p-2 bg-gray-700 rounded-2xl mb-1">
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
