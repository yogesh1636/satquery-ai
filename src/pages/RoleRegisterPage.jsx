import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { User, Mail, Building, GraduationCap, Briefcase, Globe, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { EarthVisual } from '../components/auth/EarthVisual';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { PasswordInput } from '../components/auth/PasswordInput';
import { PasswordRequirements } from '../components/auth/PasswordRequirements';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { getRoleById } from '../config/rolesConfig';
import { setPendingRegistration } from '../utils/auth';

export const RoleRegisterPage = () => {
  const { roleId = 'researcher' } = useParams();
  const navigate = useNavigate();
  const role = getRoleById(roleId);

  // Common Base Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Student Fields
  const [institution, setInstitution] = useState('');
  const [courseProgram, setCourseProgram] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year');

  // Researcher Fields
  const [researchDomain, setResearchDomain] = useState('Remote Sensing & Climate');
  const [orcidId, setOrcidId] = useState('');
  const [publicationUrl, setPublicationUrl] = useState('');

  // GIS Analyst Fields
  const [employer, setEmployer] = useState('');
  const [jobTitle, setJobTitle] = useState('GIS Specialist');
  const [yearsExp, setYearsExp] = useState('3–5 years');
  const [gisTools, setGisTools] = useState(['QGIS', 'ArcGIS']);

  // Organization Fields
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('Government');
  const [officialDomain, setOfficialDomain] = useState('');
  const [adminContact, setAdminContact] = useState('');
  const [teamSize, setTeamSize] = useState('11–50');
  const [intendedUses, setIntendedUses] = useState(['Disaster Response', 'Urban Planning']);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Academic Email Detector helper
  const isAcademicEmail = (emailStr) => {
    return /\.(edu|ac\.[a-z]{2}|edu\.[a-z]{2})$/i.test(emailStr);
  };

  const handleToggleTool = (toolName) => {
    setGisTools(prev =>
      prev.includes(toolName) ? prev.filter(t => t !== toolName) : [...prev, toolName]
    );
  };

  const handleToggleUse = (useName) => {
    setIntendedUses(prev =>
      prev.includes(useName) ? prev.filter(u => u !== useName) : [...prev, useName]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (roleId !== 'organization' && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (roleId === 'organization' && (!orgName.trim() || !adminContact.trim())) {
      setError('Please enter Organization Name and Admin Contact Name.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('Password must satisfy all security requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the Terms & Privacy Policy to continue.');
      return;
    }

    setLoading(true);

    const pendingData = {
      roleId,
      fullName: roleId === 'organization' ? adminContact : fullName,
      email,
      accountType: roleId,
      orgName: roleId === 'organization' ? orgName : institution || employer || 'Individual Workspace',
      details: {
        institution,
        courseProgram,
        yearOfStudy,
        researchDomain,
        orcidId,
        publicationUrl,
        employer,
        jobTitle,
        yearsExp,
        gisTools,
        orgType,
        officialDomain,
        teamSize,
        intendedUses
      }
    };

    setPendingRegistration(pendingData);

    setTimeout(() => {
      setLoading(false);
      navigate('/verify-email');
    }, 600);
  };

  return (
    <div className="app-container">
      <HeaderNav title={`${role.label} Registration`} />

      <main className="main-content">
        <div className="auth-split-wrapper">
          {/* Visual Left Panel */}
          <EarthVisual
            headline={`Tailored for`}
            highlightText={`${role.label}s.`}
            subtitle={role.subtitle}
            features={[`${role.label} Spatial Tools`, 'Real-Time Satellite Feeds', 'Multi-Layer AI Grounding']}
            quote="Earth Observation Powered by AI"
          />

          {/* Form Right Panel */}
          <div className="auth-card-container">
            <AuthCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: 'rgba(9, 122, 254, 0.2)',
                    border: '1px solid var(--sq-blue)',
                    color: 'var(--sq-cyan)',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}
                >
                  {role.label} Account
                </span>
                <span style={{ fontSize: '11px', color: 'var(--sq-text-muted)' }}>Step 2 of 3</span>
              </div>

              <h2 className="auth-heading" style={{ fontSize: '22px' }}>
                Create your {role.label} Account
              </h2>

              {error && <div className="field-error-msg" style={{ marginBottom: '16px' }}>{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* ROLE 1: STUDENT */}
                {roleId === 'student' && (
                  <>
                    <AuthInput
                      id="fullName"
                      label="Full Name"
                      placeholder="e.g. Maya Lin"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      icon={User}
                      required
                    />

                    <div style={{ position: 'relative' }}>
                      <AuthInput
                        id="regEmail"
                        label="Student Email Address"
                        type="email"
                        placeholder="e.g. maya@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={Mail}
                        required
                      />
                      {email && isAcademicEmail(email) && (
                        <div
                          style={{
                            position: 'absolute',
                            right: '12px',
                            top: '38px',
                            fontSize: '11px',
                            color: 'var(--sq-success)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(50, 232, 121, 0.15)',
                            padding: '2px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          <CheckCircle2 size={12} /> Academic Email Detected
                        </div>
                      )}
                    </div>

                    <AuthInput
                      id="institution"
                      label="Institution / College Name"
                      placeholder="e.g. National Institute of Technology"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      icon={GraduationCap}
                      required
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <AuthInput
                        id="courseProgram"
                        label="Course / Program"
                        placeholder="e.g. B.Tech Geoinformatics"
                        value={courseProgram}
                        onChange={(e) => setCourseProgram(e.target.value)}
                        icon={Briefcase}
                      />

                      <div className="form-group">
                        <label htmlFor="yearOfStudy" className="input-label">Year of Study</label>
                        <select
                          id="yearOfStudy"
                          className="auth-input"
                          style={{ color: 'var(--sq-white)', background: 'rgba(0, 22, 46, 0.8)' }}
                          value={yearOfStudy}
                          onChange={(e) => setYearOfStudy(e.target.value)}
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* ROLE 2: RESEARCHER */}
                {roleId === 'researcher' && (
                  <>
                    <AuthInput
                      id="fullName"
                      label="Full Name"
                      placeholder="e.g. Dr. Aris Thorne"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      icon={User}
                      required
                    />

                    <AuthInput
                      id="regEmail"
                      label="Work / Academic Email"
                      type="email"
                      placeholder="e.g. aris.thorne@institute.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={Mail}
                      required
                    />

                    <AuthInput
                      id="institution"
                      label="Research Institution / University"
                      placeholder="e.g. Center for Remote Sensing Research"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      icon={Building}
                      required
                    />

                    <div className="form-group">
                      <label htmlFor="researchDomain" className="input-label">Primary Research Field</label>
                      <select
                        id="researchDomain"
                        className="auth-input"
                        style={{ color: 'var(--sq-white)', background: 'rgba(0, 22, 46, 0.8)' }}
                        value={researchDomain}
                        onChange={(e) => setResearchDomain(e.target.value)}
                      >
                        <option value="Remote Sensing & Climate">Remote Sensing & Climate Change</option>
                        <option value="Agriculture & Soil Health">Agriculture & Soil Health</option>
                        <option value="Urban Growth & Infrastructure">Urban Growth & Infrastructure</option>
                        <option value="Disaster Risk & Glaciology">Disaster Risk & Glaciology</option>
                        <option value="Oceanography & Coastal Dynamics">Oceanography & Coastal Dynamics</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <AuthInput
                        id="orcidId"
                        label="ORCID iD (Optional)"
                        placeholder="0000-0002-1825-0097"
                        value={orcidId}
                        onChange={(e) => setOrcidId(e.target.value)}
                        icon={Globe}
                      />
                      <AuthInput
                        id="publicationUrl"
                        label="Google Scholar / Profile URL"
                        placeholder="https://scholar.google.com/..."
                        value={publicationUrl}
                        onChange={(e) => setPublicationUrl(e.target.value)}
                        icon={Globe}
                      />
                    </div>
                  </>
                )}

                {/* ROLE 3: GIS ANALYST */}
                {roleId === 'gis-analyst' && (
                  <>
                    <AuthInput
                      id="fullName"
                      label="Full Name"
                      placeholder="e.g. Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      icon={User}
                      required
                    />

                    <AuthInput
                      id="regEmail"
                      label="Professional Email"
                      type="email"
                      placeholder="e.g. sarah@geospatial.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={Mail}
                      required
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <AuthInput
                        id="employer"
                        label="Employer / Agency"
                        placeholder="e.g. GeoIntel Solutions"
                        value={employer}
                        onChange={(e) => setEmployer(e.target.value)}
                        icon={Building}
                        required
                      />
                      <AuthInput
                        id="jobTitle"
                        label="Job Title"
                        placeholder="e.g. Senior GIS Analyst"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        icon={Briefcase}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div className="form-group">
                        <label htmlFor="yearsExp" className="input-label">Years of Experience</label>
                        <select
                          id="yearsExp"
                          className="auth-input"
                          style={{ color: 'var(--sq-white)', background: 'rgba(0, 22, 46, 0.8)' }}
                          value={yearsExp}
                          onChange={(e) => setYearsExp(e.target.value)}
                        >
                          <option value="0–2 years">0–2 years</option>
                          <option value="3–5 years">3–5 years</option>
                          <option value="6–10 years">6–10 years</option>
                          <option value="10+ years">10+ years</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="input-label">Primary GIS Software Tools Used</label>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                        {['QGIS', 'ArcGIS Pro', 'ERDAS Imagine', 'Google Earth Engine', 'Rasterio / GDAL'].map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => handleToggleTool(t)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              border: gisTools.includes(t) ? '1px solid var(--sq-cyan)' : '1px solid var(--sq-border)',
                              background: gisTools.includes(t) ? 'rgba(9, 122, 254, 0.25)' : 'rgba(0, 22, 46, 0.5)',
                              color: gisTools.includes(t) ? 'var(--sq-white)' : 'var(--sq-text-muted)',
                              cursor: 'pointer'
                            }}
                          >
                            {gisTools.includes(t) ? '✓ ' : '+ '}{t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ROLE 4: ORGANIZATION */}
                {roleId === 'organization' && (
                  <>
                    <AuthInput
                      id="orgName"
                      label="Organization Name"
                      placeholder="e.g. National Space Intelligence Agency"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      icon={Building}
                      required
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div className="form-group">
                        <label htmlFor="orgType" className="input-label">Organization Tier</label>
                        <select
                          id="orgType"
                          className="auth-input"
                          style={{ color: 'var(--sq-white)', background: 'rgba(0, 22, 46, 0.8)' }}
                          value={orgType}
                          onChange={(e) => setOrgType(e.target.value)}
                        >
                          <option value="Government">Government / Public Agency</option>
                          <option value="Defense">Defense & National Security</option>
                          <option value="NGO">NGO / Non-Profit Environmental</option>
                          <option value="Private/Industry">Private Enterprise / Industry</option>
                          <option value="Academic Institution">Academic Institution</option>
                        </select>
                      </div>

                      <AuthInput
                        id="officialDomain"
                        label="Official Domain Validation"
                        placeholder="e.g. @isro.gov.in"
                        value={officialDomain}
                        onChange={(e) => setOfficialDomain(e.target.value)}
                        icon={Globe}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <AuthInput
                        id="adminContact"
                        label="Admin Contact Full Name"
                        placeholder="e.g. Commander Robert Vance"
                        value={adminContact}
                        onChange={(e) => setAdminContact(e.target.value)}
                        icon={User}
                        required
                      />
                      <AuthInput
                        id="regEmail"
                        label="Admin Email Address"
                        type="email"
                        placeholder="e.g. admin@agency.gov.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={Mail}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label htmlFor="teamSize" className="input-label">Team Size</label>
                      <select
                        id="teamSize"
                        className="auth-input"
                        style={{ color: 'var(--sq-white)', background: 'rgba(0, 22, 46, 0.8)' }}
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                      >
                        <option value="1–10 members">1–10 members</option>
                        <option value="11–50 members">11–50 members</option>
                        <option value="51–200 members">51–200 members</option>
                        <option value="200+ members">200+ members</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="input-label">Intended Use Cases</label>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                        {['Disaster Response', 'Urban Planning', 'Defense / Intel', 'Environmental Monitoring'].map(use => (
                          <button
                            key={use}
                            type="button"
                            onClick={() => handleToggleUse(use)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              border: intendedUses.includes(use) ? '1px solid var(--sq-cyan)' : '1px solid var(--sq-border)',
                              background: intendedUses.includes(use) ? 'rgba(9, 122, 254, 0.25)' : 'rgba(0, 22, 46, 0.5)',
                              color: intendedUses.includes(use) ? 'var(--sq-white)' : 'var(--sq-text-muted)',
                              cursor: 'pointer'
                            }}
                          >
                            {intendedUses.includes(use) ? '✓ ' : '+ '}{use}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(orgType === 'Government' || orgType === 'Defense') && (
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: '6px',
                          background: 'rgba(255, 171, 0, 0.12)',
                          border: '1px solid rgba(255, 171, 0, 0.4)',
                          fontSize: '11px',
                          color: '#FFC107',
                          marginBottom: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                        <span>
                          <strong>Security Policy Notice:</strong> Government/Defense accounts enforce Mandatory 2FA and max 15-minute auto-logout inactivity timeouts per TRD §8 compliance.
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* COMMON PASSWORDS & TERMS */}
                <PasswordInput
                  id="regPassword"
                  label="Password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <PasswordInput
                  id="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <PasswordRequirements password={password} confirmPassword={confirmPassword} />

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <span>
                      I agree to the <a href="#terms" className="auth-link">Terms & Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <PrimaryButton loading={loading}>
                  Continue to Email Verification
                </PrimaryButton>
              </form>

              <p className="bottom-text">
                Need to select a different role?{' '}
                <Link to="/register/choose-role" className="auth-link">
                  Change Role
                </Link>
              </p>
            </AuthCard>
          </div>
        </div>
      </main>

      <FooterStrip />
    </div>
  );
};

export default RoleRegisterPage;
