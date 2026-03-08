import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="md:w-[85%] w-full space-y-16 py-12">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-bexoni">
            Contact Fusion Limited
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Speak with our wellhead solutions team about VETCO GRAY equipment supply, installation support,
            maintenance planning, workover needs, or subsea project requirements.
          </p>
        </section>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            {submitted ? (
              <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-border text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-3">Message Sent</h2>
                <p className="text-muted-foreground mb-8">
                  Thank you for contacting Fusion Limited. A member of the wellhead solutions team will review your
                  request and respond as soon as possible.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
              </Card>
            ) : (
              <Card className="p-8 md:p-10 bg-card/80 backdrop-blur-sm border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-bexoni/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-bexoni/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                    >
                      <SelectTrigger className="bg-secondary/50 border-border text-foreground h-12">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="supply">Equipment Supply</SelectItem>
                        <SelectItem value="installation">Installation & Running Services</SelectItem>
                        <SelectItem value="maintenance">Maintenance & Workover</SelectItem>
                        <SelectItem value="subsea">Subsea Support</SelectItem>
                        <SelectItem value="emergency">Critical Operations Support</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your wellhead requirement, project environment, or support need..."
                      className="w-full px-4 py-3 bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-bexoni/50 transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto px-8">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-bexoni/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-bexoni" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a href="mailto:info@thefusionlimited.com" className="text-muted-foreground hover:text-foreground transition-colors">
                      info@thefusionlimited.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-bexoni/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-bexoni" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <a href="tel:+2348028271207" className="text-muted-foreground hover:text-foreground transition-colors">
                      +234 (0) 802 827 1207
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-bexoni/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-bexoni" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      7A Chief Atako Estate, Old GRA, Port Harcourt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="text-sm font-semibold text-foreground mb-3">Response Time</h3>
              <p className="text-sm text-muted-foreground">
                General project enquiries are reviewed by our team as quickly as possible. For urgent operational
                matters, please contact us directly by phone.
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="text-sm font-semibold text-foreground mb-3">Support Availability</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between gap-4">
                  <span>General Enquiries</span>
                  <span className="text-foreground text-right">Email or phone</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Project Discussions</span>
                  <span className="text-foreground text-right">Scheduled with the team</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Critical Operations</span>
                  <span className="text-foreground text-right">24/7 support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
