import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Save, Loader2, Check } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, loading } = useSettings();
  const [saved, setSaved] = useState(false);

  const [companyName, setCompanyName] = useState(settings.companyName || 'YAMI NATURALS');
  const [tagline, setTagline] = useState(settings.tagline || 'Nature, Standardized. Science, Delivered.');
  const [contactEmail, setContactEmail] = useState(settings.contactEmail || 'contact@yaminaturals.com');
  const [contactPhone, setContactPhone] = useState(settings.contactPhone || '+91 8780664057');
  const [hqAddress, setHqAddress] = useState(settings.hqAddress || 'Corporate HQ, YAMI NATURALS Tower, Industrial Gateway, Mumbai 400001, India');
  const [facilityAddress, setFacilityAddress] = useState(settings.facilityAddress || 'Industrial Extraction Zone, ISO 22000:2018 & cGMP Facility, India');
  const [defaultMoq, setDefaultMoq] = useState(settings.defaultMoq || '25 kg');

  useEffect(() => {
    if (settings) {
      if (settings.companyName) setCompanyName(settings.companyName);
      if (settings.tagline) setTagline(settings.tagline);
      if (settings.contactEmail) setContactEmail(settings.contactEmail);
      if (settings.contactPhone) setContactPhone(settings.contactPhone);
      if (settings.hqAddress) setHqAddress(settings.hqAddress);
      if (settings.facilityAddress) setFacilityAddress(settings.facilityAddress);
      if (settings.defaultMoq) setDefaultMoq(settings.defaultMoq);
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);

    const success = await updateSettings({
      companyName,
      tagline,
      contactEmail,
      contactPhone,
      hqAddress,
      facilityAddress,
      defaultMoq
    });

    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-emerald-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform &amp; Company Settings</h1>
          <p className="text-xs text-slate-600">Configure global B2B metadata, liaison emails, and facility addresses.</p>
        </div>
      </div>

      <div className="card-premium bg-white p-8 shadow-sm">
        {saved && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 mb-6">
            <Check size={16} />
            <span>Company settings saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input 
                type="text" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                placeholder="e.g. YAMI NATURALS"
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Brand Tagline</label>
              <input 
                type="text" 
                value={tagline} 
                onChange={(e) => setTagline(e.target.value)} 
                placeholder="e.g. Nature, Standardized. Science, Delivered."
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Corporate Email</label>
              <input 
                type="email" 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                placeholder="e.g. contact@yaminaturals.com"
                className="form-input" 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Direct B2B Phone</label>
              <input 
                type="text" 
                value={contactPhone} 
                onChange={(e) => setContactPhone(e.target.value)} 
                placeholder="e.g. +91 (0) 22 8902 4400"
                className="form-input" 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Corporate HQ Address</label>
            <input 
              type="text" 
              value={hqAddress} 
              onChange={(e) => setHqAddress(e.target.value)} 
              placeholder="e.g. YAMI NATURALS Tower, Plot 42-A, Industrial Gateway, Mumbai 400001, India"
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Facility / Manufacturing Address</label>
            <input 
              type="text" 
              value={facilityAddress} 
              onChange={(e) => setFacilityAddress(e.target.value)} 
              placeholder="e.g. Advanced Extraction Zone, ISO 22000:2018 & cGMP Certified Facility, India"
              className="form-input" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Standard Commercial MOQ</label>
            <input 
              type="text" 
              value={defaultMoq} 
              onChange={(e) => setDefaultMoq(e.target.value)} 
              placeholder="e.g. 25 kg (1 Standard HDPE Drum)"
              className="form-input" 
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button type="submit" className="btn btn-primary">
              <Save size={14} />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
