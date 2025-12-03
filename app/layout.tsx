import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">{children}
        <Toaster  />
      </body>
    </html>
  );
};

export default RootLayout;