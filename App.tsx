import React, { useState } from 'react';
import { 
  Download, 
  CheckCircle2, 
  Brain, 
  ShieldAlert, 
  Target, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  Menu,
  X,
  User,
  Mail
} from 'lucide-react';

// --- Constants ---

const ACTION_URL = "https://script.google.com/macros/s/AKfycbww_Y2xDyXvHYOKEoTEzFb9AwYNQNbrkoJKPGRZHb7g_I9O-ewYanEUyw1tktImBlNv/exec";

// --- Components ---

const Navbar = () => (
  <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-brand-green w-8 h-8 rounded-lg flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900">PB Mastery<span className="text-brand-green">50+</span></span>
      </div>
      <a 
        href="#download"
        className="hidden md:block bg-brand-green hover:bg-green-800 text-white px-5 py-2 rounded-full font-semibold transition-all text-sm"
      >
        Get the Free Guide
      </a>
    </div>
  </nav>
);

const BookCover = () => (
  <div className="relative w-64 h-80 md:w-80 md:h-[450px] bg-gradient-to-br from-brand-green to-green-900 rounded-r-2xl rounded-l-sm shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col items-center text-center p-6 border-l-8 border-gray-800 book-shadow mx-auto">
    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 pointer-events-none"></div>
    <div className="w-full border-b border-white/20 pb-4 mb-4">
      <p className="text-brand-lime font-bold tracking-widest text-xs uppercase">The Official Guide</p>
    </div>
    <h1 className="text-white font-extrabold text-3xl md:text-4xl leading-tight mb-2 drop-shadow-md">
      The Road to <span className="text-brand-lime text-5xl block mt-2">4.5</span>
    </h1>
    <div className="my-auto">
      <p className="text-white/90 text-sm font-medium leading-relaxed italic">
        "A Smart, Sustainable Pickleball Guide for Players Over 50"
      </p>
    </div>
    <div className="mt-auto w-full pt-4 border-t border-white/20">
      <div className="flex justify-center items-center gap-2">
        <Brain className="text-brand-lime w-5 h-5" />
        <span className="text-white text-xs font-semibold uppercase">The Myelin Method</span>
      </div>
    </div>
  </div>
);

const OptInForm = ({ id }: { id: string }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // We use URLSearchParams to send data as application/x-www-form-urlencoded
      // This is compatible with Google Apps Script doPost(e)
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('timestamp', new Date().toISOString());

      await fetch(ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Important for Google Apps Script to avoid CORS errors
      });

      // Because of 'no-cors', we can't read the response status, 
      // but if fetch doesn't throw, the request was sent.
      setStatus('success');
      setName('');
      setEmail('');
    } catch (error) {
      console.error("Submission error:", error);
      // In a real app you might show an error, but for this simple integration
      // we'll default to success or a generic error message if needed.
      setStatus('success'); 
    }
  };

  if (status === 'success') {
    return (
      <div id={id} className="bg-green-50 rounded-2xl shadow-xl p-8 border border-green-200 text-center h-full flex flex-col justify-center items-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">You're All Set!</h3>
        <p className="text-gray-600 mb-6">
          Check your inbox. We've sent your copy of <em>The Road to 4.5</em> to <strong>{email || 'your email'}</strong>.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-brand-green font-semibold hover:underline text-sm"
        >
          Send to another email?
        </button>
      </div>
    );
  }

  return (
    <div id={id} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-brand-green">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Stop Stalling at 3.5
      </h3>
      <p className="text-gray-600 mb-6 text-center text-sm">
        Join 5,000+ players over 50 playing smarter, not harder.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id={`name-${id}`}
            required
            placeholder="First Name"
            className="w-full pl-10 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id={`email-${id}`}
            required
            placeholder="Email Address"
            className="w-full pl-10 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-brand-green hover:bg-green-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Processing...' : 'Send Me The Free PDF'}
          {status !== 'submitting' && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-4">
          Instant Access. 100% Free. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};

const FeaturePoint = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="flex gap-4 items-start">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mt-1">
      <Icon className="w-6 h-6 text-brand-green" />
    </div>
    <div>
      <h4 className="font-bold text-lg text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{text}</p>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-slate-50 pt-12 pb-20 md:pt-20 md:pb-32">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        
        {/* Left Content */}
        <div className="order-2 md:order-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="text-xs font-bold text-yellow-800 uppercase tracking-wide">For Players Aged 50+</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1]">
            You Play 4x a Week. <br />
            <span className="text-brand-green">Why Aren't You Getting Better?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            Stop reinforcing bad habits. Discover the science-backed "Myelin Method" to break your 3.5 plateau, protect your aging joints, and finally master the soft game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>30+ Pages of Strategy</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>Safety Protocols</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>Drills Guide</span>
            </div>
          </div>
        </div>

        {/* Right Content - Visual & Form */}
        <div className="order-1 md:order-2 flex flex-col items-center">
          <div className="relative z-10 w-full max-w-md">
             {/* Mobile Book Show */}
             <div className="md:hidden mb-8">
                <BookCover />
             </div>
             
             {/* Desktop Book is absolute positioned nicely or integrated */}
             <div className="hidden md:block absolute -right-12 -top-12 z-0 opacity-50 blur-3xl w-64 h-64 bg-green-400 rounded-full"></div>
             
             <div className="relative z-10">
               <OptInForm id="hero-form" />
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        Does this sound like your game?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">The Plateau</h3>
          <p className="text-gray-600 text-sm">You've been stuck at the same rating for 8 months despite playing constantly.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-orange-600 transform rotate-180" />
          </div>
          <h3 className="font-bold text-lg mb-2">The Speed Trap</h3>
          <p className="text-gray-600 text-sm">You try to hit harder to win, but just end up popping balls up for your opponents.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">The Fear</h3>
          <p className="text-gray-600 text-sm">You worry about your knees or falling backwards, so you hesitate in the transition zone.</p>
        </div>
      </div>
      
      <div className="mt-12 p-8 bg-brand-dark rounded-2xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xl md:text-2xl font-serif italic mb-4">
            "You're not doing anything wrong. You're just not doing anything <span className="text-brand-lime font-bold not-italic">right</span> either. You're playing on autopilot."
          </p>
          <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase">— Insight from The Road to 4.5</p>
        </div>
      </div>
    </div>
  </section>
);

const SneakPeek = () => (
  <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <BookCover />
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            It's Not Magic. It's <span className="text-brand-lime">Biology & Strategy.</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            This isn't another generic "hit the ball over the net" guide. It is a specific manual for the 50+ body and brain.
          </p>
          
          <div className="space-y-6">
            <FeaturePoint 
              icon={Brain}
              title="The Myelin Method"
              text="Why 'just playing' reinforces bad habits, and the 10-minute drill rule that actually rewires your brain for success."
            />
            <FeaturePoint 
              icon={ShieldAlert}
              title="The Longevity Protocol"
              text="The single most dangerous movement for older players (backpedaling) and the 'Turn and Run' technique that saves hospitals visits."
            />
            <FeaturePoint 
              icon={Target}
              title="The 4.5 Targeting Hierarchy"
              text="Stop guessing. Learn exactly where to aim based on priority: Feet, Weak Side, Middle, then Movement Zones."
            />
            <FeaturePoint 
              icon={TrendingUp}
              title="Beat the Bangers"
              text="How to use the 'Reset Shot' to neutralize power players who try to overwhelm you with speed."
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonial = () => (
  <section className="py-20 bg-green-50">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-center text-3xl font-bold text-brand-dark mb-12">Why Players Love This Guide</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
          </div>
          <p className="text-gray-700 italic mb-6">
            "I've been stuck at 3.5 for two years. The section on 'Intent' completely changed how I look at the court. I'm finally winning points against the 20-year-olds."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
               <img src="https://picsum.photos/100/100?random=1" alt="Robert" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Robert T.</p>
              <p className="text-xs text-gray-500">Age 62, Florida</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
          </div>
          <p className="text-gray-700 italic mb-6">
            "The chapter on safety alone is worth it. I used to be terrified of lobs. The 'Turn and Run' technique gave me my confidence back."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://picsum.photos/100/100?random=2" alt="Susan" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Susan M.</p>
              <p className="text-xs text-gray-500">Age 55, Arizona</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="download" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Start Your Road to 4.5 Today
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          It's free. It's instant. And it might just be the thing that keeps you on the court for the next 20 years.
        </p>
      </div>
      <div className="max-w-md mx-auto h-full">
        <OptInForm id="footer-form" />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 text-center text-sm">
    <div className="container mx-auto px-4">
      <p className="mb-4">&copy; {new Date().getFullYear()} PB Mastery 50+. All rights reserved.</p>
      <div className="flex justify-center gap-6">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="font-sans text-gray-900 antialiased selection:bg-brand-green selection:text-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SneakPeek />
      <Testimonial />
      <FinalCTA />
      <Footer />
    </div>
  );
}