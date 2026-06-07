import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Inquiry', message: '' });
    }, 3000);
  };

  const faqs = [
    {
      q: 'How does UniMarket verify its community members?',
      a: 'Users must register with an official institution or domain email (like @iitb.ac.in). Additionally, users must upload a copy of their student or resident ID card which is reviewed by our administration before full listing privileges are granted.'
    },
    {
      q: 'Is there a product exchange or swapping option?',
      a: 'No. To ensure simplicity, security, and clear financial transactions, UniMarket does not support swaps, item exchange, or barter structures. You can only buy, sell, or rent items, or offer community-based services.'
    },
    {
      q: 'How do payments work on UniMarket?',
      a: 'Transactions are conducted peer-to-peer. While you can trigger bookings and purchases through the platform to track them in your dashboard, physical item handover and payments are done directly on campus or in neighborhoods via Cash, UPI, or local bank transfer. This avoids intermediate processing fees.'
    },
    {
      q: 'How do I handle shipping or delivery?',
      a: 'UniMarket is built for local communities, meaning sellers and buyers are typically within walking distance (e.g. in the same hostel block or campus). Deliveries are arranged in-person by meeting at safe public locations on campus like libraries, student centers, or main gates.'
    }
  ];

  return (
    <div className="space-y-12 pb-16 animate-fadeInUp">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold font-display text-slate-800 tracking-tight">Contact & Support Hub</h1>
        <p className="text-slate-500 text-sm">Have issues, questions, or suggestions? Reach out to our campus ambassadors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Support Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-premium space-y-6">
          <div className="border-b border-slate-100 pb-2">
            <h2 className="text-lg font-bold font-display text-slate-800">Send a Message</h2>
            <p className="text-xs text-slate-400">Our support coordinators will respond to your registered email in 24 hours.</p>
          </div>

          {submitted ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center space-y-2 animate-fadeInUp">
              <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
              <h4 className="font-bold text-green-800">Message Received!</h4>
              <p className="text-xs text-green-600">Thank you for writing. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="student@campus.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Inquiry Type</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:border-primary focus:outline-none text-xs text-slate-800 cursor-pointer"
                >
                  <option value="Inquiry">General Inquiry</option>
                  <option value="Report">Report a Listing</option>
                  <option value="Ambassador">Apply for Campus Ambassador</option>
                  <option value="Feature">Feature Request</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Your Message</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Detail your question or report..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-primary rounded-xl focus:outline-none text-xs text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Support Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Support contacts info & FAQ */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick contacts */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium space-y-4">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider font-display border-b border-slate-100 pb-2">Direct Contacts</h3>
            
            <div className="space-y-3.5">
              <div className="flex gap-3 items-center text-xs text-slate-600">
                <Mail className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>support@unimarket.org.in</span>
              </div>
              <div className="flex gap-3 items-center text-xs text-slate-600">
                <Phone className="w-4.5 h-4.5 text-secondary shrink-0" />
                <span>+91 1800 200 4567 (10 AM - 6 PM)</span>
              </div>
              <div className="flex gap-3 items-center text-xs text-slate-600">
                <MapPin className="w-4.5 h-4.5 text-accent shrink-0" />
                <span>Campus Coordinator, Hostel 4 Ground Floor Office, IITB</span>
              </div>
            </div>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-premium space-y-4">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider font-display border-b border-slate-100 pb-2">Safety FAQs</h3>
            
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 transition text-left"
                  >
                    <span className="font-bold text-xs text-slate-700">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="p-3.5 bg-white text-xs text-slate-500 leading-relaxed border-t border-slate-100 animate-fadeInUp">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
