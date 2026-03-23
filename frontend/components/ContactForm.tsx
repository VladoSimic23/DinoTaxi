"use client";

import { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    
    // Fallback if API hasn't been implemented yet, we simulate it for UX for now
    // We will build the route right after this component
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
      
      // Reset status message after some time
      setTimeout(() => {
        if (status !== 'idle') setStatus('idle');
      }, 5000);
    }
  };

  return (
    <section className="py-24 bg-neutral-950 border-t border-white/5" id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 mb-6">
            <Mail className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Send Us a Message
          </h2>
          <p className="text-lg text-neutral-400">
            Have a specific request or need a custom transfer? Fill out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-neutral-900 p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10 max-w-2xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-300 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="route" className="block text-sm font-semibold text-neutral-300 mb-2">Transfer Route / Service</label>
            <input 
              type="text" 
              id="route" 
              name="route" 
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-colors"
              placeholder="e.g. Airport to Old Town"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-semibold text-neutral-300 mb-2">Your Message or Inquiry</label>
            <textarea 
              id="message" 
              name="message" 
              rows={4} 
              required 
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-colors resize-none"
              placeholder="Tell us about your needs, number of passengers, luggage..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Your message has been sent successfully. We will reply soon!
            </div>
          )}
          
          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="w-5 h-5" />
              Failed to send message. Please try WhatsApp or direct email instead.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}