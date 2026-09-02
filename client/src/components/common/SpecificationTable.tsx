import React from 'react';
import { ProductSpecs } from '../../types';
import { ShieldCheck, CheckCheck } from 'lucide-react';

interface SpecificationTableProps {
  specs: ProductSpecs;
  compliance?: string[];
  partUsed?: string;
  extractionSolvent?: string;
}

export const SpecificationTable: React.FC<SpecificationTableProps> = ({ 
  specs, 
  compliance = [], 
  partUsed, 
  extractionSolvent 
}) => {
  // Build dynamic parameter list, only showing fields that have actual values
  const allParams = [
    { label: 'Standardized Assay Target', value: specs.assay, standard: 'Reverse-Phase HPLC / UV-Vis', isCore: true },
    { label: 'Active Phytochemical Markers', value: specs.activeMarker, standard: 'CAMAG HPTLC Chemical Fingerprinting', isCore: true },
    { label: 'Plant Part Sourced', value: partUsed, standard: 'Botanical Voucher Authentication' },
    { label: 'Extraction Solvent Ratio', value: extractionSolvent, standard: 'USP / Ph. Eur. Hydro-Ethanolic' },
    { label: 'Extraction Native Ratio', value: specs.extractionRatio, standard: 'Validated Kinetic SOP' },
    { label: 'Physical Appearance & Color', value: specs.appearance, standard: 'Organoleptic & Visual Inspection' },
    { label: 'Particle Mesh Sizing', value: specs.meshSize, standard: 'USP <786> Calibrated Sieve Analysis' },
    { label: 'Solubility & Dispersibility', value: specs.solubility, standard: 'Ph. Eur. Dissolution Monograph' },
    { label: 'Loss on Drying (Moisture Content)', value: specs.lossOnDrying, standard: 'USP <731> Halogen Moisture Analysis' },
    { label: 'Heavy Metals (Pb, Cd, As, Hg)', value: specs.heavyMetals, standard: 'USP <2232> / Triple-Quad ICP-MS (< 10 ppm)' },
    { label: 'Residual Solvents', value: specs.residualSolvents, standard: 'USP <467> / Ph. Eur. 5.4 Headspace GC-MS' },
    { label: 'Commercial Minimum Order (MOQ)', value: specs.moq, standard: 'Standard Lot Packaging' },
    { label: 'Guaranteed Shelf Life', value: specs.shelfLife, standard: 'ICH Q1A(R2) Accelerated Climatic Testing' },
    { label: 'Storage & Humidity Protocol', value: specs.storage, standard: 'Nitrogen Flushed HDPE / Fiber Barrier' },
  ];

  // Filter out any undefined or empty fields
  const activeParams = allParams.filter(p => Boolean(p.value && p.value.trim()));

  return (
    <div className="card-editorial bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#e5dcce] gap-2">
        <div>
          <div className="text-[10px] font-mono font-bold text-[#c5a059] uppercase tracking-widest">
            PHARMACOPOEIAL RELEASE CRITERIA
          </div>
          <h3 className="text-xl font-serif font-bold text-[#111827]">
            Technical Specification Matrix
          </h3>
        </div>
        <span className="font-mono text-xs text-[#072115] bg-[#f8f4ec] px-3 py-1 border border-[#c5a059]/60 font-semibold self-start sm:self-auto">
          USP / Ph. Eur. Aligned Monograph
        </span>
      </div>

      {/* Dynamic Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#e5dcce] bg-[#f8f4ec] text-[#6b7280] font-mono text-[10px] uppercase tracking-wider">
              <th className="py-3 px-4 w-1/3">Analytical Parameter</th>
              <th className="py-3 px-4 w-1/3">Specification Target</th>
              <th className="py-3 px-4 w-1/3">Validated Test Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0eade]">
            {activeParams.map((p, i) => (
              <tr key={i} className={`hover:bg-[#fdfbf7] transition ${p.isCore ? 'bg-[#faf7f0]/40 font-medium' : ''}`}>
                <td className="py-3.5 px-4 font-semibold text-[#111827]">
                  {p.label}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#1d5537]">
                  {p.value}
                </td>
                <td className="py-3.5 px-4 text-[#6b7280] font-mono text-[11px]">
                  {p.standard}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Regulatory Statements */}
      {compliance.length > 0 && (
        <div className="mt-8 pt-6 border-t border-[#e5dcce]">
          <div className="text-[10px] font-mono font-bold text-[#6b7280] uppercase tracking-widest mb-3">
            Accreditations, Compliance &amp; Regulatory Statements
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {compliance.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f8f4ec] text-[#1d5537] border border-[#c2dfce] text-xs font-mono font-semibold">
                <CheckCheck size={14} className="text-[#1d5537]" />
                <span>{c}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
