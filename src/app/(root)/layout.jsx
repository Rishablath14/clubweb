import Headers from "@/components/header";

export default function RootLayout({ children }) 
{
    return(
    <>
    <Headers/>
    <main className="pt-16">
    {children}
    </main>
    </>
    )
}