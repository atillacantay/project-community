import Header from "@/components/header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main className="flex flex-col flex-1">{children}</main>
      <footer className="bg-gray-800 text-white p-4">Footer</footer>
    </div>
  );
};
