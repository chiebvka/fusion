import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "@/components/Layout"
import Home from "@/pages/Home"

import Faqs from "@/pages/Faqs"
import Blog from "@/pages/Blog"
import Tools from "@/pages/Tools"
import Story from "@/pages/Story"
import Contact from "@/pages/Contact"
import About from "./pages/About"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
