import { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalHeader } from '../components/TerminalHeader';
import { Typewriter } from '../components/Typewriter';
import { Mail, MapPin, Phone, Send, Github, Linkedin, ExternalLink, CheckCircle } from 'lucide-react';
import { CONTACT } from '../data/portfolio';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for Web3Forms API
      // NOTE: Make sure to replace this access_key with your own from web3forms.com
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("access_key", "365d3bf2-3eff-4844-a5cc-ab67429f27d2"); 
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("subject", formData.subject);
      formDataToSubmit.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSubmit
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, message: "Failed to send message. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      color: 'text-[#00D9FF]',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: CONTACT.phoneNo,
      href: `tel:${CONTACT.phoneNo}`,
      color: 'text-[#00FF41]',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: CONTACT.address,
      href: '#',
      color: 'text-[#E1B12C]',
    },
  ];

  // UPDATED: Replaced Twitter with Email
  const socialLinks = [
    {
      name: 'GitHub',
      url: CONTACT.social.github,
      icon: Github,
      color: 'hover:text-[#00FF41] hover:border-[#00FF41]/50',
    },
    {
      name: 'LinkedIn',
      url: CONTACT.social.linkedin,
      icon: Linkedin,
      color: 'hover:text-[#00FF41] hover:border-[#00FF41]/50',
    },
    {
      name: 'Email',
      url: `mailto:${CONTACT.email}`,
      icon: Mail,
      color: 'hover:text-[#00FF41] hover:border-[#00FF41]/50',
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Terminal Header */}
      <TerminalHeader
        command="ping contact.server"
        description="Establishing connection to communication endpoint"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="bg-[#0A0E11] border border-neutral-800 rounded-xl p-8 shadow-[0_0_15px_rgba(0,255,65,0.05)]">
                <div className="mb-8">
                  <h2 className="font-mono text-2xl font-bold text-[#00FF41] mb-4">
                    Send Message
                  </h2>
                  <div className="font-mono text-sm text-[#FF4757]">
                    <span>$</span>
                    <span className="text-[#00FF41] ml-2">cat message_template.txt</span>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle size={64} className="text-[#00FF41] mx-auto mb-4" />
                    <h3 className="font-mono text-xl font-semibold text-[#00FF41] mb-2">
                      Message Sent Successfully!
                    </h3>
                    <Typewriter
                      text="> Message delivered. Expect response within 24 hours."
                      delay={50}
                      className="text-neutral-400 text-sm font-mono"
                    />
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 font-mono">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm text-[#E1B12C] mb-2">
                        <span className="text-[#FF4757] mr-2">&gt;</span>
                        name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-[#000000] border ${errors.name ? 'border-[#FF4757]' : 'border-neutral-800'} rounded px-4 py-3 text-[#C5CDD3] placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#00FF41] focus:border-[#00FF41] transition-colors`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-[#FF4757] text-xs mt-2">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm text-[#E1B12C] mb-2">
                        <span className="text-[#FF4757] mr-2">&gt;</span>
                        email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-[#000000] border ${errors.email ? 'border-[#FF4757]' : 'border-neutral-800'} rounded px-4 py-3 text-[#C5CDD3] placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#00FF41] focus:border-[#00FF41] transition-colors`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-[#FF4757] text-xs mt-2">{errors.email}</p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm text-[#E1B12C] mb-2">
                        <span className="text-[#FF4757] mr-2">&gt;</span>
                        subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full bg-[#000000] border ${errors.subject ? 'border-[#FF4757]' : 'border-neutral-800'} rounded px-4 py-3 text-[#C5CDD3] placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#00FF41] focus:border-[#00FF41] transition-colors`}
                        placeholder="What's this about?"
                      />
                      {errors.subject && (
                        <p className="text-[#FF4757] text-xs mt-2">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm text-[#E1B12C] mb-2">
                        <span className="text-[#FF4757] mr-2">&gt;</span>
                        message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full bg-[#000000] border ${errors.message ? 'border-[#FF4757]' : 'border-neutral-800'} rounded px-4 py-3 text-[#C5CDD3] placeholder-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#00FF41] focus:border-[#00FF41] transition-colors resize-none`}
                        placeholder="Tell me about your project or inquiry..."
                      />
                      {errors.message && (
                        <p className="text-[#FF4757] text-xs mt-2">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded uppercase tracking-wider font-bold text-sm transition-all duration-200 ${
                        isSubmitting
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-[#00FF41] text-black hover:bg-[#00CC33] shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>SENDING...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Send size={18} />
                          <span>[ SEND MESSAGE ]</span>
                        </div>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              {/* Contact Methods */}
              <div className="bg-[#0A0E11] border border-neutral-800 rounded-xl p-6">
                <h3 className="font-mono text-lg font-bold text-[#00FF41] mb-6">
                  &gt; CONTACT_METHODS
                </h3>
                <div className="space-y-4">
                  {contactMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div key={method.label} className="flex items-center space-x-4">
                        <div className={`p-3 bg-[#000000] border border-neutral-800 rounded ${method.color}`}>
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <div className="font-mono font-bold text-[#C5CDD3] text-sm">{method.label}</div>
                          <div className="text-sm text-neutral-500 font-mono">{method.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-[#0A0E11] border border-neutral-800 rounded-xl p-6">
                <h3 className="font-mono text-lg font-bold text-[#00FF41] mb-6">
                  &gt; SYSTEM_STATUS
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
                    <span className="font-mono text-sm text-[#C5CDD3] font-bold">Available for new projects</span>
                  </div>
                  <div className="text-sm text-neutral-500 font-mono space-y-2 border-t border-neutral-800 pt-4">
                    <div className="flex justify-between">
                      <span>Response time:</span>
                      <span className="text-[#00FF41]">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time zone:</span>
                      <span className="text-[#00FF41]">IST (UTC+5:30)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-[#0A0E11] border border-neutral-800 rounded-xl p-6">
                <h3 className="font-mono text-lg font-bold text-[#00FF41] mb-6">
                  &gt; CONNECT_WITH_ME
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center p-4 bg-[#000000] border border-neutral-800 rounded text-neutral-500 ${link.color} transition-all duration-200 hover:scale-105`}
                      >
                        <IconComponent size={24} className="mb-2" />
                        <span className="text-xs font-mono font-bold">{link.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terminal-style footer message */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0A0E11]/80 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#000000] border border-[#00FF41]/20 rounded-xl p-8 font-mono shadow-[0_0_30px_rgba(0,255,65,0.05)]"
          >
            <div className="text-[#FF4757] mb-4 font-bold">
              $ echo "Thank you for visiting!"
            </div>
            <div className="space-y-2 text-[#C5CDD3]">
              <p>I'm always interested in discussing new opportunities and challenging projects.</p>
              <p className="text-[#00FF41] font-bold">
                Let's build something amazing together.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-sm text-neutral-500">
              <div className="flex items-center justify-center space-x-2">
                <ExternalLink size={16} />
                <span>Connection established. Awaiting your message...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};