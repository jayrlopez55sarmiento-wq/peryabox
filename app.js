const { useState, useEffect } = React;
const { 
  ShoppingBag, Menu, X, Box, CheckCircle2, 
  Facebook, Instagram, Star, Globe, Truck, 
  Heart, ArrowRight, ShieldCheck, MapPin 
} = lucide;

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { 
      id: 'snacks', 
      name: 'Crunchy Regional Favorites', 
      items: [
        { id: 1, name: "BongBong's Biscocho", price: 185, region: 'Bacolod', img: 'https://images.unsplash.com/photo-1600100397608-f09074aa882c?q=80&w=600&auto=format&fit=crop', desc: 'Bacolod’s signature twice-baked garlic butter bread.' },
        { id: 2, name: 'Premium Chicharon', price: 220, region: 'Bulacan', img: 'https://images.unsplash.com/photo-1626078297492-b7ca55294561?q=80&w=600&auto=format&fit=crop', desc: 'Extra crispy pork rinds with real backfat-on richness.' },
        { id: 3, name: 'Crispy Barquillos', price: 145, region: 'Iloilo', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop', desc: 'Delicate, thin wafer rolls handmade in Iloilo.' },
        { id: 4, name: 'Muscovado Piaya', price: 160, region: 'Negros', img: 'https://images.unsplash.com/photo-1599490659223-e153c07ea0b4?q=80&w=600&auto=format&fit=crop', desc: 'Flaky flatbread filled with raw, dark muscovado sugar.' }
      ]
    },
    { 
      id: 'cakes', 
      name: 'Heritage Cakes & Buns', 
      items: [
        { id: 6, name: 'Rodillas Yema Cake', price: 450, region: 'Quezon', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop', desc: 'The original fluffy chiffon topped with silky custard.' },
        { id: 7, name: 'Baguio Ensaymada', price: 380, region: 'Benguet', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop', desc: 'Signature soft buns topped with butter and aged cheese.' },
        { id: 8, name: 'Ube Custard Cake', price: 420, region: 'Pampanga', img: 'https://images.unsplash.com/photo-1612198526331-7bc285642e47?q=80&w=600&auto=format&fit=crop', desc: 'Rich purple yam layers with a leche flan surprise.' }
      ]
    }
  ];

  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-amber-600 p-2 rounded-xl"><Box className="text-white w-5 h-5" /></div>
            <span className="text-xl font-black tracking-tighter text-stone-900">PERYA<span className="text-amber-600">BOX</span></span>
          </div>
          <div className="hidden md:flex space-x-8 text-[11px] font-bold uppercase tracking-widest text-stone-500">
            <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-amber-600' : ''}>Home</button>
            <button onClick={() => setActiveTab('shop')} className={activeTab === 'shop' ? 'text-amber-600' : ''}>Shop</button>
          </div>
          <div className="relative cursor-pointer p-2" onClick={() => setActiveTab('shop')}>
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            {cartCount > 0 && <span className="absolute top-0 right-0 bg-amber-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeTab === 'home' && (
        <section className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-[10px] font-bold uppercase tracking-widest mb-8">
            <Heart size={12} className="text-amber-500 fill-amber-500" /> Sourced from Local MSMEs
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-stone-950 mb-8 leading-tight tracking-tighter">
            Authentic <br/><span className="text-amber-600 font-serif italic font-light">Regional Taste.</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto mb-12">Discover hidden gems from provinces across the Philippines, delivered straight to your door.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setActiveTab('shop')} className="px-10 py-5 bg-stone-900 text-white rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-amber-600 transition-all">Start Exploring</button>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {categories.map(cat => (
          <div key={cat.id} className="mb-20">
            <div className="flex items-center gap-4 mb-10 text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
              <span>{cat.name}</span><div className="h-px bg-stone-200 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {cat.items.map(item => (
                <div key={item.id} className="group bg-white rounded-[2rem] border border-stone-100 p-5 transition-all hover:shadow-2xl">
                  <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-stone-50 mb-6">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase"><MapPin size={10} className="inline mr-1"/>{item.region}</div>
                  </div>
                  <h3 className="font-bold text-stone-900 mb-1">{item.name}</h3>
                  <p className="text-[11px] text-stone-400 mb-6 line-clamp-2">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-stone-900">₱{item.price}</span>
                    <button onClick={addToCart} className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"><ShoppingBag size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <span className="text-xl font-black tracking-tighter uppercase">PERYA BOX</span>
            <p className="text-stone-500 text-xs mt-2 font-medium">© 2024 Perya Box Philippines. Support Local.</p>
          </div>
          <div className="flex gap-6">
            <Facebook size={20} className="text-stone-500 hover:text-white cursor-pointer" />
            <Instagram size={20} className="text-stone-500 hover:text-white cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);