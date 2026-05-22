import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"

const faqs = [
  {
    question: "How do I adopt a pet?",
    answer:
      "Browse pets, open a pet profile, then submit an adoption application from the pet page or the request modal."
  },
  {
    question: "What are the adoption fees?",
    answer:
      "Adoption fees vary by shelter and pet type. Check the shelter profile or contact support for exact pricing."
  },
  {
    question: "How do I donate?",
    answer:
      "Visit the shelter website or contact the shelter directly by email or phone to learn how to donate."
  },
  {
    question: "Can I volunteer?",
    answer:
      "Yes. Contact the shelter to ask about volunteer programs and available shifts."
  }
]

export default function Help({ user, setUser, onOpenDrawer }) {
  const [search, setSearch] = useState("")
  const [supportForm, setSupportForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: ""
  })
  const [reportForm, setReportForm] = useState({
    issue: "",
    details: ""
  })
  const [chatMessage, setChatMessage] = useState("")
  const [supportSent, setSupportSent] = useState(false)
  const [reportSent, setReportSent] = useState(false)
  const [chatSent, setChatSent] = useState(false)

  const handleSupportChange = (e) => {
    setSupportForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleReportChange = (e) => {
    setReportForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSupportSubmit = (e) => {
    e.preventDefault()
    setSupportSent(true)
  }

  const handleReportSubmit = (e) => {
    e.preventDefault()
    setReportSent(true)
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    setChatSent(true)
  }

  return (
    <>
      <Header
        user={user}
        search={search}
        setSearch={setSearch}
        onOpenDrawer={onOpenDrawer}
      />

      <div className="page-header">
        <div>
          <h2>❓ Help Center</h2>
          <p>Everything you need to adopt, donate, volunteer, or get support.</p>
        </div>

        <Link to="/" className="btn btn-outline">
          Back to Pets
        </Link>
      </div>

      <div className="help-grid">
        <section className="help-card">
          <h3>Common Functions</h3>
          <ul>
            <li>Search pets by name, breed, species, or shelter.</li>
            <li>Filter pets using the filter bar.</li>
            <li>Save favorites with the heart icon.</li>
            <li>Submit adoption forms from the pet card or profile.</li>
            <li>Manage your requests in the My Requests page.</li>
          </ul>
        </section>

        <section className="help-card faq-section">
          <h3>FAQ</h3>
          {faqs.map(item => (
            <div key={item.question} className="faq-item">
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="help-card">
          <h3>Contact Support</h3>
          <p>Email: <a href="mailto:support@pawfectadoption.com">support@pawfectadoption.com</a></p>
          <p>Phone: <a href="tel:+639123456789">+63 912 345 6789</a></p>
          <p>Live Chat: send a message below and our support team will follow up.</p>
          <form className="support-form" onSubmit={handleChatSubmit}>
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message for live support..."
              required
            />
            <button type="submit" className="btn btn-primary">
              Send Chat Message
            </button>
          </form>
          {chatSent && <p className="form-success">Support chat message sent!</p>}
        </section>

        <section className="help-card">
          <h3>Website / User Guide</h3>
          <ul>
            <li>Create an account from the login screen.</li>
            <li>Search and filter pets using the top bar and filters.</li>
            <li>Click "Adopt Me" to open the request form.</li>
            <li>Upload documents via the adoption form when requested by the shelter.</li>
          </ul>
        </section>

        <section className="help-card">
          <h3>Emergency Information</h3>
          <p>For lost pets, rescue requests, or urgent shelter concerns, contact the shelter immediately by phone.</p>
          <p>Provide the pet name, location, and any urgent medical details.</p>
        </section>

        <section className="help-card report-card">
          <h3>Report Problems</h3>
          <form onSubmit={handleReportSubmit} className="support-form">
            <input
              name="issue"
              value={reportForm.issue}
              onChange={handleReportChange}
              placeholder="Issue summary"
              required
            />
            <textarea
              name="details"
              value={reportForm.details}
              onChange={handleReportChange}
              placeholder="Details about the problem"
              required
            />
            <button type="submit" className="btn btn-primary">
              Report Issue
            </button>
          </form>
          {reportSent && <p className="form-success">Thank you! Your report was submitted.</p>}
        </section>

        <section className="help-card">
          <h3>Accessibility Help</h3>
          <ul>
            <li>Use browser zoom controls for font resizing.</li>
            <li>Screen reader friendly layout with clear section headings.</li>
            <li>Contact support if you need language support or additional accessibility help.</li>
          </ul>
        </section>
      </div>

      <section className="support-card">
        <h3>Need Immediate Assistance?</h3>
        <p>
          Email support or call the shelter directly if you need urgent help with adoption, account login, or site accessibility.
        </p>
        <form className="support-form" onSubmit={handleSupportSubmit}>
          <div className="form-row">
            <input name="name" value={supportForm.name} onChange={handleSupportChange} placeholder="Your name" required />
            <input name="email" value={supportForm.email} onChange={handleSupportChange} placeholder="Your email" required />
          </div>
          <input name="subject" value={supportForm.subject} onChange={handleSupportChange} placeholder="Subject" required />
          <textarea
            name="message"
            value={supportForm.message}
            onChange={handleSupportChange}
            placeholder="Describe how we can help..."
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit Support Request
          </button>
          {supportSent && <p className="form-success">Support request submitted successfully.</p>}
        </form>
      </section>
    </>
  )
}
