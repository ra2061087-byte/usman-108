import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { t } = useLanguage();

  const leaders = [
    { label: t('supervision'), img: 'https://images.unsplash.com/photo-1627933611130-10f5451c3609?q=80&w=200&h=200&auto=format&fit=crop', id: 'leader-1' },
    { label: t('vision'), img: 'https://images.unsplash.com/photo-1574175673062-841f4f9f4a13?q=80&w=200&h=200&auto=format&fit=crop', id: 'leader-2' },
    { label: t('teacher'), img: 'https://images.unsplash.com/photo-1630138210350-f8f4a10729d7?q=80&w=200&h=200&auto=format&fit=crop', id: 'leader-3' }
  ];

  return (
    <header className="relative py-16 px-4 bg-bg overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-arabic text-accent mb-4"
          id="header-bismillah"
        >
          {t('bismillah')}
        </motion.div>
        
        <div className="inline-block relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="geometric-border px-8 md:px-16 py-6 bg-white shadow-2xl relative z-10"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-primary" id="header-institute">
              {t('institute')}
            </h1>
            <p className="text-lg md:text-2xl text-primary-light mt-4 font-medium opacity-80" id="header-address">
              {t('address')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div 
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              className="flex flex-col items-center space-y-4"
              id={leader.id}
            >
              <div className="relative p-1 bg-accent/20 rounded-full">
                <img 
                  src={leader.img} 
                  alt={leader.label}
                  className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-primary shadow-xl object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xl font-bold text-primary border-b-2 border-accent/30 pb-1">
                {leader.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
