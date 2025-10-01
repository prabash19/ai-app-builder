interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-[2000px] mx-auto flex justify-center w-full">
      {children}
    </div>
  );
}
export default Layout;
