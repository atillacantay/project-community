import { Stack } from "@/components/common/stack";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Stack className="min-h-screen">
      <header className="bg-primary p-4 text-white">Header</header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white p-4">Footer</footer>
    </Stack>
  );
};
