import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { label: "Home" },
    { label: "Explore" },
    { label: "Notifications" },
    { label: "Messages" },
    { label: "Bookmarks" },
    { label: "Trending" },
    { label: "Profile" },
    { label: "Settings" },
  ];
  return (
    <div className="min-h-screen flex w-full">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 shadow-lg lg:hidden hover:bg-slate-700 transition-colors text-white"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-950 shadow-2xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-xl font-bold text-white">App Builder</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{item.label}</span>
                </div>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">John Doe</p>
                <p className="text-xs text-slate-400">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 overflow-x-hidden">
        <div className="p-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white mb-4">Solution 1:</h1>
            <p className="text-slate-300 mb-8">
              Based on your requirements, here's what we've created.
            </p>
            <></>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Sidebar;
