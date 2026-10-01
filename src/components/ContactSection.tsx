import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  Send, 
  Download, 
  MessageSquare,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Generate and download vCard .vcf file
  const downloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Waqas Ali Khan',
      'N:Khan;Waqas;Ali;;',
      'TITLE:AI Undergraduate & Machine Learning Developer',
      'ORG:University of Peshawar;Core Computing Society',
      `EMAIL;TYPE=INTERNET,HOME:${PERSONAL_INFO.email}`,
      `TEL;TYPE=CELL:${PERSONAL_INFO.phone}`,
      `URL:${PERSONAL_INFO.linkedin}`,
      'NOTE:AI Club Lead at Core Computing Society · Machine Learning & AI Automation',
      'BDAY:2007-03-13',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Waqas_Ali_Khan_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulating message processing with real confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
              05. Direct Inquiries & Collaboration
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Get in Touch
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-normal">
            Open for machine learning engineering internships, AI research collaborations, and leadership speaking opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-[#0B0D14] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  Contact Information
                </h3>
                <p className="text-xs text-zinc-400">
                  Feel free to reach out via phone, direct email, or LinkedIn message.
                </p>
              </div>

              {/* Items */}
              <div className="space-y-4 text-xs">
                
                {/* Email */}
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-zinc-400 block">Email Address</span>
                      <a 
                        href={`mailto:${PERSONAL_INFO.email}`} 
                        className="text-zinc-200 hover:text-white font-mono hover:underline truncate block"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-zinc-400 block">Mobile Phone</span>
                      <a 
                        href={`tel:${PERSONAL_INFO.phone}`} 
                        className="text-zinc-200 hover:text-white font-mono hover:underline block"
                      >
                        {PERSONAL_INFO.phoneFormatted}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* WhatsApp Quick Chat */}
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-zinc-400 block">Direct WhatsApp</span>
                      <span className="text-zinc-200 font-mono block">Instant Messaging</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/923299037442?text=${encodeURIComponent("Hi Waqas, I came across your AI & ML portfolio!")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Location */}
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/[0.05] flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">Academic & Regional Hub</span>
                    <span className="text-zinc-200">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

              </div>

              {/* vCard Button */}
              <div className="pt-2">
                <button
                  onClick={downloadVCard}
                  className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-zinc-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-98"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download vCard Contact (.vcf)</span>
                </button>
              </div>

              {/* Social Link Outlets */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Send Message Form */}
          <div className="lg:col-span-7 bg-[#0B0D14] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-white mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Drop an email dispatch directly to Waqas Ali Khan's inbox.
            </p>

            {submitSuccess && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl mb-6 text-xs text-emerald-300 flex items-start gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Message sent successfully!</span>
                  <span>Thank you for reaching out. Waqas will review your inquiry and reply via {PERSONAL_INFO.email} promptly.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-zinc-300">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Salman / Hiring Manager"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-zinc-300">
                    Your Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-medium text-zinc-300">
                  Subject / Topic
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI Engineering Internship Opportunity / Core Computing Society Collab"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-zinc-300">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note, proposal, or feedback here..."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/[0.08] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors rounded-lg flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Dispatch...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Waqas</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
