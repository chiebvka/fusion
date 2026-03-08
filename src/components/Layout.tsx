import { Outlet } from "react-router"
import Header from "@/components/header"
import { Footer } from "@/components/footer"

export default function Layout() {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
