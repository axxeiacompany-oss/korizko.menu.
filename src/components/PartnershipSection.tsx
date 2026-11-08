import React from 'react';
import { GraduationCap, Briefcase, Calendar, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PartnershipSectionProps {
  onOpenFlyer: (type: 'marmitas' | 'combos') => void;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onOpenFlyer }) => {
  const { storePhone } = useCart();
  const cleanPhone = storePhone.replace(/[^0-9]/g, '');

  const partnershipMessage = encodeURIComponent(
    'Olá KORIZKO! Gostaria de consultar valores e condições especiais para combos de refeições (Semanal / Mensal) para estudantes / empresas.'
  );

  return (
    <section className="py-12 bg-gradient-to-b from-[#0b0e14] via-[#101622] to-[#0b0e14] border-t border-b border-amber-500/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Planos Corporativos & Universitários</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-100">
            Parcerias & Condições Excepcionais
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Garante suas refeições com praticidade, pontualidade e economia para sua rotina de estudos ou trabalho.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Card 1: Faculdades & Repúblicas */}
          <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800/80 hover:border-amber-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-serif">
              Faculdades & Repúblicas
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Atendimento especial para estudantes (Medicina, Odontologia, etc.). Entregas no horário certo com comida caseira, farta e saborosa.
            </p>
          </div>

          {/* Card 2: Empresas & Escritórios */}
          <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800/80 hover:border-amber-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-serif">
              Empresas & Hotéis
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Parcerias para frotas, oficinas, empresas de broker e hotéis. Faturamento corporativo e entrega programada para sua equipe.
            </p>
          </div>

          {/* Card 3: Planos Semanais e Mensais */}
          <div className="p-6 rounded-2xl bg-[#141b27] border border-slate-800/80 hover:border-amber-500/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-serif">
              Semanal, Quinzenal e Mensal
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Descontos progressivos na contratação de planos recorrentes. Não se preocupe em cozinhar durante o mês inteiro.
            </p>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#162030] to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-amber-300">
              Deseja fechar um pacote corporativo ou plano para sua república?
            </h4>
            <p className="text-xs text-slate-400">
              Fale diretamente com nossa administração pelo WhatsApp e receba a tabela especial de mensalistas.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${cleanPhone}?text=${partnershipMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Valores</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
