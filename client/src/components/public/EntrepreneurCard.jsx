import React from 'react';
import { MapPin, Quote, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const EntrepreneurCard = ({ entrepreneur }) => {
  const { t, language } = useLanguage();

  if (!entrepreneur) return null;

  const name = entrepreneur.name;
  const location = entrepreneur.location;
  const businessName = t(entrepreneur.businessName, '');
  const story = t(entrepreneur.story, '');
  const quote = t(entrepreneur.quote, '');

  return (
    <div className="rounded-3xl bg-white border border-brand-border p-6 sm:p-8 shadow-soft flex flex-col justify-between hover:shadow-soft-lg transition-all duration-300">
      <div>
        <div className="flex items-center gap-4 mb-5">
          {entrepreneur.photo ? (
            <img
              src={entrepreneur.photo}
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold/40 shadow-sm shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-brand-sand border-2 border-brand-gold/40 flex items-center justify-center text-brand-forest font-serif font-bold text-xl shrink-0">
              {name.charAt(0)}
            </div>
          )}

          <div>
            <h4 className="font-serif text-lg font-bold text-brand-charcoal">
              {name}
            </h4>
            {businessName && (
              <p className="text-xs font-semibold text-brand-forest">
                {businessName}
              </p>
            )}
            <p className="text-xs text-brand-stone flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-brand-gold-dark" />
              <span>{location}</span>
            </p>
          </div>
        </div>

        {/* Story */}
        <p className="text-sm text-brand-stone leading-relaxed mb-5">
          {story}
        </p>
      </div>

      {/* Quote */}
      {quote && (
        <div className="pt-4 border-t border-brand-border/60 relative pl-6 italic text-xs text-brand-charcoal/80 font-serif">
          <Quote className="w-4 h-4 text-brand-gold absolute left-0 top-4 -scale-x-100 opacity-60" />
          "{quote}"
        </div>
      )}
    </div>
  );
};

export default EntrepreneurCard;
