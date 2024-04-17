import Header from "@/components/adminHeader";

export default function AdminLayout({ children }) 
{
    return(
    <>
    <Header/>
    <main className="pt-16">
    {children}
    </main>
    </>
    )
}